"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, ImageIcon, Calendar, BookOpen, TrendingUp } from "lucide-react"
import { AdminNewsManager } from "@/components/admin/admin-news-manager"
import { AdminGalleryManager } from "@/components/admin/admin-gallery-manager"
import { AdminApplications } from "@/components/admin/admin-applications"

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const stats = [
    { label: "Total Students", value: "1,247", icon: Users, change: "+12%" },
    { label: "Applications", value: "156", icon: FileText, change: "+8%" },
    { label: "News Posts", value: "24", icon: BookOpen, change: "+3" },
    { label: "Gallery Images", value: "342", icon: ImageIcon, change: "+15" },
  ]

  return (
    <div className="pt-20 min-h-screen bg-muted">
      {/* Header */}
      <section className="py-8 bg-[#2C4F5E] text-white">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-white/80 mt-1">Manage your school website content</p>
            </div>
            <Button className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">View Website</Button>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <Container>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="bg-white shadow-md p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="news">News & Events</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-premium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#F5A623]/10 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-[#F5A623]" />
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          {stat.change}
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-[#2C4F5E] mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setSelectedTab("news")}
                    variant="outline"
                    className="h-auto py-6 flex-col gap-2 border-2 hover:border-[#F5A623] hover:bg-[#F5A623]/5"
                  >
                    <FileText className="w-8 h-8 text-[#F5A623]" />
                    <span className="font-semibold">Add News Post</span>
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("gallery")}
                    variant="outline"
                    className="h-auto py-6 flex-col gap-2 border-2 hover:border-[#F5A623] hover:bg-[#F5A623]/5"
                  >
                    <ImageIcon className="w-8 h-8 text-[#F5A623]" />
                    <span className="font-semibold">Upload Images</span>
                  </Button>
                  <Button
                    onClick={() => setSelectedTab("applications")}
                    variant="outline"
                    className="h-auto py-6 flex-col gap-2 border-2 hover:border-[#F5A623] hover:bg-[#F5A623]/5"
                  >
                    <Users className="w-8 h-8 text-[#F5A623]" />
                    <span className="font-semibold">Review Applications</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New application received", time: "2 hours ago", type: "application" },
                      { action: "News post published: Annual Sports Day", time: "5 hours ago", type: "news" },
                      { action: "12 images uploaded to gallery", time: "1 day ago", type: "gallery" },
                      { action: "Application approved for Grade 5", time: "2 days ago", type: "application" },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="w-10 h-10 bg-[#F5A623]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#F5A623]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* News & Events Tab */}
            <TabsContent value="news">
              <AdminNewsManager />
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <AdminGalleryManager />
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <AdminApplications />
            </TabsContent>
          </Tabs>
        </Container>
      </section>
    </div>
  )
}
