"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCMS } from "@/lib/cms-context"

export function SitePopup() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { content } = useCMS()

    useEffect(() => {
        // Only show content if active and on home page
        if (pathname !== "/" || !content.popup?.isActive) return

        // Check if popup has already been seen in this session
        const hasSeenPopup = sessionStorage.getItem("hasSeenPopup")

        if (!hasSeenPopup) {
            // Small delay to ensure client-side hydration is complete
            const timer = setTimeout(() => {
                setIsOpen(true)
                sessionStorage.setItem("hasSeenPopup", "true")
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [pathname, content.popup?.isActive])

    const handleClose = () => {
        setIsOpen(false)
    }

    if (!isOpen || !content.popup?.isActive) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-lg md:max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 cursor-default bg-white"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Close Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 h-8 px-3 rounded-full bg-black/60 hover:bg-black/80 text-white hover:text-red-400 backdrop-blur-md shadow-sm transition-all flex items-center gap-1"
                >
                    <X className="w-4 h-4" />
                    <span className="font-medium text-xs uppercase tracking-wide">Close</span>
                </Button>

                {/* Image */}
                <div className="relative w-full h-auto min-h-[400px]">
                    <Image
                        src={content.popup.image || "/placeholder.svg"}
                        alt="Announcement"
                        width={600}
                        height={600}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
