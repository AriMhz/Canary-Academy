"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ChevronDown, ChevronUp, Facebook, Twitter, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n-context"

interface ArticleCardProps {
    article: {
        id: number
        title: string
        content: string
        author: string
        date: string
        image: string
        videoUrl?: string
        excerpt: string
        category?: string
    }
}

export function ArticleCard({ article }: ArticleCardProps) {
    const { t } = useLanguage()
    const [isExpanded, setIsExpanded] = useState(false)
    const [shareCount, setShareCount] = useState(0)

    return (
        <Card className="overflow-hidden bg-white border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
            {/* ... image or video and header ... */}
            {(article.image || article.videoUrl) && (
                <div className="relative h-64 w-full overflow-hidden bg-gray-100 shrink-0">
                    {article.videoUrl ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${article.videoUrl.split('youtu.be/')[1]?.split('?')[0] || article.videoUrl.split('v=')[1]?.split('&')[0]}`}
                            title={article.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    )}
                    {article.category && (
                        <Badge className="absolute top-4 right-4 bg-[#F5A623] hover:bg-[#FFB84D] text-white border-0 z-10 px-3 py-1 text-sm font-medium shadow-sm">
                            {article.category}
                        </Badge>
                    )}
                </div>
            )}

            <CardHeader className="p-5 pb-0">
                {/* Category if no image (fallback) */}
                {!article.image && !article.videoUrl && (
                    <div className="mb-2">
                        <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white border-0 px-3 py-1 text-sm font-medium">
                            {article.category}
                        </Badge>
                    </div>
                )}

                <h2 className="text-xl md:text-2xl font-bold text-[#2C4F5E] mb-3 leading-tight hover:text-[#F5A623] transition-colors">
                    <a href={`/articles/${article.id}`} className="hover:underline decoration-2 underline-offset-4">
                        {article.title}
                    </a>
                </h2>

                <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F5A623]" />
                        <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#F5A623]" />
                        <span>{article.author}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                {/* Excerpt */}
                <p className="text-base text-foreground/80 leading-relaxed font-medium mb-4 mt-2">
                    {article.excerpt}
                </p>

                {/* Main Content - Prose with logical truncation */}
                <div className={`prose prose-sm max-w-none text-foreground prose-headings:text-[#2C4F5E] prose-a:text-[#F5A623] prose-img:rounded-xl prose-strong:text-[#2C4F5E] ${!isExpanded ? 'line-clamp-3' : ''}`}>
                    <div className="whitespace-pre-wrap">
                        {article.content}
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="mt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[#F5A623] hover:text-[#e0961f] p-0 h-auto font-medium hover:bg-transparent"
                    >
                        {isExpanded ? (
                            <span className="flex items-center gap-1">
                                {t("buttons.showLess") || "Show Less"} <ChevronUp className="w-4 h-4" />
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                {t("buttons.readMore") || "Read More"} <ChevronDown className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </div>

                <div className="mt-auto pt-6 border-t border-border/50 flex justify-end gap-2">
                    <div className="flex items-center mr-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-muted-foreground hover:text-foreground pl-0"
                            onClick={() => {
                                setShareCount(c => c + 1); // Increment immediately for UX feedback
                                const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/articles/${article.id}` : '';

                                if (navigator.share) {
                                    navigator.share({
                                        title: article.title,
                                        text: article.excerpt,
                                        url: shareUrl
                                    }).catch(() => { /* User cancelled or share failed - no action needed */ });
                                } else {
                                    // Fallback
                                    navigator.clipboard.writeText(shareUrl);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                        >
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm font-medium">{shareCount} Shares</span>
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 text-muted-foreground transition-colors"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/articles/${article.id}` : '')}`, '_blank', 'width=600,height=400')}
                        title="Share on Facebook"
                    >
                        <Facebook className="w-6 h-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 text-muted-foreground transition-colors"
                        onClick={() => window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/articles/${article.id}` : '')}&app_id=291474419148371&redirect_uri=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/articles/${article.id}` : '')}`, '_blank', 'width=600,height=500')}
                        title="Share on Messenger"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 hover:bg-gray-100 hover:text-black text-muted-foreground transition-colors"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? `${window.location.origin}/articles/${article.id}` : '')}`, '_blank', 'width=600,height=400')}
                        title="Share on X"
                    >
                        <Twitter className="w-6 h-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
