import { Hero } from "@/components/home/hero"
// Stats removed as they are now integrated into Hero with animation
import { Features } from "@/components/home/features"
import { Programs } from "@/components/home/programs"
import { Testimonials } from "@/components/home/testimonials"
import { LatestNews } from "@/components/home/latest-news"
import { CallToAction } from "@/components/home/call-to-action"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Programs />
      <Testimonials />
      <LatestNews />
      <CallToAction />
    </>
  )
}
