"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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

export default function OtherProgramsPage() {
    const { content } = useCMS()
    const otherPrograms = content.academics.otherPrograms

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 text-white overflow-hidden">
                <Image
                    src={getAssetPath("/images/academics-hero-bg.jpg")}
                    alt="Other Programs Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{otherPrograms?.title || "Other Programs"}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {otherPrograms?.description || "Extra-curricular and co-curricular activities."}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Programs Grid */}
            <section className="py-20 bg-background">
                <Container>
                    <SectionHeading
                        title={otherPrograms?.title || "Other Programs"}
                        subtitle={otherPrograms?.description || "Extra-curricular and co-curricular activities."}
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {(otherPrograms?.programs || []).map((program, index) => (
                            <Card key={index} className="flex flex-col hover:shadow-premium transition-all duration-300 border-l-4 border-l-[#F5A623]">
                                {program.image && (
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={getImageSrc(program.image)}
                                            alt={program.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-xl text-[#2C4F5E]">{program.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-muted-foreground leading-relaxed">
                                        {program.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Card className="bg-[#2C4F5E] text-white max-w-4xl mx-auto">
                            <CardContent className="p-8 md:p-12 text-center space-y-6">
                                <h3 className="text-2xl font-bold">Interested in Our Programs?</h3>
                                <p className="text-white/90 max-w-2xl mx-auto">
                                    Contact us to learn more about our programs and how to enroll.
                                </p>
                                <Button asChild className="bg-[#F5A623] hover:bg-[#FFB84D] text-white mt-4">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>
        </div>
    )
}
