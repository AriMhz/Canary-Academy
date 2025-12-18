"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Calendar, FileText, Users, Clock } from "lucide-react"
import Link from "next/link"
import { AdmissionForm } from "@/components/admissions/admission-form"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useLanguage } from "@/lib/i18n-context"

export default function AdmissionsPage() {
  const { t } = useLanguage()

  const admissionProcess = [
    {
      step: 1,
      title: t("admissions.process.items.0.title"),
      description: t("admissions.process.items.0.description"),
      icon: FileText,
    },
    {
      step: 2,
      title: t("admissions.process.items.1.title"),
      description: t("admissions.process.items.1.description"),
      icon: Clock,
    },
    {
      step: 3,
      title: t("admissions.process.items.2.title"),
      description: t("admissions.process.items.2.description"),
      icon: Users,
    },
    {
      step: 4,
      title: t("admissions.process.items.3.title"),
      description: t("admissions.process.items.3.description"),
      icon: CheckCircle2,
    },
  ]

  const requiredDocuments = [
    t("admissions.documents.items.0"),
    t("admissions.documents.items.1"),
    t("admissions.documents.items.2"),
    t("admissions.documents.items.3"),
    t("admissions.documents.items.4"),
    t("admissions.documents.items.5"),
  ]

  const feeStructure = [
    { level: t("home.programs.items.0.level") || "Primary (K-5)", admissionFee: "NPR 15,000", monthlyFee: "NPR 8,000" },
    { level: t("home.programs.items.1.level") || "Lower Secondary (6-8)", admissionFee: "NPR 18,000", monthlyFee: "NPR 10,000" },
    { level: t("home.programs.items.2.level") || "Secondary (9-10)", admissionFee: "NPR 20,000", monthlyFee: "NPR 12,000" },
  ]

  const importantDates = [
    { event: t("admissions.dates.items.0.event"), date: t("admissions.dates.items.0.date") },
    { event: t("admissions.dates.items.1.event"), date: t("admissions.dates.items.1.date") },
    { event: t("admissions.dates.items.2.event"), date: t("admissions.dates.items.2.date") },
    { event: t("admissions.dates.items.3.event"), date: t("admissions.dates.items.3.date") },
    { event: t("admissions.dates.items.4.event"), date: t("admissions.dates.items.4.date") },
    { event: t("admissions.dates.items.5.event"), date: t("admissions.dates.items.5.date") },
  ]

  const scholarshipSteps = [
    {
      title: t("admissions.scholarships.steps.0.title"),
      desc: t("admissions.scholarships.steps.0.desc"),
      icon: FileText
    },
    {
      title: t("admissions.scholarships.steps.1.title"),
      desc: t("admissions.scholarships.steps.1.desc"),
      icon: Users
    },
    {
      title: t("admissions.scholarships.steps.2.title"),
      desc: t("admissions.scholarships.steps.2.desc"),
      icon: CheckCircle2
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/admissions-hero-bg.jpg")}
          alt={t("admissions.hero.title")}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t("admissions.hero.title")}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t("admissions.hero.description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title={t("admissions.process.title")}
            subtitle={t("admissions.process.subtitle")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {admissionProcess.map((item) => (
              <Card key={item.step} className="hover:shadow-premium transition-all duration-300 relative">
                <div className="absolute -top-4 left-6 w-10 h-10 bg-[#F5A623] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <CardContent className="p-6 pt-10 space-y-4">
                  <div className="w-12 h-12 bg-[#F5A623]/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#F5A623]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C4F5E]">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>


      {/* Scholarships */}
      <section id="scholarships" className="py-20 bg-muted/50">
        <Container>
          <SectionHeading title={t("admissions.scholarships.title")} subtitle={t("admissions.scholarships.subtitle")} />
          <Card className="mt-12 overflow-hidden border-0 shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#2C4F5E] p-8 md:p-12 flex flex-col justify-center text-white">
                <Badge className="w-fit bg-[#F5A623] text-white hover:bg-[#F5A623] mb-6">{t("admissions.scholarships.badge")}</Badge>
                <h3 className="text-3xl font-bold mb-6">{t("admissions.scholarships.mainTitle")}</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  {t("admissions.scholarships.p1")}
                </p>
                <p className="text-white/90 leading-relaxed">
                  {t("admissions.scholarships.p2")}
                </p>
              </div>
              <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-[#2C4F5E] mb-6">{t("admissions.scholarships.applyTitle")}</h4>
                <div className="space-y-4">
                  {scholarshipSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                        <step.icon className="w-4 h-4 text-[#F5A623]" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{step.title}</h5>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 w-fit bg-[#2C4F5E] hover:bg-[#1a3b47]" asChild>
                  <Link href="/contact">{t("admissions.scholarships.button")}</Link>
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Required Documents */}
      <section className="py-20 bg-background">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading title={t("admissions.documents.title")} subtitle="" centered={false} />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                {t("admissions.documents.text")}
              </p>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Structure */}
            <div>
              <SectionHeading title={t("admissions.fees.title")} subtitle="" centered={false} />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                {t("admissions.fees.text")}
              </p>
              <div className="space-y-4">
                {feeStructure.map((fee, index) => (
                  <Card key={index} className="border-2 border-[#F5A623]/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#2C4F5E]">{fee.level}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("admissions.fees.labels.admission")}</span>
                        <span className="font-semibold text-foreground">{fee.admissionFee}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("admissions.fees.labels.monthly")}</span>
                        <span className="font-semibold text-foreground">{fee.monthlyFee}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {t("admissions.fees.disclaimer")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title={t("admissions.form.title")} subtitle={t("admissions.form.subtitle")} />
          <div className="max-w-3xl mx-auto mt-12">
            <AdmissionForm />
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-background">
        <Container>
          <Card className="bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white border-0">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{t("admissions.cta.title")}</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                {t("admissions.cta.text")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                  <Link href="/contact">{t("admissions.cta.buttonContact")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2C4F5E] bg-transparent"
                >
                  <a href="tel:+977-1-XXXXXXX">{t("admissions.cta.buttonCall")}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
