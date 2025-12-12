"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, Trash2 } from "lucide-react"
import { galleryImages } from "@/lib/data"
import Image from "next/image"

export function AdminGalleryManager() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Gallery</CardTitle>
          <Button className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload Images
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="relative h-40 rounded-lg overflow-hidden bg-muted">
                  <Image src={image.image || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="destructive" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white text-xs">{image.category}</Badge>
                  <p className="text-sm font-medium text-foreground truncate">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
