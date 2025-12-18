"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
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

export default function SubjectsPage() {
    const { content } = useCMS()
    const subjects = content.academics.subjects

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 text-white overflow-hidden">
                <Image
                    src={getAssetPath("/images/academics-hero-bg.jpg")}
                    alt="Subjects Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{subjects?.title || "Our Subjects"}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {subjects?.description || "Explore the wide range of subjects we offer."}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Subjects Grid */}
            <section className="py-20 bg-background">
                <Container>
                    <SectionHeading
                        title={subjects?.title || "Our Subjects"}
                        subtitle={subjects?.description || "Explore the wide range of subjects we offer."}
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {(subjects?.items || []).map((subject, index) => (
                            <Card key={index} className="hover:shadow-premium transition-all duration-300 group">
                                <CardHeader className="space-y-4">
                                    {subject.image ? (
                                        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                                            <Image
                                                src={getImageSrc(subject.image)}
                                                alt={subject.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-[#F5A623]/10 rounded-full flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                                            <BookOpen className="w-6 h-6 text-[#F5A623]" />
                                        </div>
                                    )}
                                    <CardTitle className="text-xl text-[#2C4F5E]">{subject.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
