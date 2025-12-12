import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Eye, Heart, Users, BookOpen } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for academic excellence and continuous improvement in all aspects of education.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Honesty, respect, and ethical behavior form the foundation of our community.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a supportive environment where everyone feels valued and connected.",
  },
  {
    icon: BookOpen,
    title: "Innovation",
    description: "We embrace modern teaching methods while respecting traditional educational values.",
  },
]

const milestones = [
  { year: "1999", event: "Canary Academy established with 50 students" },
  { year: "2005", event: "Expanded to include secondary education (Grades 9-10)" },
  { year: "2010", event: "New science and computer labs inaugurated" },
  { year: "2015", event: "Achieved 100% board examination pass rate" },
  { year: "2020", event: "Launched digital learning platforms" },
  { year: "2024", event: "Celebrating 25 years of educational excellence" },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/about-hero-bg.jpg"
          alt="About Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">About Canary Academy</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              For over 25 years, we have been nurturing young minds and preparing them for a bright future through
              quality education and holistic development.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-amber-50 rounded-full blur-3xl translate-x-1/2" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5A623]/10 rounded-full w-fit">
                <Target className="w-4 h-4 text-[#F5A623]" />
                <span className="text-sm font-semibold text-[#F5A623] tracking-wide uppercase">Our Heritage</span>
              </div>

              <SectionHeading
                title="Our Story"
                subtitle="A legacy of educational excellence spanning over two decades."
                centered={false}
                className="mb-0"
              />

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in <span className="font-semibold text-[#2C4F5E]">1999 (2056 BS)</span>, Canary Academy began as a humble initiative with a grand vision: to transform lives through quality education that nurtures both intellect and character.
                </p>
                <p>
                  From our first batch of 50 students to a vibrant community of over 1,000 learners today, our journey has been defined by unwavering dedication. We have evolved from a small school into one of Nepal&apos;s premier educational institutions, constantly upgrading our facilities and curriculum to meet global standards.
                </p>
                <div className="flex flex-col sm:flex-row gap-8 pt-4">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#2C4F5E]">25+</div>
                    <div className="text-sm text-muted-foreground font-medium">Years of Experience</div>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-border" />
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#2C4F5E]">1000+</div>
                    <div className="text-sm text-muted-foreground font-medium">Graduates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform transition-transform duration-700 hover:scale-[1.02] group">
                <Image
                  src="/images/school-building.jpg"
                  alt="Canary Academy Campus Building"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-premium border border-white/20 max-w-[200px]">
                  <p className="text-[#2C4F5E] font-serif italic text-lg leading-tight">
                    "Nurturing minds, building futures since 1999."
                  </p>
                </div>
              </div>

              {/* Decorative Elements around Image */}
              <div className="absolute -z-10 -top-8 -right-8 w-full h-full border-2 border-[#F5A623]/20 rounded-[2.5rem]" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full border-2 border-[#2C4F5E]/10 rounded-[2.5rem]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#F5A623]/20 shadow-premium">
              <CardContent className="p-8 space-y-4">
                <Eye className="w-12 h-12 text-[#F5A623]" />
                <h3 className="text-2xl font-bold text-[#2C4F5E]">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading educational institution in Nepal, recognized globally for academic excellence,
                  character development, and producing responsible global citizens who contribute positively to society.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#F5A623]/20 shadow-premium">
              <CardContent className="p-8 space-y-4">
                <Target className="w-12 h-12 text-[#F5A623]" />
                <h3 className="text-2xl font-bold text-[#2C4F5E]">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide quality education that nurtures intellectual curiosity, critical thinking, and moral
                  values. We aim to create a supportive learning environment where every student can discover their
                  potential and achieve excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <Container>
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide everything we do at Canary Academy"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-premium transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5A623] to-[#FFB84D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <value.icon className="w-10 h-10 text-[#F5A623]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#2C4F5E] mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title="Our Journey" subtitle="Key milestones in our 25-year history" />
          <div className="mt-16 max-w-5xl mx-auto relative">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#F5A623]/30 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  {/* Content Side */}
                  <div className="flex-1 w-full md:w-1/2 pl-12 md:pl-0">
                    <div className={`bg-card p-6 rounded-2xl shadow-lg border-l-4 border-[#F5A623] hover:shadow-premium transition-all duration-300 hover:-translate-y-1 group ${index % 2 === 0 ? "md:text-right md:border-l-0 md:border-r-4" : ""}`}>
                      <div className="text-3xl font-bold text-[#F5A623] mb-2">{milestone.year}</div>
                      <p className="text-lg text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                        {milestone.event}
                      </p>
                    </div>
                  </div>

                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#F5A623] z-10 shadow-[0_0_0_4px_rgba(245,166,35,0.2)]" />

                  {/* Empty Side for Layout Balance */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
