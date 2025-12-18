"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
// Note: lucide-react might not have a dedicated WhatsApp icon, using MessageCircle or Phone as fallback if needed, 
// but often specific brand icons are preferred. For now standard lucide icons. 
// Actually, standard Lucide doesn't have brand icons like Whatsapp. 
// I will use some generic icons or text, or SVG path if I want to be precise, 
// but to be safe and consistent with the codebase I'll use available Lucide icons or simple text labels. 
// Wait, the user asked for "facebook whatsapp x".
// Let's use generic "Share" icon for the button.
// For the options:
// Facebook -> Facebook icon (lucide has it)
// X -> Twitter icon (lucide has it)
// WhatsApp -> MessageCircle (lucide has it) or just text.

export function NewsShareButton({ title, url }: { title: string; url?: string }) {
    const { t } = useLanguage()
    const [shareCount, setShareCount] = useState(0)
    const [shareUrl, setShareUrl] = useState("")

    useEffect(() => {
        setShareUrl(url || (typeof window !== 'undefined' ? window.location.href : ''))
    }, [url])

    return (
        <div className="mt-auto pt-6 border-t border-border/50 flex justify-end gap-2">
            <div className="flex items-center mr-auto">
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground pl-0"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setShareCount(c => c + 1)
                        if (navigator.share) {
                            navigator.share({
                                title: title,
                                url: shareUrl
                            }).catch((error) => console.log('Error sharing', error))
                        } else {
                            navigator.clipboard.writeText(shareUrl)
                            alert('Link copied to clipboard!')
                        }
                    }}
                >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{shareCount} {t("buttons.shares") || "Shares"}</span>
                </Button>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 text-muted-foreground transition-colors"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400')
                }}
                title="Share on Facebook"
            >
                <Facebook className="w-6 h-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 text-muted-foreground transition-colors"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291474419148371&redirect_uri=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=500')
                }}
                title="Share on Messenger"
            >
                <MessageCircle className="w-6 h-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-100 hover:text-black text-muted-foreground transition-colors"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400')
                }}
                title="Share on X"
            >
                <Twitter className="w-6 h-6" />
            </Button>
        </div>
    )
}
