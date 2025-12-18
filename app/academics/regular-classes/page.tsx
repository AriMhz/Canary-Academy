"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useCMS } from "@/lib/cms-context"

export default function RegularClassesPage() {
    const { content } = useCMS()
    const regularClasses = content.academics.regularClasses

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 text-white overflow-hidden">
                <Image
                    src={getAssetPath("/images/academics-hero-bg.jpg")}
                    alt="Regular Classes Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{regularClasses?.title || "Regular Classes"}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {regularClasses?.description || "Daily class schedules and routines."}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Routine Section */}
            <section className="py-20 bg-background">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionHeading
                                title={regularClasses?.title || "Regular Classes"}
                                subtitle={regularClasses?.description || "Daily class schedules and routines."}
                                centered={false}
                            />
                            <div className="mt-8 space-y-4">
                                {(regularClasses?.schedules || []).map((schedule, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5 text-[#F5A623]" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-[#2C4F5E]">{schedule.grade}</h4>
                                            <p className="text-sm text-muted-foreground">{schedule.time}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{schedule.subjects}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-[#2C4F5E] text-white overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full -mr-16 -mt-16 sm:block hidden"></div>
                                <CardContent className="p-8 space-y-6 relative z-10">
                                    <h3 className="text-2xl font-bold">Why Our Regular Classes</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 text-[#F5A623] shrink-0 mt-1">✓</div>
                                            <div>
                                                <h5 className="font-semibold text-lg">Structured Learning</h5>
                                                <p className="text-white/80 text-sm">Consistent daily schedules help students develop good study habits.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 text-[#F5A623] shrink-0 mt-1">✓</div>
                                            <div>
                                                <h5 className="font-semibold text-lg">Balanced Curriculum</h5>
                                                <p className="text-white/80 text-sm">Well-rounded education covering all essential subjects.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-6 h-6 text-[#F5A623] shrink-0 mt-1">✓</div>
                                            <div>
                                                <h5 className="font-semibold text-lg">Expert Teachers</h5>
                                                <p className="text-white/80 text-sm">Qualified educators dedicated to student success.</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-[#F5A623]/20">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Calendar className="w-8 h-8 text-[#2C4F5E]" />
                                        <h3 className="text-xl font-bold text-[#2C4F5E]">Academic Calendar</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        View our academic calendar for important dates and events.
                                    </p>
                                    <Badge variant="outline" className="border-[#F5A623] text-[#2C4F5E] px-4 py-2">
                                        View Calendar
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
