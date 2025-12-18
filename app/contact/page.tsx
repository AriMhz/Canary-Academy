"use client"

import type React from "react"

import { useState } from "react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useLanguage } from "@/lib/i18n-context"

export default function ContactPage() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    setSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.info.items.0.title"),
      details: [
        t("contact.info.items.0.details.0"),
        t("contact.info.items.0.details.1"),
        t("contact.info.items.0.details.2")
      ],
    },
    {
      icon: Phone,
      title: t("contact.info.items.1.title"),
      details: [
        t("contact.info.items.1.details.0"),
        t("contact.info.items.1.details.1"),
        t("contact.info.items.1.details.2")
      ],
    },
    {
      icon: Mail,
      title: t("contact.info.items.2.title"),
      details: [
        t("contact.info.items.2.details.0"),
        t("contact.info.items.2.details.1"),
        t("contact.info.items.2.details.2")
      ],
    },
    {
      icon: Clock,
      title: t("contact.info.items.3.title"),
      details: [
        t("contact.info.items.3.details.0"),
        t("contact.info.items.3.details.1"),
        t("contact.info.items.3.details.2")
      ],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/contact-hero-bg.jpg")}
          alt={t("contact.hero.title")}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t("contact.hero.title")}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t("contact.hero.description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-muted">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionHeading title={t("contact.form.title")} subtitle="" centered={false} />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-8">
                {t("contact.form.subtitle")}
              </p>

              {submitted ? (
                <Card className="shadow-premium">
                  <CardContent className="p-12 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C4F5E]">{t("contact.form.successTitle")}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("contact.form.successText")}
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="border-2 border-[#2C4F5E] text-[#2C4F5E]"
                    >
                      {t("contact.form.buttonAgain")}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-premium">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            {t("contact.form.labels.name")} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder={t("contact.form.labels.name")}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {t("contact.form.labels.email")} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            {t("contact.form.labels.phone")} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="+977-XXX-XXXXXXX"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">
                            {t("contact.form.labels.subject")} <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            required
                            value={formData.subject}
                            onValueChange={(value) => handleChange("subject", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("contact.form.labels.subject")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admission">{t("contact.form.labels.subjects.admission")}</SelectItem>
                              <SelectItem value="general">{t("contact.form.labels.subjects.general")}</SelectItem>
                              <SelectItem value="academics">{t("contact.form.labels.subjects.academics")}</SelectItem>
                              <SelectItem value="campus">{t("contact.form.labels.subjects.campus")}</SelectItem>
                              <SelectItem value="other">{t("contact.form.labels.subjects.other")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          {t("contact.form.labels.message")} <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder={t("contact.form.labels.message")}
                          rows={6}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                        <Send className="w-4 h-4 mr-2" />
                        {t("contact.form.labels.submit")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <SectionHeading title={t("contact.visit.title")} subtitle="" centered={false} />
                <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                  {t("contact.visit.text")}
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden shadow-premium">
                <div className="relative h-[400px] bg-muted">
                  <iframe
                    src="https://maps.google.com/maps?q=Canary+Academy,+Haldibari-2,+Jhapa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Canary Academy Location"
                  />
                </div>
              </Card>

            </div>
          </div>

          {/* Extended Contact Section */}
          <div className="mt-16 max-w-5xl mx-auto space-y-8">
            {/* Quick Contact Card */}
            <Card className="bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Phone className="w-64 h-64 -mr-16 -mt-16" />
              </div>
              <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4 max-w-2xl text-center md:text-left">
                  <h3 className="text-3xl font-bold">{t("contact.visit.ctaTitle")}</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {t("contact.visit.ctaText")}
                  </p>
                </div>
                <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white text-lg px-8 py-6 h-auto shrink-0 w-full md:w-auto">
                  <a href="tel:9801444350">
                    <Phone className="w-5 h-5 mr-2" />
                    {t("contact.visit.ctaButton")}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Get In Touch Info */}
            <div>
              <h3 className="text-2xl font-bold text-[#2C4F5E] mb-6 text-center">{t("contact.info.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full">
                      <div className="w-14 h-14 bg-[#F5A623]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-7 h-7 text-[#F5A623]" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-[#2C4F5E] text-lg mb-2">{info.title}</h4>
                        <div className="space-y-1.5">
                          {info.details.map((detail, idx) => {
                            // Check if detail is an email
                            const emailMatch = detail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
                            // Check if detail is a phone number (simple check for digits and dashes/plus)
                            const phoneMatch = detail.match(/(\+?[\d-]+\d+)/);

                            if (emailMatch && detail.includes("@") && detail.includes(".")) {
                              return (
                                <a key={idx} href={`mailto:${detail}`} className="block text-sm text-muted-foreground leading-relaxed break-words hover:text-[#F5A623] transition-colors">
                                  {detail}
                                </a>
                              )
                            } else if (phoneMatch && (detail.includes("+") || detail.match(/\d{3,}/))) {
                              // Extract the number for the href
                              const number = detail.replace(/[^\d+]/g, '');
                              return (
                                <a key={idx} href={`tel:${number}`} className="block text-sm text-muted-foreground leading-relaxed break-words hover:text-[#F5A623] transition-colors">
                                  {detail}
                                </a>
                              )
                            }

                            return (
                              <p key={idx} className="text-sm text-muted-foreground leading-relaxed break-words">
                                {detail}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section >
    </div >
  )
}
