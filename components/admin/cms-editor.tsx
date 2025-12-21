"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCMSContent, saveCMSContent, saveCMSSection, type CMSContent } from "@/lib/cms-storage"
import { Save, Eye, Upload, X, Plus, Trash2, Edit2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ImageUploadProps {
  currentImage: string
  onImageChange: (url: string) => void
  label?: string
}

function ImageUpload({ currentImage, onImageChange, label = "Image" }: ImageUploadProps) {
  const { toast } = useToast()
  const [preview, setPreview] = useState<string>(currentImage)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    setPreview(currentImage)
  }, [currentImage])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsUploading(true)

    // Convert to base64 for storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setPreview(base64String)
      onImageChange(base64String)
      setIsUploading(false)
      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully",
        duration: 3000,
      })
    }
    reader.onerror = () => {
      setIsUploading(false)
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
        duration: 3000,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (url: string) => {
    setPreview(url)
    onImageChange(url)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
          {preview ? (
            <Image src={preview} alt="Preview" fill className="object-cover" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            type="text"
            placeholder="Or enter image URL"
            value={preview.startsWith("data:") ? "" : preview}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="text-sm"
          />
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button type="button" variant="outline" size="sm" className="w-full" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface VideoUploadProps {
  currentVideo: string
  onVideoChange: (url: string) => void
  label?: string
}

function VideoUpload({ currentVideo, onVideoChange, label = "Video" }: VideoUploadProps) {
  const { toast } = useToast()
  const [preview, setPreview] = useState<string>(currentVideo)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    setPreview(currentVideo)
  }, [currentVideo])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's a video
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsUploading(true)

    // Convert to base64 for storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setPreview(base64String)
      onVideoChange(base64String)
      setIsUploading(false)
      toast({
        title: "Video uploaded",
        description: "Video has been uploaded successfully",
        duration: 3000,
      })
    }
    reader.onerror = () => {
      setIsUploading(false)
      toast({
        title: "Upload failed",
        description: "Failed to upload video",
        variant: "destructive",
        duration: 3000,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (url: string) => {
    setPreview(url)
    onVideoChange(url)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter video URL or path (e.g., /background.mp4)"
          value={preview.startsWith("data:") ? "" : preview}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
        <div className="relative">
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button type="button" variant="outline" size="sm" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
        {preview && !preview.startsWith("data:") && (
          <div className="mt-2">
            <video src={preview} controls className="w-full max-w-md rounded-lg" />
          </div>
        )}
      </div>
    </div>
  )
}

export function CMSEditor() {
  const { toast } = useToast()
  const [content, setContent] = useState<CMSContent>(getCMSContent())
  const [activeTab, setActiveTab] = useState("hero")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setContent(getCMSContent())
  }, [])

  const handleSave = async () => {
    let success = false
    try {
      // Partial updates based on active tab
      if (activeTab === "hero") success = await saveCMSSection("hero", content.hero)
      else if (activeTab === "features") success = await saveCMSSection("features", content.features)
      else if (activeTab === "programs") success = await saveCMSSection("programs", content.programs)
      else if (activeTab === "testimonials") success = await saveCMSSection("testimonials", content.testimonials)
      else if (activeTab === "cta") success = await saveCMSSection("cta", content.cta)
      else if (activeTab === "news") success = await saveCMSSection("news", (content as any).news)
      else success = await saveCMSContent(content)

      if (success) {
        setHasChanges(false)
        toast({
          title: "Content saved",
          description: "Your changes have been saved successfully",
        })
      }
    } catch (e) {
      console.error(e)
      toast({
        title: "Save failed",
        description: "Could not save content",
        variant: "destructive"
      })
    }
  }

  const updateContent = (section: keyof CMSContent, data: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
    setHasChanges(true)
  }

  const updateNestedContent = (section: keyof CMSContent, path: string[], value: any) => {
    setContent((prev) => {
      const newContent = { ...prev }
      let current: any = newContent[section]

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }

      current[path[path.length - 1]] = value
      return newContent
    })
    setHasChanges(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Content Management System</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Edit your website content visually. Changes are saved locally.
            </p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button variant="outline" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Content Preview</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-4">
                  <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto">
                    {JSON.stringify(content, null, 2)}
                  </pre>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="cta">Call to Action</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            {/* Hero Section Editor */}
            <TabsContent value="hero" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input
                      value={content.hero.badge}
                      onChange={(e) => updateContent("hero", { badge: e.target.value })}
                      placeholder="Excellence in Education Since 1999"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Main Title</Label>
                    <Textarea
                      value={content.hero.title}
                      onChange={(e) => updateContent("hero", { title: e.target.value })}
                      placeholder="Nurturing Tomorrow's Leaders Today"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Textarea
                      value={content.hero.subtitle}
                      onChange={(e) => updateContent("hero", { subtitle: e.target.value })}
                      placeholder="Empowering students with quality education..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CTA Button Text</Label>
                      <Input
                        value={content.hero.cta}
                        onChange={(e) => updateContent("hero", { cta: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Learn More Text</Label>
                      <Input
                        value={content.hero.learnMore}
                        onChange={(e) => updateContent("hero", { learnMore: e.target.value })}
                      />
                    </div>
                  </div>
                  <VideoUpload
                    currentVideo={content.hero.backgroundVideo}
                    onVideoChange={(url) => updateContent("hero", { backgroundVideo: url })}
                    label="Background Video"
                  />
                </div>
                <div className="space-y-4">
                  <Label>Statistics</Label>
                  {Object.entries(content.hero.stats).map(([key, stat]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          type="number"
                          value={stat.value}
                          onChange={(e) =>
                            updateNestedContent("hero", ["stats", key, "value"], parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) =>
                            updateNestedContent("hero", ["stats", key, "label"], e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Features Section Editor */}
            <TabsContent value="features" className="space-y-4">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={content.features.title}
                      onChange={(e) => updateContent("features", { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Subtitle</Label>
                    <Input
                      value={content.features.subtitle}
                      onChange={(e) => updateContent("features", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Feature Items</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newItems = [
                          ...content.features.items,
                          { title: "", description: "", image: "", icon: "⭐" },
                        ]
                        updateContent("features", { items: newItems })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                  {content.features.items.map((feature, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Feature {index + 1}</CardTitle>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newItems = content.features.items.filter((_, i) => i !== index)
                            updateContent("features", { items: newItems })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={feature.title}
                              onChange={(e) => {
                                const newItems = [...content.features.items]
                                newItems[index].title = e.target.value
                                updateContent("features", { items: newItems })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Icon (emoji)</Label>
                            <Input
                              value={feature.icon}
                              onChange={(e) => {
                                const newItems = [...content.features.items]
                                newItems[index].icon = e.target.value
                                updateContent("features", { items: newItems })
                              }}
                              placeholder="👨‍🏫"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => {
                              const newItems = [...content.features.items]
                              newItems[index].description = e.target.value
                              updateContent("features", { items: newItems })
                            }}
                            rows={3}
                          />
                        </div>
                        <ImageUpload
                          currentImage={feature.image}
                          onImageChange={(url) => {
                            const newItems = [...content.features.items]
                            newItems[index].image = url
                            updateContent("features", { items: newItems })
                          }}
                          label="Feature Image"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Programs Section Editor */}
            <TabsContent value="programs" className="space-y-4">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={content.programs.title}
                      onChange={(e) => updateContent("programs", { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Subtitle</Label>
                    <Input
                      value={content.programs.subtitle}
                      onChange={(e) => updateContent("programs", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Program Items</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newItems = [
                          ...content.programs.items,
                          { level: "", description: "", subjects: [] },
                        ]
                        updateContent("programs", { items: newItems })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Program
                    </Button>
                  </div>
                  {content.programs.items.map((program, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Program {index + 1}</CardTitle>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newItems = content.programs.items.filter((_, i) => i !== index)
                            updateContent("programs", { items: newItems })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Level</Label>
                          <Input
                            value={program.level}
                            onChange={(e) => {
                              const newItems = [...content.programs.items]
                              newItems[index].level = e.target.value
                              updateContent("programs", { items: newItems })
                            }}
                            placeholder="Primary (K-5)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={program.description}
                            onChange={(e) => {
                              const newItems = [...content.programs.items]
                              newItems[index].description = e.target.value
                              updateContent("programs", { items: newItems })
                            }}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Subjects (comma-separated)</Label>
                          <Input
                            value={program.subjects.join(", ")}
                            onChange={(e) => {
                              const newItems = [...content.programs.items]
                              newItems[index].subjects = e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              updateContent("programs", { items: newItems })
                            }}
                            placeholder="English, Mathematics, Science"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Testimonials Section Editor */}
            <TabsContent value="testimonials" className="space-y-4">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input
                      value={content.testimonials.title}
                      onChange={(e) => updateContent("testimonials", { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Subtitle</Label>
                    <Input
                      value={content.testimonials.subtitle}
                      onChange={(e) => updateContent("testimonials", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Testimonial Items</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newItems = [
                          ...content.testimonials.items,
                          { name: "", role: "", content: "", rating: 5 },
                        ]
                        updateContent("testimonials", { items: newItems })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </div>
                  {content.testimonials.items.map((testimonial, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Testimonial {index + 1}</CardTitle>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newItems = content.testimonials.items.filter((_, i) => i !== index)
                            updateContent("testimonials", { items: newItems })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => {
                                const newItems = [...content.testimonials.items]
                                newItems[index].name = e.target.value
                                updateContent("testimonials", { items: newItems })
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Role</Label>
                            <Input
                              value={testimonial.role}
                              onChange={(e) => {
                                const newItems = [...content.testimonials.items]
                                newItems[index].role = e.target.value
                                updateContent("testimonials", { items: newItems })
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Content</Label>
                          <Textarea
                            value={testimonial.content}
                            onChange={(e) => {
                              const newItems = [...content.testimonials.items]
                              newItems[index].content = e.target.value
                              updateContent("testimonials", { items: newItems })
                            }}
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Rating (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) => {
                              const newItems = [...content.testimonials.items]
                              newItems[index].rating = parseInt(e.target.value) || 5
                              updateContent("testimonials", { items: newItems })
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* CTA Section Editor */}
            <TabsContent value="cta" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={content.cta.title}
                    onChange={(e) => updateContent("cta", { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text</Label>
                  <Textarea
                    value={content.cta.text}
                    onChange={(e) => updateContent("cta", { text: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Apply Now Button Text</Label>
                    <Input
                      value={content.cta.applyNow}
                      onChange={(e) => updateContent("cta", { applyNow: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Us Button Text</Label>
                    <Input
                      value={content.cta.contactUs}
                      onChange={(e) => updateContent("cta", { contactUs: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* News Section Editor */}
            <TabsContent value="news" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>News Items</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newItems = [
                        ...content.news,
                        {
                          id: Date.now(),
                          title: "",
                          date: new Date().toISOString().split("T")[0],
                          category: "News",
                          excerpt: "",
                          image: "",
                        },
                      ]
                      updateContent("news", { items: newItems })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add News
                  </Button>
                </div>
                {content.news.map((news, index) => (
                  <Card key={news.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">News {index + 1}</CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const newItems = content.news.filter((_, i) => i !== index)
                          updateContent("news", { items: newItems })
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={news.title}
                            onChange={(e) => {
                              const newItems = [...content.news]
                              newItems[index].title = e.target.value
                              updateContent("news", { items: newItems })
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Input
                            value={news.category}
                            onChange={(e) => {
                              const newItems = [...content.news]
                              newItems[index].category = e.target.value
                              updateContent("news", { items: newItems })
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={news.date}
                          onChange={(e) => {
                            const newItems = [...content.news]
                            newItems[index].date = e.target.value
                            updateContent("news", { items: newItems })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Excerpt</Label>
                        <Textarea
                          value={news.excerpt}
                          onChange={(e) => {
                            const newItems = [...content.news]
                            newItems[index].excerpt = e.target.value
                            updateContent("news", { items: newItems })
                          }}
                          rows={3}
                        />
                      </div>
                      <ImageUpload
                        currentImage={news.image}
                        onImageChange={(url) => {
                          const newItems = [...content.news]
                          newItems[index].image = url
                          updateContent("news", { items: newItems })
                        }}
                        label="News Image"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

