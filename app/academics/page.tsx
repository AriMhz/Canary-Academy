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
import { useCMS } from "@/lib/cms-context"

export default function AcademicsPage() {
  const { content } = useCMS()
  const { language, t } = useLanguage()

  // Helper for bilingual text
  const getBilingual = (en?: string, np?: string) => {
    return (language === 'np' && np) ? np : en || ""
  }

  // Helper for bilingual lists (optional)
  const getBilingualList = (en?: string[], np?: string[]) => {
    return (language === 'np' && np && np.length > 0) ? np : en || []
  }

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

      {/* Subjects Section (Replaces Facilities) */}
      {(content.academics?.subjects?.items?.length > 0) && (
        <section className="py-20 bg-background">
          <Container>
            <SectionHeading
              title={getBilingual(content.academics.subjects.title, content.academics.subjects.title_np) || "Our Subjects"}
              subtitle={getBilingual(content.academics.subjects.description, content.academics.subjects.description_np)}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {content.academics.subjects.items.map((subject: any, index: number) => (
                <div key={index} className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#F5A623]/30">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      {subject.image ? (
                        <Image src={subject.image} alt={subject.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-[#F5A623]">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2C4F5E] mb-2 group-hover:text-[#F5A623] transition-colors">
                        {getBilingual(subject.name, subject.name_np)}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Regular Classes Section */}
      {(content.academics?.regularClasses?.schedules?.length || 0) > 0 && (
        <section className="py-20 bg-muted/50">
          <Container>
            <SectionHeading
              title={getBilingual(content.academics.regularClasses.title, content.academics.regularClasses.title_np) || "Regular Classes"}
              subtitle={getBilingual(content.academics.regularClasses.description, content.academics.regularClasses.description_np)}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.academics.regularClasses.schedules.map((schedule: any, index: number) => (
                <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-800">
                        {getBilingual(schedule.grade, schedule.grade_np)}
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <Beaker className="w-4 h-4 mt-1 text-gray-400" />
                        <span>{getBilingual(schedule.time, schedule.time_np)}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-1 text-gray-400" />
                        <span>{getBilingual(schedule.subjects, schedule.subjects_np)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Other Programs (Replaces Co-curricular) */}
      {(content.academics?.otherPrograms?.programs?.length || 0) > 0 && (
        <section className="py-20 bg-[#2C4F5E] text-white">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {getBilingual(content.academics.otherPrograms.title, content.academics.otherPrograms.title_np) || "Other Programs"}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {getBilingual(content.academics.otherPrograms.description, content.academics.otherPrograms.description_np)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {content.academics.otherPrograms.programs.map((program: any, index: number) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors flex gap-6 items-start">
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-white/5">
                    {program.image ? (
                      <Image src={program.image} alt={program.name} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <Trophy className="w-8 h-8 text-[#F5A623]" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{getBilingual(program.name, program.name_np)}</h3>
                    <p className="text-white/80 leading-relaxed">
                      {getBilingual(program.description, program.description_np)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Academic Calendar */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title={getBilingual(content.academics?.calendar?.title, content.academics?.calendar?.title_np) || "Academic Calendar"}
            subtitle={getBilingual(content.academics?.calendar?.description, content.academics?.calendar?.description_np)}
          />
          <div className="mt-12 flex justify-center">
            {content.academics?.calendar?.file ? (
              <div className="relative w-full max-w-4xl border rounded-xl overflow-hidden shadow-lg bg-white">
                {content.academics.calendar.file.toLowerCase().endsWith('.pdf') ? (
                  <iframe src={content.academics.calendar.file} className="w-full h-[600px]" />
                ) : (
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={content.academics.calendar.file} alt="Academic Calendar" fill className="object-contain" />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 w-full max-w-2xl">
                <p className="text-gray-500">Calendar not available yet.</p>
              </div>
            )}
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
