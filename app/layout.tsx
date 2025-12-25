import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SitePopup } from "@/components/site-popup"
import { LanguageProvider } from "@/lib/i18n-context"
import { CMSProvider } from "@/lib/cms-context"



export const metadata: Metadata = {
  title: "Canary Academy - Igniting Minds, Inspiring Happiness",
  description: "Canary Academy is a premier educational institution in Nepal committed to holistic development and academic excellence.",
  icons: {
    icon: "/images/school-20logo-20canary-20academy.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          <CMSProvider>
            <SitePopup />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CMSProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
