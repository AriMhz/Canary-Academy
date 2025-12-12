"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { SectionHeading } from "@/components/section-heading"
import { newsData } from "@/lib/data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"

const categories = ["All", "News", "Events", "Achievements"]

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredNews =
    selectedCategory === "All" ? newsData : newsData.filter((news) => news.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/news-hero-bg.jpg"
          alt="News & Events Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">News & Events</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Stay informed about the latest happenings, achievements, and upcoming events at Canary Academy.
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
              <Card key={news.id} className="overflow-hidden hover:shadow-premium transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#F5A623] hover:bg-[#FFB84D] text-white">
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
                    {news.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{news.excerpt}</p>
                  <Button variant="link" className="text-[#F5A623] hover:text-[#FFB84D] p-0 h-auto">
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news or events found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-muted">
        <Container>
          <SectionHeading title="Upcoming Events" subtitle="Mark your calendar for these important dates" />

          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            {[
              {
                date: "April 15, 2025",
                title: "Annual Sports Day",
                description: "Inter-house sports competitions and athletic events for all grades.",
                time: "8:00 AM - 4:00 PM",
              },
              {
                date: "May 1, 2025",
                title: "Science Fair",
                description: "Students showcase innovative science projects and experiments.",
                time: "10:00 AM - 3:00 PM",
              },
              {
                date: "June 10, 2025",
                title: "Annual Function & Prize Distribution",
                description: "Celebrating academic achievements and cultural performances.",
                time: "6:00 PM - 9:00 PM",
              },
            ].map((event, index) => (
              <Card key={index} className="hover:shadow-premium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-[#F5A623] text-white rounded-lg flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                        <div className="text-xs uppercase">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-[#2C4F5E]">{event.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <Badge variant="outline" className="border-[#2C4F5E] text-[#2C4F5E]">
                          {event.time}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}
