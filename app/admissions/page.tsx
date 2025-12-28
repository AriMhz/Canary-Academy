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
import { useCMS } from "@/lib/cms-context"

export default function AdmissionsPage() {
  const { language, t } = useLanguage()
  const { content } = useCMS()

  const getBilingual = (en?: string, np?: string) => {
    return language === 'np' ? (np || en) : en
  }

  const getBilingualList = (enList: string[], npList?: string[]) => {
    return language === 'np' && npList && npList.length > 0 ? npList : enList
  }

  const IconMap: Record<string, any> = {
    FileText, Clock, Users, CheckCircle2, Calendar,
  }

  const getIcon = (name: string) => IconMap[name] || FileText

  // Fallback to defaults or translations if CMS content is empty/loading
  const admissionProcess = content.admissions?.process?.steps || []
  const scholarshipSteps = content.admissions?.scholarships?.steps || []
  const requiredDocuments = getBilingualList(content.admissions?.documents?.items || [], content.admissions?.documents?.items_np)
  const feeStructure = content.admissions?.fees?.structure || []

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={content.admissions?.hero?.image || getAssetPath("/images/admissions-hero-bg.jpg")}
          alt={content.admissions?.hero?.title || t("admissions.hero.title")}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {getBilingual(content.admissions?.hero?.title, content.admissions?.hero?.title_np) || t("admissions.hero.title")}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {getBilingual(content.admissions?.hero?.subtitle, content.admissions?.hero?.subtitle_np) || t("admissions.hero.description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title={getBilingual(content.admissions?.process?.title, content.admissions?.process?.title_np) || t("admissions.process.title")}
            subtitle={getBilingual(content.admissions?.process?.subtitle, content.admissions?.process?.subtitle_np) || t("admissions.process.subtitle")}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {admissionProcess.map((item: any, index: number) => {
              const Icon = getIcon(item.icon)
              return (
                <Card key={index} className="hover:shadow-premium transition-all duration-300 relative">
                  <div className="absolute -top-4 left-6 w-10 h-10 bg-[#F5A623] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step || index + 1}
                  </div>
                  <CardContent className="p-6 pt-10 space-y-4">
                    <div className="w-12 h-12 bg-[#F5A623]/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#F5A623]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C4F5E]">
                      {getBilingual(item.title, item.title_np)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getBilingual(item.description, item.description_np)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>


      {/* Scholarships */}
      <section id="scholarships" className="py-20 bg-muted/50">
        <Container>
          <SectionHeading
            title={getBilingual(content.admissions?.scholarships?.title, content.admissions?.scholarships?.title_np) || t("admissions.scholarships.title")}
            subtitle={getBilingual(content.admissions?.scholarships?.subtitle, content.admissions?.scholarships?.subtitle_np) || t("admissions.scholarships.subtitle")}
          />
          <Card className="mt-12 overflow-hidden border-0 shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#2C4F5E] p-8 md:p-12 flex flex-col justify-center text-white">
                <Badge className="w-fit bg-[#F5A623] text-white hover:bg-[#F5A623] mb-6">
                  {getBilingual(content.admissions?.scholarships?.badge, content.admissions?.scholarships?.badge_np) || t("admissions.scholarships.badge")}
                </Badge>
                <h3 className="text-3xl font-bold mb-6">
                  {getBilingual(content.admissions?.scholarships?.mainTitle, content.admissions?.scholarships?.mainTitle_np) || t("admissions.scholarships.mainTitle")}
                </h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  {getBilingual(content.admissions?.scholarships?.description1, content.admissions?.scholarships?.description1_np) || t("admissions.scholarships.p1")}
                </p>
                <p className="text-white/90 leading-relaxed">
                  {getBilingual(content.admissions?.scholarships?.description2, content.admissions?.scholarships?.description2_np) || t("admissions.scholarships.p2")}
                </p>
              </div>
              <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-[#2C4F5E] mb-6">
                  {getBilingual(content.admissions?.scholarships?.applyTitle, content.admissions?.scholarships?.applyTitle_np) || t("admissions.scholarships.applyTitle")}
                </h4>
                <div className="space-y-4">
                  {scholarshipSteps.map((step: any, index: number) => {
                    const Icon = getIcon(step.icon)
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#F5A623]" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{getBilingual(step.title, step.title_np)}</h5>
                          <p className="text-sm text-gray-600">
                            {getBilingual(step.description, step.description_np) || (step as any).desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Button className="mt-8 w-fit bg-[#2C4F5E] hover:bg-[#1a3b47]" asChild>
                  <Link href="/contact">
                    {getBilingual(content.admissions?.scholarships?.buttonText, content.admissions?.scholarships?.buttonText_np) || t("admissions.scholarships.button")}
                  </Link>
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
              <SectionHeading
                title={getBilingual(content.admissions?.documents?.title, content.admissions?.documents?.title_np) || t("admissions.documents.title")}
                subtitle=""
                centered={false}
              />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                {getBilingual(content.admissions?.documents?.description, content.admissions?.documents?.description_np) || t("admissions.documents.text")}
              </p>
              <div className="space-y-3">
                {requiredDocuments.map((doc: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Structure */}
            <div>
              <SectionHeading
                title={getBilingual(content.admissions?.fees?.title, content.admissions?.fees?.title_np) || t("admissions.fees.title")}
                subtitle=""
                centered={false}
              />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                {getBilingual(content.admissions?.fees?.description, content.admissions?.fees?.description_np) || t("admissions.fees.text")}
              </p>
              <div className="space-y-4">
                {feeStructure.map((fee: any, index: number) => (
                  <Card key={index} className="border-2 border-[#F5A623]/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#2C4F5E]">
                        {getBilingual(fee.level, fee.level_np)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("admissions.fees.labels.admission")}</span>
                        <span className="font-semibold text-foreground">
                          {getBilingual(fee.admissionFee, fee.admissionFee_np)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("admissions.fees.labels.monthly")}</span>
                        <span className="font-semibold text-foreground">
                          {getBilingual(fee.monthlyFee, fee.monthlyFee_np)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {getBilingual(content.admissions?.fees?.disclaimer, content.admissions?.fees?.disclaimer_np) || t("admissions.fees.disclaimer")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading
            title={getBilingual(content.admissions?.form?.title, content.admissions?.form?.title_np) || t("admissions.form.title")}
            subtitle={getBilingual(content.admissions?.form?.subtitle, content.admissions?.form?.subtitle_np) || t("admissions.form.subtitle")}
          />
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
              <h2 className="text-3xl md:text-4xl font-bold">
                {getBilingual(content.admissions?.cta?.title, content.admissions?.cta?.title_np) || t("admissions.cta.title")}
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                {getBilingual(content.admissions?.cta?.description, content.admissions?.cta?.description_np) || t("admissions.cta.text")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                  <Link href="/contact">
                    {getBilingual(content.admissions?.cta?.contactButton, content.admissions?.cta?.contactButton_np) || t("admissions.cta.buttonContact")}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2C4F5E] bg-transparent"
                >
                  <a href="tel:+977-1-XXXXXXX">
                    {getBilingual(content.admissions?.cta?.callButton, content.admissions?.cta?.callButton_np) || t("admissions.cta.buttonCall")}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
