import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmission extends Document {
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    gradeApplying: string;
    parentName: string;
    relationship: string;
    email: string;
    phone: string;
    address: string;
    additionalInfo?: string;
    agreeTerms: boolean;
    status: 'pending' | 'approved' | 'rejected' | 'reviewed';
    submittedAt: Date;
    documents?: string[]; // Array of strings (Base64 or URLs)
}

const AdmissionSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    gradeApplying: { type: String, required: true },
    parentName: { type: String, required: true },
    relationship: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    additionalInfo: { type: String },
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
// Delete correctly if in development to allow schema modifications
if (process.env.NODE_ENV !== 'production' && mongoose.models.Admission) {
    delete mongoose.models.Admission;
}
const Admission: Model<IAdmission> = mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);

export default Admission;
