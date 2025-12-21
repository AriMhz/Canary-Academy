import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import CMSContent from "@/models/CMSContent"
import { defaultContent } from "@/lib/cms-storage"
import { requireAuth } from "@/lib/auth"

export const dynamic = 'force-dynamic'

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
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json({ success: false, error: `Failed to save content: ${errorMessage}` }, { status: 500 })
    }
}

// PATCH - Partial update for specific sections (avoids sending full payload)
export async function PATCH(request: NextRequest) {
    const authError = requireAuth(request)
    if (authError) return authError

    try {
        const body = await request.json()
        const { section, data } = body

        if (!section || typeof section !== 'string') {
            return NextResponse.json({ success: false, error: 'Invalid section key' }, { status: 400 })
        }

        if (data === undefined) {
            return NextResponse.json({ success: false, error: 'No data provided' }, { status: 400 })
        }

        await dbConnect()

        // First, ensure the document exists with a base data object
        // This is needed because $set on a nested path like "data.hero" 
        // requires the parent document to exist
        const existing = await CMSContent.findOne({ key: "main_content" })

        if (!existing) {
            // Create the document with the initial section data
            await CMSContent.create({
                key: "main_content",
                data: { [section]: data }
            })
        } else {
            // Use atomic update to modify only the specific field
            const updateField = `data.${section}`;
            await CMSContent.findOneAndUpdate(
                { key: "main_content" },
                { $set: { [updateField]: data } },
                { new: true }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error patching CMS content:", error)
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json({ success: false, error: `Failed to update: ${errorMessage}` }, { status: 500 })
    }
}

