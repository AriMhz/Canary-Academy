import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Trash2, Edit2, Plus, ImageIcon, Loader2, Sparkles } from "lucide-react"
import { useCMS } from "@/lib/cms-context"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { compressImageToWebP, optimizeImageList, formatFileSize, getBase64Size } from "@/lib/image-compression"

const CATEGORIES = ["Campus", "Facilities", "Events"]

export function AdminGalleryManager() {
  const { toast } = useToast()
  const { content, updateContent } = useCMS()

  // Local state for batch editing
  const [gallery, setGallery] = useState(content.gallery || [])
  const [hasChanges, setHasChanges] = useState(false)

  const [showUpload, setShowUpload] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    title_np: "",
    category: "",
    image: "",
  })

  // Sync with CMS content only if no local changes
  useEffect(() => {
    if (!hasChanges) {
      setGallery(content.gallery || [])
    }
  }, [content.gallery, hasChanges])

  const handleSave = async () => {
    if (!updateContent) return
    setIsSaving(true)
    try {
      // Auto-compress any uncompressed or heavy images already in the gallery
      const { items: optimizedGallery, optimizedCount } = await optimizeImageList(gallery, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.8,
        maxSizeBytes: 180 * 1024,
      })

      if (optimizedCount > 0) {
        setGallery(optimizedGallery)
      }

      updateContent(["gallery"], optimizedGallery)
      setHasChanges(false)
      toast({
        title: "Gallery updated",
        description: optimizedCount > 0
          ? `Saved successfully (${optimizedCount} images auto-compressed to WebP)`
          : "Your changes have been saved successfully",
      })
    } catch (error) {
      console.error("Save error:", error)
      toast({
        title: "Error saving gallery",
        description: "An error occurred while saving. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      title: formData.title || "Untitled",
      title_np: formData.title_np,
      category: formData.category || "General",
      image: formData.image || "/placeholder.svg",
    }

    setGallery([...gallery, newItem])
    setHasChanges(true)

    setFormData({ title: "", title_np: "", category: "", image: "" })
    setShowUpload(false)
    toast({
      title: "Image added",
      description: "Image added to list. Don't forget to save changes.",
    })
  }

  const handleDelete = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id))
    setHasChanges(true)
    toast({
      title: "Image deleted",
      description: "Image removed from list. Don't forget to save changes.",
    })
  }

  const handleEdit = (item: typeof gallery[0]) => {
    setEditingItem(item.id)
    setFormData({
      title: item.title,
      title_np: (item as any).title_np || "",
      category: item.category,
      image: item.image,
    })
  }

  const handleUpdate = () => {
    if (editingItem === null) return

    const updatedGallery = gallery.map((item) =>
      item.id === editingItem
        ? { ...item, ...formData }
        : item
    )

    setGallery(updatedGallery)
    setHasChanges(true)

    setEditingItem(null)
    setFormData({ title: "", title_np: "", category: "", image: "" })
    toast({
      title: "Image updated",
      description: "Image details updated. Don't forget to save changes.",
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    setIsCompressing(true)
    try {
      // Automatically convert image to WebP and compress to low KB
      const result = await compressImageToWebP(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.8,
        maxSizeBytes: 180 * 1024,
      })

      setFormData((prev) => ({ ...prev, image: result.dataUrl }))
      toast({
        title: "⚡ Auto-compressed to WebP",
        description: `${result.originalSizeKB} KB → ${result.compressedSizeKB} KB (${result.savedPercent}% smaller)`,
      })
    } catch (error) {
      console.error("Compression error:", error)
      toast({
        title: "Compression error",
        description: "Failed to compress image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCompressing(false)
      // Reset input value so the same file can be re-selected if desired
      e.target.value = ""
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Gallery</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Upload and manage gallery images. {gallery.length} image(s) in gallery.
            </p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button onClick={handleSave} disabled={isSaving || isCompressing} className="bg-green-600 hover:bg-green-700 text-white animate-pulse">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
            <Dialog open={showUpload} onOpenChange={setShowUpload}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title (En)</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Image title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title (Np)</Label>
                    <Input
                      value={(formData as any).title_np || ""}
                      onChange={(e) => setFormData({ ...formData, title_np: e.target.value } as any)}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL or Upload</Label>
                    <Input
                      value={formData.image.startsWith("data:") ? "" : formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/image.jpg or upload file"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        disabled={isCompressing}
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <Button type="button" variant="outline" className="w-full" disabled={isCompressing}>
                        {isCompressing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#F5A623]" />
                            Compressing to WebP...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload & Auto-compress (WebP)
                          </>
                        )}
                      </Button>
                    </div>
                    {formData.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        {formData.image.startsWith("data:") && (
                          <div className="absolute top-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-mono">
                            <Sparkles className="w-3 h-3 text-[#F5A623]" />
                            {formData.image.startsWith("data:image/webp") ? "WebP" : "Optimized"} • {formatFileSize(getBase64Size(formData.image))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAdd} disabled={isCompressing} className="flex-1 bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                      Add Image
                    </Button>
                    <Button variant="outline" onClick={() => setShowUpload(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {gallery.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No images in gallery. Click "Add Image" to get started.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="relative h-40 rounded-lg overflow-hidden bg-muted border-2 border-border">
                    <Image src={image.image || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                    {image.image && image.image.startsWith("data:") && (
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none">
                        {image.image.startsWith("data:image/webp") ? "WebP" : "Img"} • {formatFileSize(getBase64Size(image.image))}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => handleEdit(image)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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
          )}
        </CardContent>
      </Card >

      {/* Edit Dialog */}
      < Dialog open={editingItem !== null
      } onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title (En)</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Title (Np)</Label>
              <Input
                value={(formData as any).title_np || ""}
                onChange={(e) => setFormData({ ...formData, title_np: e.target.value } as any)}
                placeholder="Optional"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Image URL or Upload</Label>
              <Input
                value={formData.image.startsWith("data:") ? "" : formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  disabled={isCompressing}
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <Button type="button" variant="outline" className="w-full" disabled={isCompressing}>
                  {isCompressing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#F5A623]" />
                      Compressing to WebP...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload & Auto-compress (WebP)
                    </>
                  )}
                </Button>
              </div>
              {formData.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                  {formData.image.startsWith("data:") && (
                    <div className="absolute top-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded flex items-center gap-1 font-mono">
                      <Sparkles className="w-3 h-3 text-[#F5A623]" />
                      {formData.image.startsWith("data:image/webp") ? "WebP" : "Optimized"} • {formatFileSize(getBase64Size(formData.image))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdate} disabled={isCompressing} className="flex-1 bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                Update
              </Button>
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog >
    </div >
  )
}
