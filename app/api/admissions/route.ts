import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admission from '@/models/Admission';
import { requireAuth, isValidObjectId, sanitizeString, isValidEmail, isValidPhone } from '@/lib/auth';

// GET - Requires authentication (admin only can view all admissions)
export async function GET(request: NextRequest) {
    // Check authentication for viewing admissions
    const authError = requireAuth(request);
    if (authError) return authError;

    try {
        await dbConnect();
        const admissions = await Admission.find({}).sort({ submittedAt: -1 });
        return NextResponse.json(admissions);
    } catch (error) {
        console.error('Error fetching admissions:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch admissions' }, { status: 500 });
    }
}

// PATCH - Requires authentication (admin only can update status)
export async function PATCH(request: NextRequest) {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    try {
        const { id, status } = await request.json();

        // Validate inputs
        if (!id || !status) {
            return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
        }

        // Validate ObjectId format
        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, error: 'Invalid admission ID format' }, { status: 400 });
        }

        // Validate status value
        const validStatuses = ['pending', 'approved', 'rejected', 'reviewed'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });
        }

        await dbConnect();
        const updatedAdmission = await Admission.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (updatedAdmission) {
            return NextResponse.json({ success: true, data: updatedAdmission });
        } else {
            return NextResponse.json({ success: false, error: 'Admission not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating admission:', error);
        return NextResponse.json({ success: false, error: 'Failed to update admission' }, { status: 500 });
    }
}

// DELETE - Requires authentication (admin only can delete)
export async function DELETE(request: NextRequest) {
    // Check authentication
    const authError = requireAuth(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing id param' }, { status: 400 });
        }

        // Validate ObjectId format
        if (!isValidObjectId(id)) {
            return NextResponse.json({ success: false, error: 'Invalid admission ID format' }, { status: 400 });
        }

        await dbConnect();
        const deletedAdmission = await Admission.findByIdAndDelete(id);

        if (deletedAdmission) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Admission not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting admission:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete admission' }, { status: 500 });
    }
}

// POST - Public (anyone can submit an admission form) but with validation
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'gradeApplying', 'parentName', 'email', 'phone'];
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
            return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
        }

        // Validate phone format
        if (!isValidPhone(data.phone)) {
            return NextResponse.json({ success: false, error: 'Invalid phone number format' }, { status: 400 });
        }

        // Sanitize all string inputs
        const sanitizedData = {
            firstName: sanitizeString(data.firstName, 100),
            lastName: sanitizeString(data.lastName, 100),
            gradeApplying: sanitizeString(data.gradeApplying, 20),
            parentName: sanitizeString(data.parentName, 200),
            email: sanitizeString(data.email, 254),
            phone: sanitizeString(data.phone, 20),
            agreeTerms: Boolean(data.agreeTerms),
            status: 'pending', // Always set to pending for new submissions
            submittedAt: new Date(),
        };

        await dbConnect();
        const newAdmission = await Admission.create(sanitizedData);
        return NextResponse.json({ success: true, data: { id: newAdmission._id } });
    } catch (error) {
        console.error('Error saving admission:', error);
        return NextResponse.json({ success: false, error: 'Failed to save admission' }, { status: 500 });
    }
}
