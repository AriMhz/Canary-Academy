"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Award, Users, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { CountUp } from "@/components/ui/count-up"
import { useLanguage } from "@/lib/i18n-context"

import { useCMS } from "@/lib/cms-context"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()
  const { content } = useCMS()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-editable="hero.backgroundVideo"
      >
        <source src={content.hero.backgroundVideo || `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/background.mp4`} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`text-white space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div
              data-editable="hero.badge"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
            >
              <Award className="w-4 h-4 text-[#F5A623]" />
              <span>{content.hero.badge}</span>
            </div>

            <h1
              data-editable="hero.title"
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance"
            >
              {content.hero.title}
            </h1>

            <p
              data-editable="hero.subtitle"
              className="text-lg sm:text-xl text-[#F5A623] leading-relaxed max-w-2xl"
            >
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white text-base px-8 h-12">
                <Link href="/admissions" data-editable="hero.cta">
                  {content.hero.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C4F5E] text-base px-8 h-12 bg-transparent"
              >
                <Link href="/about" data-editable="hero.learnMore">{content.hero.learnMore}</Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Stats Sidebar */}
          <div
            className={`transition-all duration-1000 delay-300 w-full lg:w-auto ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:py-12 lg:px-6 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-6 lg:gap-12 w-full lg:w-72 lg:ml-auto transition-all duration-300">
              <div className="space-y-1">
                <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <BookOpen className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl lg:text-2xl font-bold text-white" data-editable="hero.stats.yearsExp.value">
                      <CountUp end={content.hero.stats.yearsExp.value} suffix="+" />
                    </div>
                    <div className="text-xs lg:text-sm text-white/80" data-editable="hero.stats.yearsExp.label">{content.hero.stats.yearsExp.label}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Users className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl lg:text-2xl font-bold text-white" data-editable="hero.stats.teachers.value">
                      <CountUp end={content.hero.stats.teachers.value} suffix="+" />
                    </div>
                    <div className="text-xs lg:text-sm text-white/80" data-editable="hero.stats.teachers.label">{content.hero.stats.teachers.label}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Award className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl lg:text-2xl font-bold text-white" data-editable="hero.stats.students.value">
                      <CountUp end={content.hero.stats.students.value} suffix="+" />
                    </div>
                    <div className="text-xs lg:text-sm text-white/80" data-editable="hero.stats.students.label">{content.hero.stats.students.label}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4">
                  <div className="p-3 bg-white/10 rounded-lg shrink-0">
                    <Users className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl lg:text-2xl font-bold text-white" data-editable="hero.stats.alumni.value">
                      <CountUp end={content.hero.stats.alumni.value} suffix="+" />
                    </div>
                    <div className="text-xs lg:text-sm text-white/80" data-editable="hero.stats.alumni.label">{content.hero.stats.alumni.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
