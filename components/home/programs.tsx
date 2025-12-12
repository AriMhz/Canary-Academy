import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { programs } from "@/lib/data"
import { CheckCircle2, ArrowRight, BookOpen, Rocket, UserCheck } from "lucide-react"

export function Programs() {
  const getIcon = (level: string) => {
    if (level.includes("Primary")) return BookOpen
    if (level.includes("Lower Secondary")) return Rocket
    if (level.includes("Secondary")) return UserCheck
    return BookOpen
  }

  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-500/10 to-transparent",
      "from-purple-500/10 to-transparent",
      "from-orange-500/10 to-transparent"
    ]
    return gradients[index % gradients.length]
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <Container>
        <SectionHeading
          title="Academic Programs"
          subtitle="Comprehensive curriculum designed to nurture young minds from kindergarten through secondary education."
          className="mb-16 lg:mb-20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
          {programs.map((program, index) => {
            const Icon = getIcon(program.level)
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-premium-lg border border-slate-100 hover:border-[#F5A623]/30 overflow-hidden flex flex-col h-full"
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Large Background Icon */}
                <Icon className="absolute -right-8 -bottom-8 w-40 h-40 text-slate-50 group-hover:text-slate-100 transition-colors duration-500 -rotate-12 group-hover:rotate-0 transform" strokeWidth={1} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-[#F5A623]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C4F5E] mb-3 group-hover:text-[#F5A623] transition-colors duration-300">
                      {program.level}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Subjects */}
                  <div className="flex-grow">
                    <h4 className="font-semibold text-sm text-[#2C4F5E] uppercase tracking-wider mb-4 flex items-center gap-2">
                      Core Subjects
                      <span className="h-px flex-1 bg-slate-100 group-hover:bg-[#F5A623]/30 transition-colors" />
                    </h4>
                    <ul className="space-y-3">
                      {program.subjects.slice(0, 5).map((subject, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm group/item">
                          <CheckCircle2 className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 group-hover/item:text-[#2C4F5E] transition-colors">
                            {subject}
                          </span>
                        </li>
                      ))}
                      {program.subjects.length > 5 && (
                        <li className="text-xs text-[#F5A623] font-medium pl-8 pt-1">
                          + {program.subjects.length - 5} more subjects
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action */}
                  <div className="mt-8 pt-6 border-t border-slate-100 group-hover:border-[#F5A623]/20 transition-colors">
                    <button className="flex items-center gap-2 text-sm font-bold text-[#2C4F5E] group-hover:text-[#F5A623] transition-colors uppercase tracking-wider">
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
