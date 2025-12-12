"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SitePopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Show popup on every visit/reload
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsOpen(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg md:max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

                {/* Close Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black hover:text-red-500 shadow-sm transition-colors"
                >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                </Button>

                {/* Image */}
                <Image
                    src="/images/popup-ad.jpg"
                    alt="School Admission 2025-2026"
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-auto"
                    priority
                />
            </div>
        </div>
    )
}
