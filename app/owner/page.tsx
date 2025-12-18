"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, ImageIcon, Calendar, BookOpen, TrendingUp, Lock, LogOut, Edit3, Layout, Settings, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n-context"
import { AdminNewsManager } from "@/components/admin/admin-news-manager"
import { AdminGalleryManager } from "@/components/admin/admin-gallery-manager"
import { AdminApplications } from "@/components/admin/admin-applications"
import { AdminArticlesManager } from "@/components/admin/admin-articles-manager"
import { ContentEditor } from "@/components/admin/content-editor"
import { AdminOverview } from "@/components/admin/admin-overview"
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const session = sessionStorage.getItem("adminSession")
    if (session === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "Canary" && password === "Canary@123+123") {
      sessionStorage.setItem("adminSession", "true")
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminSession")
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
  }



  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#2C4F5E] flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="mx-auto w-12 h-12 bg-[#F5A623]/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-[#F5A623]" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#2C4F5E]">{t('admin.login')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('admin.loginDesc')}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t('admin.username')}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('admin.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
              <Button type="submit" className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white">
                {t('admin.signIn')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <section className="py-8 bg-[#2C4F5E] text-white">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{t('admin.dashboard')}</h1>
              <p className="text-white/80 mt-1">{t('admin.manageContent')}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center justify-center gap-2 px-3 py-2 rounded-full text-white hover:bg-white/10 hover:text-[#F5A623] transition-colors h-auto w-auto border border-white/20">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{language === 'en' ? 'English' : 'नेपाली'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#2C4F5E] border-white/10 text-white min-w-[120px]">
                  <DropdownMenuItem
                    className={`hover:bg-white/10 cursor-pointer ${language === 'en' ? 'font-bold text-[#F5A623]' : ''} `}
                    onClick={() => setLanguage('en')}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`hover:bg-white/10 cursor-pointer ${language === 'np' ? 'font-bold text-[#F5A623]' : ''} `}
                    onClick={() => setLanguage('np')}
                  >
                    नेपाली
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button onClick={handleLogout} variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-200 hover:text-red-100 border border-red-500/20">
                <LogOut className="w-4 h-4 mr-2" />
                {t('admin.logout')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          {/* Tab List in Container */}
          <Container>
            <div className="overflow-x-auto pb-4 -mb-4 scrollbar-hide">
              <TabsList className="bg-white/80 backdrop-blur-sm border shadow-premium p-1.5 h-auto inline-flex w-full min-w-[700px] md:w-full md:min-w-0 md:grid md:grid-cols-5 gap-1 rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 md:py-4 data-[state=active]:bg-[#F5A623]/10 data-[state=active]:text-[#F5A623] data-[state=active]:shadow-none transition-all duration-300 rounded-lg"
                >
                  <Layout className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{t('admin.tabs.overview')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="cms"
                  className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 md:py-4 data-[state=active]:bg-[#F5A623]/10 data-[state=active]:text-[#F5A623] data-[state=active]:shadow-none transition-all duration-300 rounded-lg"
                >
                  <Edit3 className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{t('admin.tabs.cms')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="news"
                  className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 md:py-4 data-[state=active]:bg-[#F5A623]/10 data-[state=active]:text-[#F5A623] data-[state=active]:shadow-none transition-all duration-300 rounded-lg"
                >
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{t('admin.tabs.news')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="gallery"
                  className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 md:py-4 data-[state=active]:bg-[#F5A623]/10 data-[state=active]:text-[#F5A623] data-[state=active]:shadow-none transition-all duration-300 rounded-lg"
                >
                  <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{t('admin.tabs.gallery')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 md:py-4 data-[state=active]:bg-[#F5A623]/10 data-[state=active]:text-[#F5A623] data-[state=active]:shadow-none transition-all duration-300 rounded-lg"
                >
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{t('admin.tabs.applications')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="articles"
                  className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 md:py-4 data-[state=active]:bg-[#F5A623]/10 data-[state=active]:text-[#F5A623] data-[state=active]:shadow-none transition-all duration-300 rounded-lg"
                >
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{t('admin.tabs.articles')}</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Container>

          {/* Visual Editor Tab - FULL SCREEN */}
          <TabsContent value="cms" className="m-0 p-0">
            <ContentEditor />
          </TabsContent>

          {/* Other Tabs in Container */}
          <Container>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <AdminOverview onNavigate={setSelectedTab} />
            </TabsContent>

            {/* News & Events Tab */}
            <TabsContent value="news">
              <AdminNewsManager />
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <AdminArticlesManager />
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <AdminApplications />
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <AdminGalleryManager />
            </TabsContent>
          </Container>
        </Tabs>
      </section>
    </div>
  )
}
