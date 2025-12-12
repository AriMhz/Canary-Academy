import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { programs } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, BookOpen, Microscope, Calculator, Palette, Music, Dumbbell } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"

const facilities = [
  {
    icon: Microscope,
    title: "Science Laboratories",
    description: "Well-equipped physics, chemistry, and biology labs for hands-on learning.",
  },
  {
    icon: BookOpen,
    title: "Modern Library",
    description: "Extensive collection of books, journals, and digital resources.",
  },
  {
    icon: Calculator,
    title: "Computer Lab",
    description: "Latest technology and software for digital literacy.",
  },
  {
    icon: Palette,
    title: "Art Studio",
    description: "Creative space for painting, sculpture, and visual arts.",
  },
  {
    icon: Music,
    title: "Music Room",
    description: "Instruments and equipment for musical education.",
  },
  {
    icon: Dumbbell,
    title: "Sports Facilities",
    description: "Indoor and outdoor facilities for various sports activities.",
  },
]

const cocurricular = [
  {
    category: "Sports",
    activities: ["Football", "Basketball", "Cricket", "Badminton", "Table Tennis", "Athletics"],
  },
  {
    category: "Arts & Culture",
    activities: ["Music", "Dance", "Drama", "Painting", "Debate", "Public Speaking"],
  },
  {
    category: "Clubs",
    activities: ["Science Club", "Literary Club", "Mathematics Club", "Environmental Club", "Photography Club"],
  },
]

export default function AcademicsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/academics-hero-bg.jpg")}
          alt="Academics Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Academic Excellence</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Our comprehensive curriculum and modern teaching methods ensure every student reaches their full
              potential.
            </p>
          </div>
        </Container>
      </section>

      {/* Academic Programs */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title="Our Academic Programs"
            subtitle="Structured learning pathways from kindergarten through secondary education"
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <Badge className="w-fit bg-[#F5A623] hover:bg-[#FFB84D] text-white mb-2">{program.level}</Badge>
                  <CardTitle className="text-2xl text-[#2C4F5E]">{program.level}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{program.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-[#2C4F5E]">Core Subjects:</h4>
                    <div className="space-y-1.5">
                      {program.subjects.map((subject, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                          <span className="text-muted-foreground">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading
            title="World-Class Facilities"
            subtitle="State-of-the-art infrastructure supporting modern education"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {facilities.map((facility, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300 group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 bg-[#F5A623]/10 rounded-full flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                    <facility.icon className="w-7 h-7 text-[#F5A623]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C4F5E]">{facility.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Co-curricular Activities */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading title="Beyond the Classroom" subtitle="Co-curricular activities for holistic development" />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {cocurricular.map((item, index) => (
              <Card key={index} className="border-2 border-[#F5A623]/20 shadow-premium">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#2C4F5E]">{item.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.activities.map((activity, idx) => (
                      <Badge key={idx} variant="outline" className="border-[#2C4F5E] text-[#2C4F5E]">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Our Teaching Approach"
              subtitle="Innovative methods that make learning engaging and effective"
            />
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Student-Centered Learning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We focus on individual learning styles and pace, ensuring every student receives the attention they
                    need.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Interactive Teaching</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our teachers use modern technology and hands-on activities to make learning engaging and memorable.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Critical Thinking</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We encourage students to question, analyze, and think independently rather than just memorize facts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2C4F5E]">Continuous Assessment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Regular feedback and assessment help students track their progress and identify areas for
                    improvement.
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
