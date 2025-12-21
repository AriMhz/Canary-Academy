import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import CMSContent from "@/models/CMSContent"
import { defaultContent } from "@/lib/cms-storage"
import { requireAuth } from "@/lib/auth"

// GET - Public (content needs to be visible to all visitors)
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

// POST - Requires authentication (admin only can modify content)
export async function POST(request: NextRequest) {
    // Check authentication before allowing content modification
    const authError = requireAuth(request)
    if (authError) return authError

    try {
        const data = await request.json()

        // Basic validation - ensure data is an object
        if (!data || typeof data !== 'object') {
            return NextResponse.json({ success: false, error: 'Invalid content data' }, { status: 400 })
        }

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
