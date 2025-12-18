"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCMS } from "@/lib/cms-context"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Plus, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"

export function AdminNewsManager() {
  const { toast } = useToast()
  const { content, updateContent } = useCMS()

  const [news, setNews] = useState(content.news || [])
  const [hasChanges, setHasChanges] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    excerpt: "",
    content: "",
    image: "",
  })









  // Sync with CMS content only if no local changes
  useEffect(() => {
    if (!hasChanges) {
      setNews(content.news || [])
    }
  }, [content.news, hasChanges])

  const handleSave = () => {
    if (updateContent) {
      updateContent(["news"], news)
      setHasChanges(false)
      toast({
        title: "News updated",
        description: "Your changes have been saved successfully",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      date: formData.date,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image || "/placeholder.svg",
    }
    const updatedNews = [...news, newItem]
    setNews(updatedNews)
    setHasChanges(true)

    setFormData({ title: "", category: "", date: "", excerpt: "", content: "", image: "" })
    setShowForm(false)
    toast({
      title: "News post added",
      description: "New post added to list. Don't forget to save changes.",
    })
  }

  const handleDelete = (id: number) => {
    const updatedNews = news.filter((item) => item.id !== id)
    setNews(updatedNews)
    setHasChanges(true)
    toast({
      title: "News deleted",
      description: "Post removed from list. Don't forget to save changes.",
    })
  }

  const handleEdit = (item: typeof news[0]) => {
    setEditingItem(item.id)
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      excerpt: item.excerpt,
      content: (item as any).content || "",
      image: item.image,
    })
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem === null) return
    const updatedNews = news.map((item) =>
      item.id === editingItem
        ? { ...item, ...formData }
        : item
    )
    setNews(updatedNews)
    setHasChanges(true)

    setEditingItem(null)
    setFormData({ title: "", category: "", date: "", excerpt: "", content: "", image: "" })
    toast({
      title: "News updated",
      description: "Post updated. Don't forget to save changes.",
    })
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
      setFormData({ ...formData, image: base64String })
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
            <CardTitle>Manage News & Events</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage news posts and events. {news.length} post(s) published.
            </p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white animate-pulse">
                Save Changes
              </Button>
            )}
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New News Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Post Title</Label>
                      <Input
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter post title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        required
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="News">News</SelectItem>
                          <SelectItem value="Events">Events</SelectItem>
                          <SelectItem value="Achievements">Achievements</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Full Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Full article content..."
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL or Upload</Label>
                    <Input
                      value={formData.image.startsWith("data:") ? "" : formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/news.jpg or upload file"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" className="w-full">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                    {formData.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                      Publish Post
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {news.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No news posts yet. Click "Add New Post" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border-2 border-border rounded-lg hover:border-[#F5A623]/50 transition-colors"
                >
                  {item.image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[#2C4F5E]">{item.title}</h3>
                      <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#2C4F5E] text-[#2C4F5E] bg-transparent"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editingItem !== null} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit News Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Post Title</Label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  required
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="News">News</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                    <SelectItem value="Achievements">Achievements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Full Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
              />
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
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Button type="button" variant="outline" className="w-full">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              {formData.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                Update Post
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div >
  )
}
