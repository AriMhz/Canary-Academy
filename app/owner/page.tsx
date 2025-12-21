"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, ImageIcon, Calendar, BookOpen, TrendingUp, Lock, LogOut, Edit3, Layout, Settings, Globe, AlertTriangle } from "lucide-react"
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

// Security constants
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes
const SESSION_EXPIRY_MS = 60 * 60 * 1000 // 1 hour
const MAX_INPUT_LENGTH = 100

// Security helper functions
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .slice(0, MAX_INPUT_LENGTH)
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
}

const generateSessionToken = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`
}

const getLoginAttempts = (): { count: number; lockoutUntil: number | null } => {
  try {
    const data = sessionStorage.getItem("loginAttempts")
    if (data) {
      return JSON.parse(data)
    }
  } catch {
    // Invalid data, reset
  }
  return { count: 0, lockoutUntil: null }
}

const setLoginAttempts = (count: number, lockoutUntil: number | null) => {
  sessionStorage.setItem("loginAttempts", JSON.stringify({ count, lockoutUntil }))
}

const isSessionValid = (): boolean => {
  try {
    const sessionData = sessionStorage.getItem("adminSession")
    if (sessionData) {
      const { token, expiresAt } = JSON.parse(sessionData)
      if (token && expiresAt && Date.now() < expiresAt) {
        return true
      }
      // Session expired, clear it
      sessionStorage.removeItem("adminSession")
    }
  } catch {
    sessionStorage.removeItem("adminSession")
  }
  return false
}

const createSession = () => {
  const sessionData = {
    token: generateSessionToken(),
    expiresAt: Date.now() + SESSION_EXPIRY_MS
  }
  sessionStorage.setItem("adminSession", JSON.stringify(sessionData))
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutRemaining, setLockoutRemaining] = useState(0)
  const [attemptsRemaining, setAttemptsRemaining] = useState(MAX_LOGIN_ATTEMPTS)
  const [selectedTab, setSelectedTab] = useState("overview")
  const { language, setLanguage, t } = useLanguage()

  // Check for existing valid session on mount
  useEffect(() => {
    if (isSessionValid()) {
      setIsLoggedIn(true)
    }

    // Check lockout status
    const { count, lockoutUntil } = getLoginAttempts()
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setIsLocked(true)
      setLockoutRemaining(Math.ceil((lockoutUntil - Date.now()) / 1000))
    }
    setAttemptsRemaining(MAX_LOGIN_ATTEMPTS - count)
  }, [])

  // Lockout countdown timer
  useEffect(() => {
    if (!isLocked) return

    const timer = setInterval(() => {
      const { lockoutUntil } = getLoginAttempts()
      if (lockoutUntil && Date.now() < lockoutUntil) {
        setLockoutRemaining(Math.ceil((lockoutUntil - Date.now()) / 1000))
      } else {
        // Lockout expired
        setIsLocked(false)
        setLockoutRemaining(0)
        setLoginAttempts(0, null)
        setAttemptsRemaining(MAX_LOGIN_ATTEMPTS)
        setError("")
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isLocked])


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if currently locked out
    if (isLocked) {
      return
    }

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username)
    const sanitizedPassword = sanitizeInput(password)

    // Validate inputs
    if (!sanitizedUsername || !sanitizedPassword) {
      setError("Please enter valid credentials")
      return
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: sanitizedUsername,
          password: sanitizedPassword
        })
      })

      const data = await response.json()

      if (data.success) {
        // Successful login - store session
        const sessionData = {
          token: data.token,
          expiresAt: data.expiresAt
        }
        sessionStorage.setItem("adminSession", JSON.stringify(sessionData))
        setIsLoggedIn(true)
        setError("")
        setAttemptsRemaining(MAX_LOGIN_ATTEMPTS)
        // Clear sensitive data
        setUsername("")
        setPassword("")
      } else {
        // Failed login
        if (data.lockoutRemaining && data.lockoutRemaining > 0) {
          setIsLocked(true)
          setLockoutRemaining(data.lockoutRemaining)
          setError("Too many failed attempts. Account temporarily locked.")
        } else {
          setAttemptsRemaining(data.remainingAttempts || 0)
          setError(data.error || "Invalid credentials")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminSession")
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    setError("")
  }

  // Format lockout time
  const formatLockoutTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
              {/* Lockout warning banner */}
              {isLocked && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Account Temporarily Locked</p>
                    <p className="text-sm text-red-600 mt-1">
                      Too many failed login attempts. Please try again in{' '}
                      <span className="font-mono font-bold">{formatLockoutTime(lockoutRemaining)}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">{t('admin.username')}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                  required
                  disabled={isLocked}
                  maxLength={MAX_INPUT_LENGTH}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('admin.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                  required
                  disabled={isLocked}
                  maxLength={MAX_INPUT_LENGTH}
                  autoComplete="current-password"
                />
              </div>
              {error && !isLocked && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#FFB84D] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLocked}
              >
                {isLocked ? `Locked (${formatLockoutTime(lockoutRemaining)})` : t('admin.signIn')}
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
