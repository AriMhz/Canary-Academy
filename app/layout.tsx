import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SitePopup } from "@/components/site-popup"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <SitePopup />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
