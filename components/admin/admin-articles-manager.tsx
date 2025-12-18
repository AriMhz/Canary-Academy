"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Plus, Pencil, Trash2, Calendar, User, Save, X } from "lucide-react"
import { useCMS } from "@/lib/cms-context"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n-context"
import { ImageInput } from "@/components/admin/form-fields"
import { type CMSContent } from "@/lib/cms-storage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdminArticlesManagerProps {
    content?: CMSContent
    updateContent?: (path: string[], value: any) => void
}

export function AdminArticlesManager({ content: propsContent, updateContent: propsUpdateContent }: AdminArticlesManagerProps = {}) {
    const { content: contextContent, updateContent: contextUpdateContent } = useCMS()

    // Use props if available (controlled mode), otherwise fallback to context
    const content = propsContent || contextContent
    const updateContent = propsUpdateContent || contextUpdateContent

    const [editingArticle, setEditingArticle] = useState<CMSContent["articles"][0] | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { t } = useLanguage()

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        image: "",
        videoUrl: ""
    })

    const resetForm = () => {
        setFormData({
            title: "",
            excerpt: "",
            content: "",
            author: "",
            category: "",
            date: new Date().toISOString().split('T')[0],
            image: "",
            videoUrl: ""
        })
        setEditingArticle(null)
    }

    const handleUpload = (file: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result as string })
        }
        reader.readAsDataURL(file)
    }

    const handleEdit = (article: CMSContent["articles"][0]) => {
        setEditingArticle(article)
        setFormData({
            title: article.title,
            // Use existing content as excerpt if excerpt is missing, for backward compatibility
            excerpt: article.content ? article.content.substring(0, 100) + "..." : "",
            content: article.content,
            author: article.author,
            category: article.category || "Education", // Default category if not present
            date: article.date,
            image: article.image,
            videoUrl: article.videoUrl || ""
        })
        setIsDialogOpen(true)
    }

    const handleDelete = (id: number) => {
        if (confirm(t("admin.articles.deleteConfirm"))) {
            const updatedArticles = (content.articles || []).filter(a => a.id !== id)
            if (updateContent) {
                updateContent(["articles"], updatedArticles)
            }
        }
    }

    const handleSave = () => {
        const articles = content.articles || []

        if (editingArticle) {
            // Update existing
            const updatedArticles = articles.map(a =>
                a.id === editingArticle.id
                    ? {
                        ...a,
                        title: formData.title,
                        content: formData.content,
                        author: formData.author,
                        date: formData.date,
                        image: formData.image,
                        category: formData.category,
                        videoUrl: formData.videoUrl
                    }
                    : a
            )
            if (updateContent) {
                updateContent(["articles"], updatedArticles)
            }
        } else {
            // Add new
            const newArticle = {
                id: Date.now(),
                title: formData.title,
                content: formData.content,
                author: formData.author,
                date: formData.date,
                image: formData.image,
                category: formData.category,
                videoUrl: formData.videoUrl
            }
            if (updateContent) {
                updateContent(["articles"], [newArticle, ...articles])
            }
        }

        setIsDialogOpen(false)
        resetForm()
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-[#2C4F5E]">{t("admin.articles.title")}</h2>
                    <p className="text-muted-foreground">{t("admin.manageContent")}</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) resetForm()
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            {t("admin.articles.add")}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingArticle ? t("admin.articles.edit") : t("admin.articles.add")}</DialogTitle>
                            <DialogDescription>
                                {t("admin.manageContent")}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>{t("admin.articles.form.title")}</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Article Title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t("admin.articles.form.author")}</Label>
                                    <Input
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="Author Name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>{t("admin.articles.form.date")}</Label>
                                    <Input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t("admin.articles.form.category")}</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Education">Education</SelectItem>
                                            <SelectItem value="Parenting">Parenting</SelectItem>
                                            <SelectItem value="Student Life">Student Life</SelectItem>
                                            <SelectItem value="Health">Health</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Video URL (YouTube)</Label>
                                <Input
                                    value={formData.videoUrl}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                    onBlur={async () => {
                                        if (!formData.videoUrl) return;
                                        try {
                                            // Basic validation
                                            if (!formData.videoUrl.includes('youtube.com') && !formData.videoUrl.includes('youtu.be')) return;

                                            const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(formData.videoUrl)}&format=json`);
                                            if (response.ok) {
                                                const data = await response.json();
                                                setFormData(prev => ({
                                                    ...prev,
                                                    title: data.title || prev.title,
                                                    author: prev.author || data.author_name || ""
                                                }));
                                            }
                                        } catch (e) {
                                            console.error("Failed to fetch video details", e);
                                        }
                                    }}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                <p className="text-xs text-muted-foreground">URL will auto-fill Title and Author if valid.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>{t("admin.articles.form.image")}</Label>
                                <div className="border rounded-md p-4 bg-muted/20">
                                    <ImageInput
                                        value={formData.image}
                                        onChange={(val) => setFormData({ ...formData, image: val })}
                                        onUpload={handleUpload}
                                        label="Upload Article Image"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>{t("admin.articles.form.content")}</Label>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your article content here..."
                                    className="min-h-[200px]"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                {t("admin.articles.form.cancel")}
                            </Button>
                            <Button onClick={handleSave} className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                                <Save className="w-4 h-4 mr-2" />
                                {t("admin.articles.form.save")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(content.articles || []).length > 0 ? (
                    (content.articles || []).map((article) => (
                        <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 bg-muted rounded-t-lg overflow-hidden">
                                {article.image ? (
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <FileText className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 bg-white/90 hover:bg-white text-blue-600"
                                        onClick={() => handleEdit(article)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 bg-white/90 hover:bg-white text-red-600"
                                        onClick={() => handleDelete(article.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {article.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {article.author}
                                    </span>
                                </div>
                                <h3 className="font-bold text-[#2C4F5E] line-clamp-1 mb-2">{article.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {article.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center border-2 border-dashed rounded-lg text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No articles found. Create your first article!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
