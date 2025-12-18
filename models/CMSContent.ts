import mongoose, { Schema, Document, Model } from 'mongoose';

// Since the CMS content is dynamic and large, we will implement a Singleton pattern
// where we only ever read/write one document.
// We use 'Strict: false' or 'Mixed' types to allow flexible deep structure updates without strict schema validation for every sub-field.

export interface ICMSContent extends Document {
    key: string; // "main_content" - to identify valid document
    data: any;   // The entire JSON blob
}

const CMSContentSchema: Schema = new Schema({
    key: { type: String, required: true, unique: true, default: 'main_content' },
    data: { type: Schema.Types.Mixed, required: true }
}, {
    timestamps: true,
    strict: false // Allow dynamic fields
});

const CMSContent: Model<ICMSContent> = mongoose.models.CMSContent || mongoose.model<ICMSContent>('CMSContent', CMSContentSchema);

export default CMSContent;
