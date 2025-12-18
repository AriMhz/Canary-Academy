"use client"

import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useCMS } from "@/lib/cms-context"

// Helper function to get image source
function getImageSrc(imagePath: string | undefined, fallback: string = ""): string {
    if (!imagePath) return fallback
    if (imagePath.startsWith('data:') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
    }
    return getAssetPath(imagePath)
}

// Component for a Node in the Organization Chart
const OrgNode = ({ role, name, color = "bg-[#2C4F5E]" }: { role: string; name: string; color?: string }) => (
    <Card className="w-48 md:w-56 mx-auto border-none shadow-premium relative z-10 hover:scale-105 transition-transform duration-300">
        <div className={`h-2 w-full ${color} rounded-t-lg`} />
        <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 mb-3">
                <User className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-bold text-[#2C4F5E] text-sm md:text-base leading-tight">{role}</h4>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">{name}</p>
        </CardContent>
    </Card>
)

// Connector Line Component
const Connector = ({ height = "h-8" }: { height?: string }) => (
    <div className={`w-0.5 ${height} bg-gray-300 mx-auto`}></div>
)

const HorizontalConnector = () => (
    <div className="w-full h-0.5 bg-gray-300 absolute top-0 left-0 right-0"></div>
)

export default function OrganizationalStructurePage() {
    const { content } = useCMS()
    const orgStructure = content.about.orgStructure

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 text-white overflow-hidden">
                <Image
                    src={getAssetPath("/images/academics-hero-bg.jpg")}
                    alt="Organizational Structure Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{orgStructure?.title || "Organizational Structure"}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {orgStructure?.description || "How our school is organized."}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Chart Section */}
            <section className="py-20 bg-background overflow-x-auto">
                <Container>
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-premium p-8">
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                {orgStructure?.image ? (
                                    <Image
                                        src={getImageSrc(orgStructure.image)}
                                        alt={orgStructure.title || "Organizational Structure"}
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-muted-foreground">
                                        <p>No organizational chart uploaded.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
