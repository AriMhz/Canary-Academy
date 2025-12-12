"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Plus } from "lucide-react"
import { newsData } from "@/lib/data"

export function AdminNewsManager() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    excerpt: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("News submitted:", formData)
    setShowForm(false)
    setFormData({ title: "", category: "", date: "", excerpt: "" })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage News & Events</CardTitle>
          <Button onClick={() => setShowForm(!showForm)} className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Post
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-6 bg-muted rounded-lg">
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
                  rows={4}
                />
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
          )}

          {/* News List */}
          <div className="space-y-4">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="flex items-center gap-4 p-4 border-2 border-border rounded-lg hover:border-[#F5A623]/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#2C4F5E]">{news.title}</h3>
                    <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">{news.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{news.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(news.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#2C4F5E] text-[#2C4F5E] bg-transparent">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
