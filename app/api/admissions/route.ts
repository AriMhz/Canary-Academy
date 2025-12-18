import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admission from '@/models/Admission';

export async function GET() {
    try {
        await dbConnect();
        const admissions = await Admission.find({}).sort({ submittedAt: -1 });
        return NextResponse.json(admissions);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch admissions' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();
        if (!id || !status) {
            return NextResponse.json({ success: false, error: 'Missing id or status' }, { status: 400 });
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
        return NextResponse.json({ success: false, error: 'Failed to update admission' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing id param' }, { status: 400 });
        }

        await dbConnect();
        const deletedAdmission = await Admission.findByIdAndDelete(id);

        if (deletedAdmission) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Admission not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete admission' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await dbConnect();
        const newAdmission = await Admission.create(data);
        return NextResponse.json({ success: true, data: newAdmission });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to save admission' }, { status: 500 });
    }
}
