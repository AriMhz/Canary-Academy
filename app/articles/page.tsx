"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { getAssetPath } from "@/lib/get-base-path"
import { useLanguage } from "@/lib/i18n-context"
import { useCMS } from "@/lib/cms-context"
import { ArticleCard } from "@/components/article-card"

export default function ArticlesPage() {
    const { t } = useLanguage()
    const { content } = useCMS()

    const categories = [
        t("articles.categories.0") || "All",
        t("articles.categories.1") || "Education",
        t("articles.categories.2") || "Parenting",
        t("articles.categories.3") || "Student Life",
        t("articles.categories.4") || "Health"
    ]

    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    const articlesData = content.articles || []

    // Filter logic
    // Using simple category match for now. In real app, might want to normalize keys.
    const filteredArticles = selectedCategory === (t("articles.categories.0") || "All")
        ? articlesData
        : articlesData.filter(article => {
            // Try to match category vaguely since user enters text
            // Or if article has a specific category field
            return (article as any).category === selectedCategory ||
                (article as any).category?.toLowerCase() === selectedCategory.toLowerCase()
        })


    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative py-20 text-white overflow-hidden bg-[#2C4F5E]">
                {/* Background Image */}
                <Image
                    src={getAssetPath("/images/news-hero-bg.jpg")}
                    alt="Articles Hero Background"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    priority
                />

                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white blur-3xl" />
                    <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#F5A623] blur-3xl" />
                </div>

                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t("articles.hero.title")}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {t("articles.hero.description")}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Articles Section */}
            <section className="py-20 bg-gray-50">
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
                                        : "border text-[#2C4F5E] hover:bg-[#2C4F5E] hover:text-white bg-white"
                                }
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Articles Grid - 2 Columns */}
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {filteredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article as any} />
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                <Calendar className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-muted-foreground text-lg">{t("articles.noArticles")}</p>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )
}
