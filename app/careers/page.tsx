import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Clock, MapPin } from "lucide-react"
import Link from "next/link"

const positions = [
  {
    title: "English Teacher",
    department: "Secondary Section",
    type: "Full-time",
    location: "Kathmandu",
    requirements: [
      "Bachelor's degree in English or Education",
      "Minimum 2 years teaching experience",
      "Strong communication skills",
    ],
  },
  {
    title: "Science Teacher",
    department: "Lower Secondary",
    type: "Full-time",
    location: "Kathmandu",
    requirements: ["Bachelor's degree in Science", "Experience with lab management", "Passion for teaching"],
  },
  {
    title: "Computer Science Teacher",
    department: "All Sections",
    type: "Full-time",
    location: "Kathmandu",
    requirements: [
      "Bachelor's degree in Computer Science/IT",
      "Programming knowledge",
      "Curriculum development experience",
    ],
  },
]

export default function CareersPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Career Opportunities</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Join our team of passionate educators and help shape the future of education at Canary Academy.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading title="Why Work With Us?" subtitle="Benefits of joining the Canary Academy family" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: GraduationCap,
                title: "Professional Growth",
                description: "Continuous training and development opportunities for career advancement.",
              },
              {
                icon: Briefcase,
                title: "Competitive Benefits",
                description: "Attractive salary packages, health benefits, and performance bonuses.",
              },
              {
                icon: Clock,
                title: "Work-Life Balance",
                description: "Reasonable working hours and a supportive work environment.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 bg-[#F5A623]/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-7 h-7 text-[#F5A623]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C4F5E]">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title="Current Openings" subtitle="Explore available positions at Canary Academy" />
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            {positions.map((position, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-[#2C4F5E] mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">{position.department}</Badge>
                        <Badge variant="outline" className="border-[#2C4F5E] text-[#2C4F5E]">
                          <Clock className="w-3 h-3 mr-1" />
                          {position.type}
                        </Badge>
                        <Badge variant="outline" className="border-[#2C4F5E] text-[#2C4F5E]">
                          <MapPin className="w-3 h-3 mr-1" />
                          {position.location}
                        </Badge>
                      </div>
                    </div>
                    <Button className="bg-[#F5A623] hover:bg-[#FFB84D] text-white whitespace-nowrap">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-[#2C4F5E] mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-[#F5A623] mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-background">
        <Container>
          <Card className="bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white border-0">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Don't See Your Role?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. Send us your resume and we'll keep you
                in mind for future opportunities.
              </p>
              <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
