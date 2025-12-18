"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { testimonials } from "@/lib/data"
import { Star, Quote, User } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { useCMS } from "@/lib/cms-context"

export function Testimonials() {
  const { content, isEditorMode } = useCMS()
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      <Container>
        <SectionHeading
          title={content.testimonials.title}
          subtitle={content.testimonials.subtitle}
          className="mb-16 lg:mb-20"
          data-editable-title="testimonials.title"
          data-editable-subtitle="testimonials.subtitle"
        />

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {content.testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative bg-[#2C4F5E] border border-white/10 p-6 md:p-8 rounded-3xl transition-all duration-500 ${!isEditorMode ? "hover:-translate-y-2" : ""} hover:shadow-2xl hover:shadow-[#2C4F5E]/20 overflow-hidden flex flex-col h-full shadow-xl`}
            >
              <Quote className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 text-white/5 group-hover:text-white/10 transition-colors duration-500 transform rotate-12 z-0" />

              <div className="relative z-10 flex flex-col h-full gap-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? "fill-[#F5A623] text-[#F5A623]" : "text-white/20"}`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p
                  className="text-lg text-white/90 leading-relaxed italic"
                  data-editable={`testimonials.items.${index}.content`}
                >
                  "{testimonial.content}"
                </p>

                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/10">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E08E00] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <h4
                      className="font-bold text-white group-hover:text-[#F5A623] transition-colors"
                      data-editable={`testimonials.items.${index}.name`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-sm text-white/60"
                      data-editable={`testimonials.items.${index}.role`}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
