"use client"

import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { newsData } from "@/lib/data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n-context"
import { useCMS } from "@/lib/cms-context"

export function LatestNews() {
  const { t } = useLanguage()
  const { content } = useCMS()

  return (
    <section className="py-20 bg-muted">
      <Container>
        <SectionHeading
          title={t("home.news.title")}
          subtitle={t("home.news.subtitle")}
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {content.news.map((news, index) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-premium transition-all duration-300 group">
              <div
                className="relative h-48 overflow-hidden bg-muted"
                data-editable={`news.items.${index}.image`}
              >
                {news.videoUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${news.videoUrl.split('youtu.be/')[1]?.split('?')[0] || news.videoUrl.split('v=')[1]?.split('&')[0]}`}
                    title={news.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Link href={`/news/${news.id}`} className="block w-full h-full">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                )}
                <Badge className="absolute top-4 right-4 bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                  {news.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(news.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#2C4F5E] group-hover:text-[#F5A623] transition-colors">
                  <Link href={`/news/${news.id}`}>
                    {news.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">{news.excerpt}</p>
                <Button variant="link" className="text-[#F5A623] hover:text-[#FFB84D] p-0 h-auto" asChild>
                  <Link href={`/news/${news.id}`}>
                    {t("buttons.readMore")} <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-[#2C4F5E] text-[#2C4F5E] hover:bg-[#2C4F5E] hover:text-white bg-transparent"
          >
            <Link href="/news">{t("buttons.viewAllNews")}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
