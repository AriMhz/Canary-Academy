"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Beaker, Users, Trophy, Music, Palette, Monitor, Brain } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AcademicsPage() {
  const { t } = useLanguage()

  const facilities = [
    {
      icon: Beaker,
      title: t("academics.facilities.items.0.title"),
      description: t("academics.facilities.items.0.description"),
    },
    {
      icon: BookOpen,
      title: t("academics.facilities.items.1.title"),
      description: t("academics.facilities.items.1.description"),
    },
    {
      icon: Monitor,
      title: t("academics.facilities.items.2.title"),
      description: t("academics.facilities.items.2.description"),
    },
    {
      icon: Palette,
      title: t("academics.facilities.items.3.title"),
      description: t("academics.facilities.items.3.description"),
    },
    {
      icon: Music,
      title: t("academics.facilities.items.4.title"),
      description: t("academics.facilities.items.4.description"),
    },
    {
      icon: Trophy,
      title: t("academics.facilities.items.5.title"),
      description: t("academics.facilities.items.5.description"),
    },
  ]

  const cocurricular = [
    {
      category: t("academics.cocurricular.items.0.category"),
      activities: [
        t("academics.cocurricular.items.0.activities.0"),
        t("academics.cocurricular.items.0.activities.1"),
        t("academics.cocurricular.items.0.activities.2"),
        t("academics.cocurricular.items.0.activities.3"),
        t("academics.cocurricular.items.0.activities.4"),
        t("academics.cocurricular.items.0.activities.5"),
      ],
      icon: Trophy,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      category: t("academics.cocurricular.items.1.category"),
      activities: [
        t("academics.cocurricular.items.1.activities.0"),
        t("academics.cocurricular.items.1.activities.1"),
        t("academics.cocurricular.items.1.activities.2"),
        t("academics.cocurricular.items.1.activities.3"),
        t("academics.cocurricular.items.1.activities.4"),
        t("academics.cocurricular.items.1.activities.5"),
      ],
      icon: Palette,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      category: t("academics.cocurricular.items.2.category"),
      activities: [
        t("academics.cocurricular.items.2.activities.0"),
        t("academics.cocurricular.items.2.activities.1"),
        t("academics.cocurricular.items.2.activities.2"),
        t("academics.cocurricular.items.2.activities.3"),
        t("academics.cocurricular.items.2.activities.4"),
      ],
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
  ]

  const methodology = [
    {
      title: t("academics.methodology.items.0.title"),
      description: t("academics.methodology.items.0.description"),
      icon: Users,
    },
    {
      title: t("academics.methodology.items.1.title"),
      description: t("academics.methodology.items.1.description"),
      icon: Monitor,
    },
    {
      title: t("academics.methodology.items.2.title"),
      description: t("academics.methodology.items.2.description"),
      icon: Brain,
    },
    {
      title: t("academics.methodology.items.3.title"),
      description: t("academics.methodology.items.3.description"),
      icon: Beaker,
    },
  ]

  const programs = [
    {
      level: t("home.programs.items.0.level") || "Primary (K-5)",
      description: t("home.programs.items.0.description") || "Foundation years focusing on literacy, numeracy, and social skills development.",
      subjects: [
        t("home.programs.items.0.subjects.0"),
        t("home.programs.items.0.subjects.1"),
        t("home.programs.items.0.subjects.2"),
        t("home.programs.items.0.subjects.3"),
        t("home.programs.items.0.subjects.4"),
        t("home.programs.items.0.subjects.5")
      ],
      image: "/images/primary-school.jpg",
    },
    {
      level: t("home.programs.items.1.level") || "Lower Secondary (6-8)",
      description: t("home.programs.items.1.description") || "Building on fundamentals with deeper subject exploration and critical thinking.",
      subjects: [
        t("home.programs.items.1.subjects.0"),
        t("home.programs.items.1.subjects.1"),
        t("home.programs.items.1.subjects.2"),
        t("home.programs.items.1.subjects.3"),
        t("home.programs.items.1.subjects.4"),
        t("home.programs.items.1.subjects.5"),
        t("home.programs.items.1.subjects.6")
      ],
      image: "/images/secondary-school.jpg",
    },
    {
      level: t("home.programs.items.2.level") || "Secondary (9-10)",
      description: t("home.programs.items.2.description") || "Comprehensive preparation for board examinations and higher education.",
      subjects: [
        t("home.programs.items.2.subjects.0"),
        t("home.programs.items.2.subjects.1"),
        t("home.programs.items.2.subjects.2"),
        t("home.programs.items.2.subjects.3"),
        t("home.programs.items.2.subjects.4"),
        t("home.programs.items.2.subjects.5"),
        t("home.programs.items.2.subjects.6")
      ],
      image: "/images/library.jpg",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/academics-hero-bg.jpg")}
          alt={t("academics.hero.title")}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t("academics.hero.title")}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t("academics.hero.description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Academic Programs */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title={t("academics.programs.title")}
            subtitle={t("academics.programs.subtitle")}
          />

          <div className="space-y-16 mt-12">
            {programs.map((program, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={getAssetPath(program.image)}
                      alt={program.level}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-[#F5A623]/10 rounded-full">
                    <span className="text-[#F5A623] font-semibold text-sm uppercase tracking-wider">{program.level}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-[#2C4F5E]">{program.level}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h4 className="font-semibold text-[#2C4F5E] mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#F5A623]" />
                      {t("academics.programs.start")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors cursor-default">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-muted/50">
        <Container>
          <SectionHeading
            title={t("academics.methodology.title")}
            subtitle={t("academics.methodology.subtitle")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {methodology.map((item, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center space-y-4 pt-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#2C4F5E]/5 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#2C4F5E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C4F5E]">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title={t("academics.facilities.title")}
            subtitle={t("academics.facilities.subtitle")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {facilities.map((facility, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#F5A623]/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#F5A623]/10 group-hover:bg-[#F5A623] transition-colors duration-300">
                    <facility.icon className="w-6 h-6 text-[#F5A623] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2C4F5E] mb-2 group-hover:text-[#F5A623] transition-colors">{facility.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Co-curricular Activities */}
      <section className="py-20 bg-[#2C4F5E] text-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("academics.cocurricular.title")}</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t("academics.cocurricular.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cocurricular.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <item.icon className="w-8 h-8 text-[#F5A623]" />
                  <h3 className="text-2xl font-bold">{item.category}</h3>
                </div>
                <ul className="space-y-3">
                  {item.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F5A623]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
              <p className="text-xl text-white/90">
                {t("cta.text")}
              </p>
            </div>
            <Button asChild size="lg" className="bg-white text-[#F5A623] hover:bg-white/90 hover:text-[#F5A623] border-none text-lg px-8 h-14 rounded-full shadow-xl">
              <Link href="/admissions">{t("hero.cta")}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
