"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Upload, ImageIcon, Save } from "lucide-react"
import { useCMS } from "@/lib/cms-context"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function AdminPopupManager() {
    const { toast } = useToast()
    const { content, updateContent } = useCMS()

    // Local state
    const [popup, setPopup] = useState(content.popup || {
        isActive: true,
        image: "/images/popup-ad.jpg"
    })

    const [hasChanges, setHasChanges] = useState(false)

    // Sync with CMS content
    useEffect(() => {
        if (!hasChanges && content.popup) {
            setPopup(content.popup)
        }
    }, [content.popup, hasChanges])

    const handleSave = () => {
        if (updateContent) {
            updateContent(["popup"], popup)
            setHasChanges(false)
            toast({
                title: "Popup updated",
                description: "Your changes have been saved successfully",
            })
        }
    }

    const handleChange = (field: string, value: any) => {
        setPopup({ ...popup, [field]: value })
        setHasChanges(true)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result as string
            setPopup({ ...popup, image: base64String })
            setHasChanges(true)
            toast({
                title: "Image uploaded",
                description: "Image has been uploaded successfully",
            })
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Site Popup</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Control the advertisement or announcement popup shown on the home page.
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center space-x-2 mr-4">
                            <Switch
                                id="active-mode"
                                checked={popup.isActive}
                                onCheckedChange={(checked) => handleChange("isActive", checked)}
                            />
                            <Label htmlFor="active-mode">
                                {popup.isActive ? "Active" : "Inactive"}
                            </Label>
                        </div>

                        {hasChanges && (
                            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white animate-pulse">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Image URL or Upload</Label>
                                <Input
                                    value={popup.image.startsWith("data:") ? "" : popup.image}
                                    onChange={(e) => handleChange("image", e.target.value)}
                                    placeholder="/images/popup.jpg"
                                />
                                <div className="relative mt-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    <Button type="button" variant="outline" className="w-full">
                                        <Upload className="w-4 h-4 mr-2" />
                                        {popup.image ? "Change Image" : "Upload Image"}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Preview</Label>
                            <div className="border rounded-lg overflow-hidden bg-muted/20 relative aspect-square flex items-center justify-center">
                                {popup.image ? (
                                    <Image
                                        src={popup.image}
                                        alt="Popup Preview"
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="text-muted-foreground flex flex-col items-center">
                                        <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                        <span>No Image Selected</span>
                                    </div>
                                )}
                                {!popup.isActive && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white font-bold bg-black/50 px-3 py-1 rounded border border-white/20">INACTIVE</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
