"use client"

import type React from "react"
import { LanguageProvider } from "@/lib/i18n-context"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    )
}
