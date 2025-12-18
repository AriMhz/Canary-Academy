"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { newsData } from "@/lib/data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useCMS } from "@/lib/cms-context"
import { useLanguage } from "@/lib/i18n-context"
import { NewsShareButton } from "@/components/news-share-button"
import Link from "next/link"

export default function NewsPage() {
  const { t } = useLanguage()
  const { content } = useCMS()
  const categories = [
    t("news.categories.0") || "All",
    t("news.categories.1") || "News",
    t("news.categories.2") || "Events",
    t("news.categories.3") || "Achievements"
  ]
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  // Get news from CMS content, default to empty array if not available
  const newsItems = content?.news || []

  // Upcoming events removed

  const filteredNews =
    selectedCategory === categories[0] ? newsItems : newsItems.filter((news) => news.category === selectedCategory || (selectedCategory !== "All" && news.category === "News"))

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src={getAssetPath("/images/news-hero-bg.jpg")}
          alt={t("news.hero.title")}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t("news.hero.title")}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t("news.hero.description")}
            </p>
          </div>
        </Container>
      </section>

      {/* News Section */}
      <section className="py-20 bg-background">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#F5A623] hover:bg-[#FFB84D] text-white"
                    : "border-2 border-[#2C4F5E] text-[#2C4F5E] hover:bg-[#2C4F5E] hover:text-white bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <Link href={`/news/${news.id}`} key={news.id} className="group">
                <Card className="overflow-hidden hover:shadow-premium transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-muted flex-shrink-0">
                    {news.videoUrl ? (
                      <Image
                        src={news.image || `https://img.youtube.com/vi/${news.videoUrl.split('v=')[1]}/hqdefault.jpg`}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Image
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <Badge className="absolute top-4 right-4 bg-[#F5A623] hover:bg-[#FFB84D] text-white z-10">
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
                    <h3 className="text-xl font-bold text-[#2C4F5E] group-hover:text-[#F5A623] transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">{news.excerpt}</p>
                    <NewsShareButton
                      title={news.title}
                      url={typeof window !== 'undefined' ? `${window.location.origin}/news/${news.id}` : undefined}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("news.noNews")}</p>
            </div>
          )}
        </Container>
      </section>

      {/* Upcoming Events Section Removed */}
    </div>
  )
}
