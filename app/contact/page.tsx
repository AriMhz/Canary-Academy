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

export default function ContactPage() {
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
      title: "Address",
      details: ["Canary Academy", "Kathmandu, Nepal", "P.O. Box: XXXX"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+977-1-XXXXXXX (Office)", "+977-98XXXXXXXX (Mobile)", "+977-1-XXXXXXX (Fax)"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@canaryacademy.edu.np", "admissions@canaryacademy.edu.np", "principal@canaryacademy.edu.np"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 4:00 PM", "Saturday: 8:00 AM - 1:00 PM", "Sunday: Closed"],
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/contact-hero-bg.jpg")}
          alt="Contact Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Contact Us</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Get in touch with us. We're here to answer your questions and help you with the admission process.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading title="Get In Touch" subtitle="Multiple ways to reach us" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 bg-[#F5A623]/10 rounded-full flex items-center justify-center">
                    <info.icon className="w-7 h-7 text-[#F5A623]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C4F5E]">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-muted">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionHeading title="Send Us A Message" subtitle="" centered={false} />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <Card className="shadow-premium">
                  <CardContent className="p-12 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C4F5E]">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Thank you for contacting us. We'll respond to your inquiry within 24-48 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="border-2 border-[#2C4F5E] text-[#2C4F5E]"
                    >
                      Send Another Message
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
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Your name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
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
                            Phone Number <span className="text-red-500">*</span>
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
                            Subject <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            required
                            value={formData.subject}
                            onValueChange={(value) => handleChange("subject", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admission">Admission Inquiry</SelectItem>
                              <SelectItem value="general">General Information</SelectItem>
                              <SelectItem value="academics">Academic Programs</SelectItem>
                              <SelectItem value="campus">Campus Tour</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div>
                <SectionHeading title="Visit Our Campus" subtitle="" centered={false} />
                <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                  We welcome you to visit our campus and see firsthand the environment where your child will learn and
                  grow. Schedule a campus tour by contacting our admissions office.
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden shadow-premium">
                <div className="relative h-[400px] bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6962717629455!2d85.31408931506223!3d27.69751198279836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a432383e63%3A0x6f3c0b7f98e7e8d4!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Canary Academy Location"
                  />
                </div>
              </Card>

              {/* Quick Contact Card */}
              <Card className="bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white border-0">
                <CardContent className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold">Schedule a Campus Tour</h3>
                  <p className="text-white/90 leading-relaxed">
                    Experience our facilities and meet our faculty. Contact us to schedule your visit.
                  </p>
                  <Button size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
