"use client"

import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { useCMS } from "@/lib/cms-context"

export function CallToAction() {
  const { t } = useLanguage()
  const { content } = useCMS()

  return (
    <section className="py-20 bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance" data-editable="cta.title">
            {content.cta.title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto" data-editable="cta.text">
            {content.cta.text}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#F5A623] hover:bg-[#FFB84D] text-white text-base px-8 h-12">
              <Link href="/admissions" data-editable="cta.applyNow">
                {t("applyNow")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#2C4F5E] text-base px-8 h-12 bg-transparent"
            >
              <Link href="/contact" data-editable="cta.contactUs">
                <Phone className="mr-2 w-5 h-5" />
                {t("buttons.contactUs")}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
