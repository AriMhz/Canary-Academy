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

const admissionProcess = [
  {
    step: 1,
    title: "Submit Application",
    description: "Fill out the online application form with required documents.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Entrance Test",
    description: "Attend the scheduled entrance examination at our campus.",
    icon: Clock,
  },
  {
    step: 3,
    title: "Interview",
    description: "Parents and students meet with our admission committee.",
    icon: Users,
  },
  {
    step: 4,
    title: "Admission Confirmation",
    description: "Receive admission decision and complete enrollment process.",
    icon: CheckCircle2,
  },
]

const requiredDocuments = [
  "Birth certificate (original and photocopy)",
  "Previous school leaving certificate",
  "Mark sheets from previous academic year",
  "Recent passport-size photographs (4 copies)",
  "Parents/Guardian ID proof",
  "Medical records and vaccination certificates",
]

const feeStructure = [
  { level: "Primary (K-5)", admissionFee: "NPR 15,000", monthlyFee: "NPR 8,000" },
  { level: "Lower Secondary (6-8)", admissionFee: "NPR 18,000", monthlyFee: "NPR 10,000" },
  { level: "Secondary (9-10)", admissionFee: "NPR 20,000", monthlyFee: "NPR 12,000" },
]

const importantDates = [
  { event: "Application Period Opens", date: "January 1, 2025" },
  { event: "Application Deadline", date: "March 31, 2025" },
  { event: "Entrance Tests", date: "April 10-15, 2025" },
  { event: "Interview Sessions", date: "April 20-25, 2025" },
  { event: "Results Announcement", date: "May 1, 2025" },
  { event: "New Session Begins", date: "June 1, 2025" },
]

export default function AdmissionsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/admissions-hero-bg.jpg")}
          alt="Admissions Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Admissions</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Join the Canary Academy family and give your child the gift of quality education. Applications are now
              open for the 2025-26 academic year.
            </p>
          </div>
        </Container>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title="Admission Process"
            subtitle="A simple four-step process to secure your child's future"
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

      {/* Important Dates */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title="Important Dates" subtitle="Mark your calendar for key admission milestones" />
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="shadow-premium">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {importantDates.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4 border-b last:border-b-0 border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#F5A623]" />
                        <span className="font-medium text-foreground">{item.event}</span>
                      </div>
                      <span className="text-muted-foreground">{item.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Scholarships */}
      <section id="scholarships" className="py-20 bg-muted/50">
        <Container>
          <SectionHeading title="Available Scholarships" subtitle="Empowering deserving students through financial assistance" />
          <Card className="mt-12 overflow-hidden border-0 shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#2C4F5E] p-8 md:p-12 flex flex-col justify-center text-white">
                <Badge className="w-fit bg-[#F5A623] text-white hover:bg-[#F5A623] mb-6">Financial Aid</Badge>
                <h3 className="text-3xl font-bold mb-6">Scholarships at Canary Academy</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  Scholarship programs provide an excellent opportunity for students to receive financial assistance, making quality education more accessible and inclusive. Canary Academy offers a variety of scholarships to support deserving candidates and ease their academic journey.
                </p>
                <p className="text-white/90 leading-relaxed">
                  These scholarships reflect Canary Academy's commitment to empowering students from diverse backgrounds to pursue quality higher education.
                </p>
              </div>
              <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-[#2C4F5E] mb-6">How to Apply?</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Submit Application</h5>
                      <p className="text-sm text-gray-600">Submit a scholarship application along with academic transcripts and essays.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Interview</h5>
                      <p className="text-sm text-gray-600">Participate in an interview with the scholarship committee.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Supporting Materials</h5>
                      <p className="text-sm text-gray-600">Some scholarships may require additional documents depending on eligibility.</p>
                    </div>
                  </div>
                </div>
                <Button className="mt-8 w-fit bg-[#2C4F5E] hover:bg-[#1a3b47]" asChild>
                  <Link href="/contact">Enquire for Scholarship</Link>
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
              <SectionHeading title="Required Documents" subtitle="" centered={false} />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                Please ensure you have the following documents ready when submitting your application:
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
              <SectionHeading title="Fee Structure" subtitle="" centered={false} />
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                Transparent and competitive fee structure for quality education:
              </p>
              <div className="space-y-4">
                {feeStructure.map((fee, index) => (
                  <Card key={index} className="border-2 border-[#F5A623]/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#2C4F5E]">{fee.level}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Admission Fee:</span>
                        <span className="font-semibold text-foreground">{fee.admissionFee}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Monthly Fee:</span>
                        <span className="font-semibold text-foreground">{fee.monthlyFee}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Fees are subject to revision. Contact us for scholarship opportunities.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title="Apply Online" subtitle="Fill out the form below to start your admission journey" />
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
              <h2 className="text-3xl md:text-4xl font-bold">Have Questions?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Our admissions team is here to help. Contact us for a campus tour or to learn more about the admission
                process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                  <Link href="/contact">Contact Admissions</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2C4F5E] bg-transparent"
                >
                  <a href="tel:+977-1-XXXXXXX">Call Us Now</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
