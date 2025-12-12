import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { facultyData } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Award, GraduationCap, Users, BookOpen } from "lucide-react"

const stats = [
  { icon: Users, value: "50+", label: "Qualified Teachers" },
  { icon: GraduationCap, value: "15", label: "Average Years Experience" },
  { icon: Award, value: "100%", label: "Certified Educators" },
  { icon: BookOpen, value: "10:1", label: "Student-Teacher Ratio" },
]

const departments = [
  {
    name: "Primary Section",
    description: "Dedicated teachers specializing in early childhood and primary education",
  },
  {
    name: "Lower Secondary",
    description: "Experienced educators building strong subject foundations",
  },
  {
    name: "Secondary Section",
    description: "Subject matter experts preparing students for board examinations",
  },
]

export default function FacultyPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Our Faculty</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Meet our dedicated team of experienced educators who are committed to nurturing every student&apos;s
              potential.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#2C4F5E]">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading title="Leadership Team" subtitle="Experienced administrators guiding our academic vision" />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {facultyData.map((member) => (
              <Card key={member.id} className="hover:shadow-premium transition-all duration-300 group overflow-hidden">
                <div className="relative h-64 bg-muted">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="text-xl font-bold text-[#2C4F5E]">{member.name}</h3>
                  <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">{member.position}</Badge>
                  <p className="text-sm text-muted-foreground">{member.qualification}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Departments */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title="Academic Departments" subtitle="Specialized teams for each educational level" />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#F5A623]/10 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-[#F5A623]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C4F5E]">{dept.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="Why Our Teachers Excel" subtitle="What makes Canary Academy faculty exceptional" />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="border-2 border-[#F5A623]/20">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Continuous Professional Development</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Regular training workshops and seminars keep our teachers updated with the latest educational
                    methodologies.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#F5A623]/20">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Passion for Teaching</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our educators are not just teachers but mentors who genuinely care about each student&apos;s
                    success.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#F5A623]/20">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Individual Attention</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With a low student-teacher ratio, our faculty provides personalized guidance to every student.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#F5A623]/20">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Collaborative Environment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Teachers work together to create integrated learning experiences across subjects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
