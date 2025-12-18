"use client"

import { Container } from "@/components/container"
import Image from "next/image"
import { Calendar, User, ArrowLeft, Clock, Share2, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useCMS } from "@/lib/cms-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ArticleDetailPage() {
    const params = useParams()
    const id = params?.id
    const { content } = useCMS()

    // Find article in CMS content
    const article = content.articles.find((a) => a.id.toString() === id)

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <Button asChild><Link href="/articles">Back to Articles</Link></Button>
                </div>
            </div>
        )
    }

    // Get related articles (exclude current)
    const relatedArticles = content.articles
        .filter(a => a.id !== article.id)
        .slice(0, 3)

    return (
        <div className="pt-20 min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                {article.videoUrl ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${article.videoUrl.split('youtu.be/')[1]?.split('?')[0] || article.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&loop=1&playlist=${article.videoUrl.split('youtu.be/')[1]?.split('?')[0] || article.videoUrl.split('v=')[1]?.split('&')[0]}`}
                        title={article.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                ) : (
                    <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <Container className="relative z-10 h-full flex flex-col justify-end pb-16 text-white">
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Badge className="bg-[#F5A623] hover:bg-[#FFB84D] text-white border-none px-4 py-1 text-base">
                                {article.category || "Article"}
                            </Badge>
                            <div className="flex items-center gap-2 text-white/80 text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-white/90 border-t border-white/20 pt-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Calendar className="w-5 h-5 text-[#F5A623]" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Published</p>
                                    <p className="font-medium">
                                        {new Date(article.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <User className="w-5 h-5 text-[#F5A623]" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">Author</p>
                                    <p className="font-medium">{article.author || "Canary Team"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-16 -mt-10 relative z-20">
                <Container>
                    <div className="grid lg:grid-cols-[1fr_350px] gap-12 max-w-6xl mx-auto">
                        {/* Main Content */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <article className="prose prose-lg max-w-none text-slate-600 prose-headings:text-[#2C4F5E] prose-a:text-[#F5A623] prose-img:rounded-2xl">
                                <p className="text-xl md:text-2xl text-[#2C4F5E] font-medium leading-relaxed mb-8 border-l-4 border-[#F5A623] pl-6 italic bg-slate-50 py-4 pr-4 rounded-r-lg">
                                    {article.excerpt}
                                </p>

                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {article.content}
                                </div>

                                {article.videoUrl && (
                                    <div className="my-8 relative h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${article.videoUrl.split('youtu.be/')[1]?.split('?')[0] || article.videoUrl.split('v=')[1]?.split('&')[0]}`}
                                            title={article.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </article>

                            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-sm text-muted-foreground font-medium">
                                    Share this article:
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="rounded-full hover:bg-blue-50 hover:text-blue-600 border-gray-200">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Newsletter Premium Widget */}
                            <div className="bg-[#2C4F5E] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623] rounded-full blur-3xl opacity-20 -mr-10 -mt-10" />
                                <h3 className="text-xl font-bold mb-2 relative z-10">Stay Updated</h3>
                                <p className="text-white/80 text-sm mb-6 relative z-10 leading-relaxed">
                                    Get the latest articles and updates from Canary Academy directly to your inbox.
                                </p>
                                <div className="space-y-3 relative z-10">
                                    <Input
                                        placeholder="Enter your email"
                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-offset-0 focus-visible:ring-[#F5A623]"
                                    />
                                    <Button className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white font-semibold">
                                        Subscribe Now
                                    </Button>
                                </div>
                            </div>

                            {/* Back Button Widget */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <Button asChild variant="ghost" className="w-full justify-start gap-2 text-[#2C4F5E] hover:text-[#F5A623] hover:bg-orange-50 -ml-2">
                                    <Link href="/articles">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to All Articles
                                    </Link>
                                </Button>
                            </div>
                        </aside>
                    </div>
                </Container>
            </section>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
                <section className="py-20 bg-muted/30">
                    <Container>
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-[#2C4F5E] mb-2">Related Articles</h2>
                                <p className="text-muted-foreground">More articles you might be interested in</p>
                            </div>
                            <Button asChild variant="outline" className="hidden md:flex">
                                <Link href="/articles">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedArticles.map((item) => (
                                <Link href={`/articles/${item.id}`} key={item.id} className="group">
                                    <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                            <Badge className="absolute top-4 right-4 bg-white/90 text-[#2C4F5E] hover:bg-white backdrop-blur-sm">
                                                {item.category || "Article"}
                                            </Badge>
                                        </div>
                                        <CardHeader className="p-6">
                                            <div className="flex items-center gap-2 text-xs font-medium text-[#F5A623] mb-3">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(item.date).toLocaleDateString()}
                                            </div>
                                            <h3 className="text-lg font-bold text-[#2C4F5E] group-hover:text-[#F5A623] transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h3>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </div>
    )
}
