import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

// Contact Message Schema
const contactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },
    email: { type: String, required: true, maxlength: 254 },
    phone: { type: String, required: true, maxlength: 20 },
    subject: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true, maxlength: 5000 },
    status: { type: String, default: 'unread', enum: ['unread', 'read', 'replied'] },
    submittedAt: { type: Date, default: Date.now },
});

// Get or create model
const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

// Input validation helpers
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-+()]{7,20}$/;
    return phoneRegex.test(phone);
}

function sanitizeString(input: string, maxLength: number = 500): string {
    if (typeof input !== 'string') return '';
    return input.trim().slice(0, maxLength).replace(/[<>]/g, '');
}

// POST - Public endpoint for contact form submission
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
        for (const field of requiredFields) {
            if (!data[field] || typeof data[field] !== 'string' || !data[field].trim()) {
                return NextResponse.json({
                    success: false,
                    error: `Missing or invalid required field: ${field}`
                }, { status: 400 });
            }
        }

        // Validate email format
        if (!isValidEmail(data.email)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid email format'
            }, { status: 400 });
        }

        // Validate phone format
        if (!isValidPhone(data.phone)) {
            return NextResponse.json({
                success: false,
                error: 'Invalid phone number format'
            }, { status: 400 });
        }

        // Sanitize all inputs
        const sanitizedData = {
            name: sanitizeString(data.name, 200),
            email: sanitizeString(data.email, 254),
            phone: sanitizeString(data.phone, 20),
            subject: sanitizeString(data.subject, 100),
            message: sanitizeString(data.message, 5000),
            status: 'unread',
            submittedAt: new Date(),
        };

        await dbConnect();
        const newMessage = await ContactMessage.create(sanitizedData);

        return NextResponse.json({
            success: true,
            data: { id: newMessage._id }
        });
    } catch (error) {
        console.error('Error saving contact message:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to save message'
        }, { status: 500 });
    }
}

// GET - Requires authentication (admin only)
export async function GET(request: NextRequest) {
    // Check for admin authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ') || authHeader.slice(7).length < 20) {
        return NextResponse.json({
            success: false,
            error: 'Unauthorized'
        }, { status: 401 });
    }

    try {
        await dbConnect();
        const messages = await ContactMessage.find({}).sort({ submittedAt: -1 });
        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch messages'
        }, { status: 500 });
    }
}
