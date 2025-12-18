"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Eye, Heart, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAssetPath } from "@/lib/get-base-path"
import { useCMS } from "@/lib/cms-context"

const valueIcons = [Award, Heart, Users, BookOpen]

// Helper function to get image source (handles base64, URLs, and local paths)
function getImageSrc(imagePath: string | undefined, fallback: string): string {
  if (!imagePath) return getAssetPath(fallback)
  if (imagePath.startsWith('data:') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  return getAssetPath(imagePath)
}

export default function AboutPage() {
  const { content } = useCMS()
  const about = content.about

  // Admin edits content in their current language (English or Nepali)
  // Whatever they save in admin panel shows on the website
  const values = (about.values?.items || []).map((item: any, index: number) => ({
    icon: valueIcons[index] || Award,
    title: item.title,
    description: item.description,
  }))

  const milestones = about.journey?.milestones || []

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getImageSrc(about.hero?.image, "/images/about-hero-bg.jpg")}
          alt={about.hero.title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{about.hero.title}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {about.hero.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-amber-50 rounded-full blur-3xl translate-x-1/2" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5A623]/10 rounded-full w-fit">
                <Target className="w-4 h-4 text-[#F5A623]" />
                <span className="text-sm font-semibold text-[#F5A623] tracking-wide uppercase">{about.story.badge}</span>
              </div>

              <SectionHeading
                title={about.story.title}
                subtitle={about.story.subtitle}
                centered={false}
                className="mb-0"
              />

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  {about.story.paragraph1}
                </p>
                <p>
                  {about.story.paragraph2}
                </p>
                <div className="flex flex-col sm:flex-row gap-8 pt-4">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#2C4F5E]">{about.story.stats.experience.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{about.story.stats.experience.label}</div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-border" />
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#2C4F5E]">{about.story.stats.graduates.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{about.story.stats.graduates.label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform transition-transform duration-700 hover:scale-[1.02] group">
                <Image
                  src={getImageSrc(about.story?.image, "/images/school-building.jpg")}
                  alt={about.hero.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-premium border border-white/20 max-w-[200px]">
                  <p className="text-[#2C4F5E] font-serif italic text-lg leading-tight">
                    "{about.story.imageCaption}"
                  </p>
                </div>
              </div>

              {/* Decorative Elements around Image */}
              <div className="absolute -z-10 -top-8 -right-8 w-full h-full border-2 border-[#F5A623]/20 rounded-[2.5rem]" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full border-2 border-[#2C4F5E]/10 rounded-[2.5rem]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#F5A623]/20 shadow-premium">
              <CardContent className="p-8 space-y-4">
                <Eye className="w-12 h-12 text-[#F5A623]" />
                <h3 className="text-2xl font-bold text-[#2C4F5E]">{about.vision.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {about.vision.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#F5A623]/20 shadow-premium">
              <CardContent className="p-8 space-y-4">
                <Target className="w-12 h-12 text-[#F5A623]" />
                <h3 className="text-2xl font-bold text-[#2C4F5E]">{about.mission.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {about.mission.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title={about.values.title}
            subtitle={about.values.subtitle}
          />
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-premium transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5A623] to-[#FFB84D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <value.icon className="w-10 h-10 text-[#F5A623]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#2C4F5E] mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title={about.journey.title} subtitle={about.journey.subtitle} />
          <div className="mt-16 max-w-5xl mx-auto relative">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#F5A623]/30 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Content Side */}
                  <div className="flex-1 w-full md:w-1/2 pl-12 md:pl-0">
                    <div className={`bg-card p-6 rounded-2xl shadow-lg border-l-4 border-[#F5A623] hover:shadow-premium transition-all duration-300 hover:-translate-y-1 group ${index % 2 === 0 ? "md:text-right md:border-l-0 md:border-r-4" : ""}`}>
                      <div className="text-3xl font-bold text-[#F5A623] mb-2">{milestone.year}</div>
                      <p className="text-lg text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                        {milestone.event}
                      </p>
                    </div>
                  </div>

                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#F5A623] z-10 shadow-[0_0_0_4px_rgba(245,166,35,0.2)]" />

                  {/* Empty Side for Layout Balance */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </Container>

      </section>

      {/* Meet Our Team CTA */}
      <section className="py-16 bg-background">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#2C4F5E] mb-6">{about.team.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {about.team.description}
            </p>
            <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white px-8 text-lg h-12 rounded-full">
              <Link href="/about/committee">{about.team.button}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div >
  )
}
