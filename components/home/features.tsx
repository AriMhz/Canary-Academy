"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { features } from "@/lib/data"
import Image from "next/image"
import { ArrowRight, BookOpen, Users, Trophy, School } from "lucide-react"
import { useState, useEffect } from "react"

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0)

  const featureData = [
    {
      ...features[0], // Qualified Faculty
      image: "/features/qualified faculity.jpg",
      color: "from-[#F5A623] to-[#E08E00]",
      icon: Users
    },
    {
      ...features[1], // Modern Curriculum
      image: "/features/modern curruculumn.jpg",
      color: "from-[#4A90E2] to-[#0056D2]",
      icon: BookOpen
    },
    {
      ...features[2], // Facilities
      image: "/features/trophies.jpg",
      color: "from-[#50E3C2] to-[#2C4F5E]",
      icon: School
    },
    {
      ...features[3], // Extracurricular
      image: "/features/extra activities.jpg",
      color: "from-[#FF5F6D] to-[#FFC371]",
      icon: Trophy
    }
  ]

  const activeFeature = featureData[activeIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featureData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featureData.length])

  return (
    <section id="features-section" className="py-24 bg-white overflow-hidden transition-colors duration-500">
      <Container>
        <SectionHeading
          title="Why Choose Canary Academy?"
          subtitle="We provide a comprehensive and all-round education."
          className="mb-16 lg:mb-20"
        />
        <div className="relative">
          {/* Main Layout Wrapper */}
          <div className="flex flex-col lg:flex-row items-center">

            {/* Left Image Section */}
            <div className="w-full lg:w-7/12 relative h-[350px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-black/20 z-10" />
              <Image
                key={activeIndex} // Trigger animation on change
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                className="object-cover transition-all duration-700 scale-100 group-hover:scale-105 animate-in fade-in zoom-in-50"
              />
            </div>

            {/* Right Content Overlay */}
            <div className="w-full lg:w-[55%] lg:-ml-32 relative z-20 mt-8 lg:-mt-24">
              <div className="bg-[#2C4F5E]/90 backdrop-blur-xl border border-white/20 p-6 md:p-12 lg:p-14 rounded-3xl shadow-premium min-h-[550px] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeFeature.color} flex items-center justify-center shadow-lg mb-6`}>
                    <activeFeature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white transition-all duration-300">
                    {activeFeature.title}
                  </h2>
                  <p className="text-white/80 leading-relaxed text-lg transition-all duration-300">
                    {activeFeature.description}
                  </p>

                  <div className="inline-flex items-center text-[#F5A623] font-semibold uppercase tracking-wider cursor-pointer hover:gap-2 transition-all pt-2">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="grid grid-cols-4 gap-3 pt-8 mt-auto">
                  {featureData.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-16 rounded-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden border flex items-center justify-center group/btn ${activeIndex === index
                        ? `bg-gradient-to-br ${feature.color} border-white/50 shadow-lg scale-105`
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      aria-label={feature.title}
                    >
                      {activeIndex === index && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      )}
                      <span className={`text-xs font-semibold text-center leading-tight px-2 z-10 transition-colors duration-300 ${activeIndex === index ? "text-white" : "text-white/60 group-hover/btn:text-white"}`}>
                        {feature.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  )
}
