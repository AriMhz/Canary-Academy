import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmission extends Document {
    firstName: string;
    lastName: string;
    gradeApplying: string;
    parentName: string;
    email: string;
    phone: string;
    agreeTerms: boolean;
    status: 'pending' | 'approved' | 'rejected' | 'reviewed';
    submittedAt: Date;
    documents?: string[]; // Array of strings (Base64 or URLs)
}

const AdmissionSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gradeApplying: { type: String, required: true },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    agreeTerms: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'reviewed'],
        default: 'pending'
    },
    submittedAt: { type: Date, default: Date.now },
    documents: [String],
}, {
    timestamps: true,
});

// Prevent model overwrite upon initial compile
const Admission: Model<IAdmission> = mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);

export default Admission;
