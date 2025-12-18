"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCMS } from "@/lib/cms-context"
import { FileText, ImageIcon, Users, TrendingUp, Calendar, ArrowRight, BookOpen, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n-context"
import { Badge } from "@/components/ui/badge"

interface AdminOverviewProps {
    onNavigate: (tab: string) => void
}

export function AdminOverview({ onNavigate }: AdminOverviewProps) {
    const { content } = useCMS()
    const { t } = useLanguage()
    const [applicationCount, setApplicationCount] = useState(0)
    const [recentApplications, setRecentApplications] = useState<any[]>([])

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admissions')
                if (response.ok) {
                    const data = await response.json()
                    setApplicationCount(data.length)
                    // Get last 3 applications
                    setRecentApplications(data.slice(-3).reverse())
                }
            } catch (error) {
                console.error("Failed to fetch application stats", error)
            }
        }
        fetchStats()
    }, [])

    const stats = [
        {
            title: "News & Events",
            value: content.news.length,
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            tab: "news"
        },
        {
            title: "Gallery Images",
            value: content.gallery.length,
            icon: ImageIcon,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            tab: "gallery"
        },
        {
            title: "Articles",
            value: content.articles.length,
            icon: BookOpen,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            tab: "articles" // Assuming you might have a tab for this later or it's part of something else
        },
        {
            title: "Applications",
            value: applicationCount,
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-500/10",
            tab: "applications"
        }
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-[#2C4F5E]">

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-premium hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => onNavigate(stat.tab)}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-[#2C4F5E] group-hover:text-[#F5A623] transition-colors">{stat.value}</h3>
                            </div>
                            <div className={`p-4 rounded-full ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Quick Actions - Main Focus */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#F5A623]" />
                        {t('admin.quickActions.title')}
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Button
                            onClick={() => onNavigate("news")}
                            className="h-auto p-6 flex items-start gap-4 bg-white hover:bg-gray-50 text-[#2C4F5E] border shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-lg mb-1">{t('admin.quickActions.addNews')}</div>
                                <p className="text-sm text-muted-foreground">Post updates, events, or announcements.</p>
                            </div>
                        </Button>

                        <Button
                            onClick={() => onNavigate("gallery")}
                            className="h-auto p-6 flex items-start gap-4 bg-white hover:bg-gray-50 text-[#2C4F5E] border shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-lg mb-1">{t('admin.quickActions.uploadImages')}</div>
                                <p className="text-sm text-muted-foreground">Add photos to the school gallery.</p>
                            </div>
                        </Button>

                        <Button
                            onClick={() => onNavigate("applications")}
                            className="h-auto p-6 flex items-start gap-4 bg-white hover:bg-gray-50 text-[#2C4F5E] border shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="p-3 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-lg mb-1">{t('admin.quickActions.reviewApps')}</div>
                                <p className="text-sm text-muted-foreground">Check pending admission requests.</p>
                            </div>
                        </Button>

                        <Button
                            onClick={() => onNavigate("cms")}
                            className="h-auto p-6 flex items-start gap-4 bg-white hover:bg-gray-50 text-[#2C4F5E] border shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="p-3 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-lg mb-1">{t('admin.quickActions.editContent')}</div>
                                <p className="text-sm text-muted-foreground">Update page text, heroes, and info.</p>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Recent Activity / Snapshot */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="w-6 h-6 text-[#F5A623]" />
                        {t('admin.stats.recentActivity')}
                    </h2>
                    <Card className="shadow-premium border-none h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-[#2C4F5E]">Latest Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentApplications.length > 0 ? (
                                    recentApplications.map((app) => (
                                        <div key={app.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm truncate">{app.firstName} {app.lastName}</p>
                                                <p className="text-xs text-muted-foreground truncate">{new Date(app.submittedAt).toLocaleDateString()}</p>
                                            </div>
                                            <Badge variant={app.status === 'approved' ? 'default' : app.status === 'rejected' ? 'destructive' : 'secondary'} className="capitalize text-[10px] px-2 py-0.5 h-auto">
                                                {app.status}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No recent applications.</p>
                                )}

                                <Button
                                    variant="ghost"
                                    className="w-full text-[#F5A623] hover:text-[#FFB84D] hover:bg-[#F5A623]/10 text-sm mt-2 font-medium"
                                    onClick={() => onNavigate('applications')}
                                >
                                    View All Applications <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
