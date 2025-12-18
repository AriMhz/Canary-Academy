import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import CMSContent from "@/models/CMSContent"
import { defaultContent } from "@/lib/cms-storage"

export async function GET() {
    try {
        await dbConnect()
        const doc = await CMSContent.findOne({ key: "main_content" }).lean()

        if (!doc) {
            // First time run: return default content (don't save yet to avoid junk)
            return NextResponse.json(defaultContent)
        }

        return NextResponse.json(doc.data)
    } catch (error) {
        console.error("Error reading CMS content:", error)
        return NextResponse.json(defaultContent)
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        await dbConnect()

        // Upsert: Create if not exists, update if exists
        await CMSContent.findOneAndUpdate(
            { key: "main_content" },
            { data: data },
            { upsert: true, new: true }
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error saving CMS content:", error)
        return NextResponse.json({ success: false, error: "Failed to save content" }, { status: 500 })
    }
}
