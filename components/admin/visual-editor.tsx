"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save, LayoutTemplate, Settings2 } from "lucide-react"
import { getCMSContent, saveCMSContent, saveCMSSection, fetchCMSContent, type CMSContent } from "@/lib/cms-storage"
import { useToast } from "@/hooks/use-toast"
import { FormField, TextInput, TextAreaInput, NumberInput, ImageInput, VideoInput, FileInput, ArrayInput } from "./form-fields"
import { AdminArticlesManager } from "./admin-articles-manager"

export function VisualEditor() {
  const { toast } = useToast()
  const [content, setContent] = useState<CMSContent>(getCMSContent())
  const [activeTab, setActiveTab] = useState("home")
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize content from API
  useEffect(() => {
    const load = async () => {
      const data = await fetchCMSContent()
      setContent(data)
    }
    load()
  }, [])

  const handleSave = async () => {
    let success = false
    try {
      if (activeTab === "home") {
        const s1 = await saveCMSSection("hero", content.hero)
        const s2 = await saveCMSSection("features", content.features)
        const s3 = await saveCMSSection("programs", content.programs)
        const s4 = await saveCMSSection("testimonials", content.testimonials)
        // Add news if it's considered part of home in this editor? 
        // Looking at line 196, "news" is nested under Home in Accordion.
        // Wait, Step 197 shows AccordionItem value="news" under TabsContent value="home".
        // So "news" IS part of HOME in VisualEditor.
        // Note: In ContentEditor, News was separate or Articles was separate.
        // In VisualEditor, content.news is edited under Home tab?
        // Line 199: items={content.news}.
        // So I MUST save news if activeTab is "home".
        const s5 = await saveCMSSection("news", (content as any).news)
        success = s1 && s2 && s3 && s4 && s5
      }
      else if (activeTab === "about") {
        success = await saveCMSSection("about", content.about)
      }
      else if (activeTab === "academics") {
        success = await saveCMSSection("academics", content.academics)
      }
      else if (activeTab === "admissions") {
        success = await saveCMSSection("admissions", content.admissions)
      }
      else if (activeTab === "contact") {
        success = await saveCMSSection("contact", content.contact)
      }
      else if (activeTab === "articles") {
        // VisualEditor also has 'articles' tab using AdminArticlesManager
        // AdminArticlesManager typically uses 'news' or 'articles' key.
        // Since 'news' is already under 'home', maybe 'articles' is redundant? 
        // Or maybe AdminArticlesManager updates 'news' too.
        success = await saveCMSSection("news", (content as any).news)
      } else {
        success = await saveCMSContent(content)
      }

      if (success) {
        setHasChanges(false)
        toast({
          title: "Changes saved",
          description: "Your website content has been updated successfully.",
        })
      }
    } catch (e) {
      console.error(e)
      toast({
        title: "Save failed",
        description: "Could not save content",
        variant: "destructive"
      })
    }
  }

  // Deep update helper
  const updateContent = (path: string[], value: any) => {
    setContent((prev) => {
      const newContent = { ...prev }
      let current: any = newContent

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {}
        current = current[path[i]]
      }

      current[path[path.length - 1]] = value
      return newContent
    })
    setHasChanges(true)
  }

  // Helper bindings
  const bind = (path: string[]) => ({
    value: path.reduce((obj: any, key) => obj?.[key], content) || "",
    onChange: (val: any) => updateContent(path, val),
  })

  // File Upload Handlers
  const handleUpload = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      callback(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Pages Configuration
  const pages = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "academics", label: "Academics" },
    { id: "contact", label: "Contact" },
    { id: "admissions", label: "Admissions" },

    { id: "articles", label: "Articles" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* EDITOR */}
      <div className="w-full bg-white border-r border-gray-200 flex flex-col h-screen shadow-xl z-20 overflow-hidden">
        <div className="p-4 border-b bg-[#2C4F5E] text-white flex justify-between items-center shadow-sm">
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5" />
              Content Editor
            </h2>
          </div>
          {hasChanges && (
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-[#F5A623] hover:bg-[#FFB84D] text-white shadow-sm"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          )}
        </div>

        {/* Page Selector Area */}
        <div className="px-4 py-4 bg-gray-50 border-b">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Settings2 className="w-4 h-4" />
            Select Page to Edit
          </div>
          <div className="flex flex-wrap gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActiveTab(page.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border ${activeTab === page.id
                  ? "bg-[#2C4F5E] text-white border-[#2C4F5E] shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2C4F5E] hover:text-[#2C4F5E]"
                  }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} className="flex-1 flex flex-col overflow-hidden bg-white min-h-0">
          <ScrollArea className="flex-1 p-4 h-full">

            {/* MESSAGE FOR EMPTY STATES OR DEFAULTS */}

            {/* HOME PAGE */}
            <TabsContent value="home" className="mt-0 space-y-4">
              <div className="pb-2 items-center">
                <h3 className="font-bold text-[#2C4F5E]">Home Page</h3>
                <p className="text-xs text-gray-500">Edit the main landing page sections.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="hero">
                <AccordionItem value="hero" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Hero Section</AccordionTrigger>
                  <AccordionContent className="p-2 space-y-4 pt-4">
                    <FormField label="Badge Text"><TextInput {...bind(["hero", "badge"])} /></FormField>
                    <FormField label="Main Title"><TextAreaInput {...bind(["hero", "title"])} rows={2} /></FormField>
                    <FormField label="Subtitle"><TextAreaInput {...bind(["hero", "subtitle"])} rows={3} /></FormField>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField label="CTA Button"><TextInput {...bind(["hero", "cta"])} /></FormField>
                      <FormField label="Learn More"><TextInput {...bind(["hero", "learnMore"])} /></FormField>
                    </div>
                    <FormField label="Video"><VideoInput {...bind(["hero", "backgroundVideo"])} onUpload={(f) => handleUpload(f, v => updateContent(["hero", "backgroundVideo"], v))} /></FormField>
                    <Separator className="my-2" />
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Stats</label>
                      {Object.entries(content.hero.stats).map(([k, s]) => (
                        <div key={k} className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded">
                          <TextInput value={String(s.value)} onChange={v => updateContent(["hero", "stats", k, "value"], Number(v) || 0)} />
                          <TextInput value={s.label} onChange={v => updateContent(["hero", "stats", k, "label"], v)} />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* FEATURES */}
                <AccordionItem value="features" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Features</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["features", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextAreaInput {...bind(["features", "subtitle"])} /></FormField>
                    <Separator />
                    <ArrayInput items={content.features.items} onAdd={() => updateContent(["features", "items"], [...content.features.items, { title: "New", description: "", image: "", icon: "" }])} onRemove={(i) => updateContent(["features", "items"], content.features.items.filter((_, idx) => idx !== i))} itemLabel="Feature" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.title} onChange={v => updateContent(["features", "items", index.toString(), "title"], v)} />
                        <TextAreaInput value={item.description} onChange={v => updateContent(["features", "items", index.toString(), "description"], v)} />
                        <ImageInput value={item.image} onChange={v => updateContent(["features", "items", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["features", "items", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                {/* PROGRAMS */}
                <AccordionItem value="programs" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Programs</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["programs", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextAreaInput {...bind(["programs", "subtitle"])} /></FormField>
                    <Separator />
                    <ArrayInput items={content.programs.items} onAdd={() => updateContent(["programs", "items"], [...content.programs.items, { level: "New", description: "", subjects: [] }])} onRemove={(i) => updateContent(["programs", "items"], content.programs.items.filter((_, idx) => idx !== i))} itemLabel="Program" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.level} onChange={v => updateContent(["programs", "items", index.toString(), "level"], v)} />
                        <TextAreaInput value={item.description} onChange={v => updateContent(["programs", "items", index.toString(), "description"], v)} />
                        <TextAreaInput value={item.subjects.join("\n")} onChange={v => updateContent(["programs", "items", index.toString(), "subjects"], v.split("\n"))} rows={3} placeholder="Subjects (one per line)" />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                {/* NEWS */}
                <AccordionItem value="news" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">News</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <ArrayInput items={content.news} onAdd={() => updateContent(["news"], [...content.news, { id: Date.now(), title: "News", date: "", category: "", excerpt: "", image: "" }])} onRemove={(i) => updateContent(["news"], content.news.filter((_, idx) => idx !== i))} itemLabel="News" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.title} onChange={v => updateContent(["news", index.toString(), "title"], v)} />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput value={item.date} onChange={v => updateContent(["news", index.toString(), "date"], v)} placeholder="Date" />
                          <TextInput value={item.category} onChange={v => updateContent(["news", index.toString(), "category"], v)} placeholder="Category" />
                        </div>
                        <TextAreaInput value={item.excerpt} onChange={v => updateContent(["news", index.toString(), "excerpt"], v)} />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput value={item.videoUrl || ""} onChange={v => updateContent(["news", index.toString(), "videoUrl"], v)} placeholder="YouTube Video URL (optional)" />
                          <TextInput value={item.image} onChange={v => updateContent(["news", index.toString(), "image"], v)} placeholder="Image Path" />
                        </div>
                        <ImageInput value={item.image} onChange={v => updateContent(["news", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["news", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                {/* TESTIMONIALS */}
                <AccordionItem value="testimonials" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Testimonials</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["testimonials", "title"])} /></FormField>
                    <ArrayInput items={content.testimonials.items} onAdd={() => updateContent(["testimonials", "items"], [...content.testimonials.items, { name: "Name", role: "", content: "", rating: 5 }])} onRemove={(i) => updateContent(["testimonials", "items"], content.testimonials.items.filter((_, idx) => idx !== i))} itemLabel="Review" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput value={item.name} onChange={v => updateContent(["testimonials", "items", index.toString(), "name"], v)} placeholder="Name" />
                          <TextInput value={item.role} onChange={v => updateContent(["testimonials", "items", index.toString(), "role"], v)} placeholder="Role" />
                        </div>
                        <TextAreaInput value={item.content} onChange={v => updateContent(["testimonials", "items", index.toString(), "content"], v)} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* ABOUT PAGE */}
            <TabsContent value="about" className="mt-0 space-y-4">
              <div className="pb-2 items-center">
                <h3 className="font-bold text-[#2C4F5E]">About Page</h3>
                <p className="text-xs text-gray-500">History, Mission, and Team.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="hero">
                <AccordionItem value="hero" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Hero Section</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["about", "hero", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["about", "hero", "description"])} rows={3} /></FormField>
                    <FormField label="Background Image"><ImageInput {...bind(["about", "hero", "image"])} onUpload={(f) => handleUpload(f, v => updateContent(["about", "hero", "image"], v))} /></FormField>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="story" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Our Story</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["about", "story", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextAreaInput {...bind(["about", "story", "subtitle"])} /></FormField>
                    <FormField label="Paragraph 1"><TextAreaInput {...bind(["about", "story", "paragraph1"])} rows={5} /></FormField>
                    <FormField label="Paragraph 2"><TextAreaInput {...bind(["about", "story", "paragraph2"])} rows={5} /></FormField>
                    <FormField label="Image Caption"><TextInput {...bind(["about", "story", "imageCaption"])} /></FormField>
                    <FormField label="Story Image"><ImageInput {...bind(["about", "story", "image"])} onUpload={(f) => handleUpload(f, v => updateContent(["about", "story", "image"], v))} /></FormField>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="smc" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">School Management Committee</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["about", "committee", "smc", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["about", "committee", "smc", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput items={content.about.committee?.smc?.members || []} onAdd={() => updateContent(["about", "committee", "smc", "members"], [...(content.about.committee?.smc?.members || []), { name: "New Member", designation: "", image: "", phone: "", email: "" }])} onRemove={(i) => updateContent(["about", "committee", "smc", "members"], (content.about.committee?.smc?.members || []).filter((_, idx) => idx !== i))} itemLabel="Member" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.name} onChange={v => updateContent(["about", "committee", "smc", "members", index.toString(), "name"], v)} placeholder="Name" />
                        <TextInput value={item.designation} onChange={v => updateContent(["about", "committee", "smc", "members", index.toString(), "designation"], v)} placeholder="Designation" />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput value={item.phone || ""} onChange={v => updateContent(["about", "committee", "smc", "members", index.toString(), "phone"], v)} placeholder="Phone" />
                          <TextInput value={item.email || ""} onChange={v => updateContent(["about", "committee", "smc", "members", index.toString(), "email"], v)} placeholder="Email" />
                        </div>
                        <ImageInput value={item.image} onChange={v => updateContent(["about", "committee", "smc", "members", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["about", "committee", "smc", "members", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="soc" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">School Operation Committee</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["about", "committee", "soc", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["about", "committee", "soc", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput items={content.about.committee?.soc?.members || []} onAdd={() => updateContent(["about", "committee", "soc", "members"], [...(content.about.committee?.soc?.members || []), { name: "New Member", designation: "", image: "", phone: "", email: "" }])} onRemove={(i) => updateContent(["about", "committee", "soc", "members"], (content.about.committee?.soc?.members || []).filter((_, idx) => idx !== i))} itemLabel="Member" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.name} onChange={v => updateContent(["about", "committee", "soc", "members", index.toString(), "name"], v)} placeholder="Name" />
                        <TextInput value={item.designation} onChange={v => updateContent(["about", "committee", "soc", "members", index.toString(), "designation"], v)} placeholder="Designation" />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput value={item.phone || ""} onChange={v => updateContent(["about", "committee", "soc", "members", index.toString(), "phone"], v)} placeholder="Phone" />
                          <TextInput value={item.email || ""} onChange={v => updateContent(["about", "committee", "soc", "members", index.toString(), "email"], v)} placeholder="Email" />
                        </div>
                        <ImageInput value={item.image} onChange={v => updateContent(["about", "committee", "soc", "members", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["about", "committee", "soc", "members", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tpa" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Parent Teacher Organization</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["about", "committee", "tpa", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["about", "committee", "tpa", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput items={content.about.committee?.tpa?.members || []} onAdd={() => updateContent(["about", "committee", "tpa", "members"], [...(content.about.committee?.tpa?.members || []), { name: "New Member", designation: "", image: "", phone: "", email: "" }])} onRemove={(i) => updateContent(["about", "committee", "tpa", "members"], (content.about.committee?.tpa?.members || []).filter((_, idx) => idx !== i))} itemLabel="Member" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.name} onChange={v => updateContent(["about", "committee", "tpa", "members", index.toString(), "name"], v)} placeholder="Name" />
                        <TextInput value={item.designation} onChange={v => updateContent(["about", "committee", "tpa", "members", index.toString(), "designation"], v)} placeholder="Designation" />
                        <div className="grid grid-cols-2 gap-2">
                          <TextInput value={item.phone || ""} onChange={v => updateContent(["about", "committee", "tpa", "members", index.toString(), "phone"], v)} placeholder="Phone" />
                          <TextInput value={item.email || ""} onChange={v => updateContent(["about", "committee", "tpa", "members", index.toString(), "email"], v)} placeholder="Email" />
                        </div>
                        <ImageInput value={item.image} onChange={v => updateContent(["about", "committee", "tpa", "members", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["about", "committee", "tpa", "members", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="orgStructure" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Organizational Structure</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Page Title"><TextInput {...bind(["about", "orgStructure", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["about", "orgStructure", "description"])} rows={2} /></FormField>
                    <FormField label="Structure Image / Chart">
                      <ImageInput
                        value={content.about.orgStructure?.image || ""}
                        onChange={v => updateContent(["about", "orgStructure", "image"], v)}
                        onUpload={f => handleUpload(f, v => updateContent(["about", "orgStructure", "image"], v))}
                      />
                    </FormField>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* ACADEMICS PAGE */}
            <TabsContent value="academics" className="mt-0 space-y-4">
              <div className="pb-2 items-center">
                <h3 className="font-bold text-[#2C4F5E]">Academics</h3>
                <p className="text-xs text-gray-500">Subjects, Classes, and Calendar.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="subjects">
                <AccordionItem value="subjects" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Subjects</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["academics", "subjects", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["academics", "subjects", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput items={content.academics?.subjects?.items || []} onAdd={() => updateContent(["academics", "subjects", "items"], [...(content.academics?.subjects?.items || []), { name: "Subject", image: "" }])} onRemove={(i) => updateContent(["academics", "subjects", "items"], (content.academics?.subjects?.items || []).filter((_, idx) => idx !== i))} itemLabel="Subject" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.name} onChange={v => updateContent(["academics", "subjects", "items", index.toString(), "name"], v)} placeholder="Subject Name" />
                        <ImageInput value={item.image} onChange={v => updateContent(["academics", "subjects", "items", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["academics", "subjects", "items", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="regularClasses" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Regular Classes</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["academics", "regularClasses", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["academics", "regularClasses", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput items={content.academics?.regularClasses?.schedules || []} onAdd={() => updateContent(["academics", "regularClasses", "schedules"], [...(content.academics?.regularClasses?.schedules || []), { grade: "Grade", time: "", subjects: "" }])} onRemove={(i) => updateContent(["academics", "regularClasses", "schedules"], (content.academics?.regularClasses?.schedules || []).filter((_, idx) => idx !== i))} itemLabel="Schedule" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.grade} onChange={v => updateContent(["academics", "regularClasses", "schedules", index.toString(), "grade"], v)} placeholder="Grade" />
                        <TextInput value={item.time} onChange={v => updateContent(["academics", "regularClasses", "schedules", index.toString(), "time"], v)} placeholder="Time" />
                        <TextAreaInput value={item.subjects} onChange={v => updateContent(["academics", "regularClasses", "schedules", index.toString(), "subjects"], v)} placeholder="Subjects" rows={2} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="otherPrograms" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Other Programs</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["academics", "otherPrograms", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["academics", "otherPrograms", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput items={content.academics?.otherPrograms?.programs || []} onAdd={() => updateContent(["academics", "otherPrograms", "programs"], [...(content.academics?.otherPrograms?.programs || []), { name: "New Program", description: "", image: "" }])} onRemove={(i) => updateContent(["academics", "otherPrograms", "programs"], (content.academics?.otherPrograms?.programs || []).filter((_, idx) => idx !== i))} itemLabel="Program" renderItem={(item, index) => (
                      <div className="space-y-2">
                        <TextInput value={item.name} onChange={v => updateContent(["academics", "otherPrograms", "programs", index.toString(), "name"], v)} placeholder="Program Name" />
                        <TextAreaInput value={item.description} onChange={v => updateContent(["academics", "otherPrograms", "programs", index.toString(), "description"], v)} placeholder="Description" rows={3} />
                        <ImageInput value={item.image} onChange={v => updateContent(["academics", "otherPrograms", "programs", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["academics", "otherPrograms", "programs", index.toString(), "image"], v))} />
                      </div>
                    )} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="calendar" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Calendar</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["academics", "calendar", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["academics", "calendar", "description"])} rows={2} placeholder="Brief description about the calendar" /></FormField>
                    <Separator className="my-2" />
                    <FormField label="Calendar File">
                      <FileInput
                        value={content.academics?.calendar?.file || ""}
                        onChange={v => updateContent(["academics", "calendar", "file"], v)}
                        onUpload={f => handleUpload(f, v => updateContent(["academics", "calendar", "file"], v))}
                        label="Upload calendar image or PDF file"
                        accept="image/*,.pdf"
                      />
                    </FormField>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* CONTACT PAGE */}
            <TabsContent value="contact" className="mt-0 space-y-4">
              <div className="pb-2 items-center">
                <h3 className="font-bold text-[#2C4F5E]">Contact Page</h3>
                <p className="text-xs text-gray-500">Contact information and details.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="hero">
                <AccordionItem value="hero" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Hero Section</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["contact", "hero", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextAreaInput {...bind(["contact", "hero", "subtitle"])} rows={2} /></FormField>
                    <FormField label="Background Image">
                      <ImageInput
                        value={content.contact?.hero?.image || ""}
                        onChange={v => updateContent(["contact", "hero", "image"], v)}
                        onUpload={f => handleUpload(f, v => updateContent(["contact", "hero", "image"], v))}
                      />
                    </FormField>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="info" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Contact Information</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Address">
                      <TextInput {...bind(["contact", "info", "address"])} placeholder="School address" />
                    </FormField>
                    <FormField label="Phone Number">
                      <TextInput {...bind(["contact", "info", "phone"])} placeholder="+977-61-123456" />
                    </FormField>
                    <FormField label="Email Address">
                      <TextInput {...bind(["contact", "info", "email"])} placeholder="info@school.edu.np" />
                    </FormField>
                    <Separator className="my-2" />
                    <FormField label="Google Maps Embed URL">
                      <TextAreaInput {...bind(["contact", "info", "mapUrl"])} rows={4} placeholder="Paste Google Maps embed URL here" />
                      <p className="text-xs text-gray-500 mt-1">Go to Google Maps → Share → Embed a map → Copy HTML</p>
                    </FormField>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="details" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Get In Touch Details</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Section Title">
                      <TextInput {...bind(["contact", "details", "title"])} placeholder="Get In Touch" />
                    </FormField>
                    <Separator className="my-2" />
                    <ArrayInput
                      items={content.contact?.details?.cards || []}
                      onAdd={() => updateContent(["contact", "details", "cards"], [...(content.contact?.details?.cards || []), { icon: "MapPin", title: "New Card", items: ["Item 1", "Item 2", "Item 3"] }])}
                      onRemove={(i) => updateContent(["contact", "details", "cards"], (content.contact?.details?.cards || []).filter((_, idx) => idx !== i))}
                      itemLabel="Contact Card"
                      renderItem={(card, index) => (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <FormField label="Icon">
                              <TextInput
                                value={card.icon}
                                onChange={v => updateContent(["contact", "details", "cards", index.toString(), "icon"], v)}
                                placeholder="MapPin, Phone, Mail, Clock"
                              />
                            </FormField>
                            <FormField label="Card Title">
                              <TextInput
                                value={card.title}
                                onChange={v => updateContent(["contact", "details", "cards", index.toString(), "title"], v)}
                                placeholder="Address, Phone, Email..."
                              />
                            </FormField>
                          </div>
                          <FormField label="Items (one per line)">
                            <TextAreaInput
                              value={card.items.join("\n")}
                              onChange={v => updateContent(["contact", "details", "cards", index.toString(), "items"], v.split("\n").filter(item => item.trim()))}
                              rows={4}
                              placeholder="Line 1&#10;Line 2&#10;Line 3"
                            />
                          </FormField>
                        </div>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* ADMISSIONS PAGE */}
            <TabsContent value="admissions" className="mt-0 space-y-4">
              <div className="pb-2 items-center">
                <h3 className="font-bold text-[#2C4F5E]">Admissions Page</h3>
                <p className="text-xs text-gray-500">Manage admission process, scholarships, fees, and forms.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="hero">
                <AccordionItem value="hero" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Hero Section</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["admissions", "hero", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextAreaInput {...bind(["admissions", "hero", "subtitle"])} rows={2} /></FormField>
                    <FormField label="Background Image">
                      <ImageInput
                        value={content.admissions?.hero?.image || ""}
                        onChange={v => updateContent(["admissions", "hero", "image"], v)}
                        onUpload={f => handleUpload(f, v => updateContent(["admissions", "hero", "image"], v))}
                      />
                    </FormField>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="process" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Admission Process</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["admissions", "process", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextInput {...bind(["admissions", "process", "subtitle"])} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput
                      items={content.admissions?.process?.steps || []}
                      onAdd={() => updateContent(["admissions", "process", "steps"], [...(content.admissions?.process?.steps || []), { step: 1, title: "New Step", description: "", icon: "FileText" }])}
                      onRemove={(i) => updateContent(["admissions", "process", "steps"], (content.admissions?.process?.steps || []).filter((_, idx) => idx !== i))}
                      itemLabel="Step"
                      renderItem={(item, index) => (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <FormField label="Step Number">
                              <NumberInput value={item.step} onChange={v => updateContent(["admissions", "process", "steps", index.toString(), "step"], v)} />
                            </FormField>
                            <FormField label="Icon">
                              <TextInput value={item.icon} onChange={v => updateContent(["admissions", "process", "steps", index.toString(), "icon"], v)} placeholder="FileText, Clock, Users..." />
                            </FormField>
                          </div>
                          <FormField label="Title">
                            <TextInput value={item.title} onChange={v => updateContent(["admissions", "process", "steps", index.toString(), "title"], v)} />
                          </FormField>
                          <FormField label="Description">
                            <TextAreaInput value={item.description} onChange={v => updateContent(["admissions", "process", "steps", index.toString(), "description"], v)} rows={2} />
                          </FormField>
                        </div>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scholarships" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Scholarships & Financial Aid</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["admissions", "scholarships", "title"])} /></FormField>
                    <FormField label="Subtitle"><TextInput {...bind(["admissions", "scholarships", "subtitle"])} /></FormField>
                    <FormField label="Badge Text"><TextInput {...bind(["admissions", "scholarships", "badge"])} /></FormField>
                    <FormField label="Main Title"><TextInput {...bind(["admissions", "scholarships", "mainTitle"])} /></FormField>
                    <FormField label="Description Paragraph 1"><TextAreaInput {...bind(["admissions", "scholarships", "description1"])} rows={3} /></FormField>
                    <FormField label="Description Paragraph 2"><TextAreaInput {...bind(["admissions", "scholarships", "description2"])} rows={3} /></FormField>
                    <Separator className="my-2" />
                    <FormField label="Apply Section Title"><TextInput {...bind(["admissions", "scholarships", "applyTitle"])} /></FormField>
                    <ArrayInput
                      items={content.admissions?.scholarships?.steps || []}
                      onAdd={() => updateContent(["admissions", "scholarships", "steps"], [...(content.admissions?.scholarships?.steps || []), { title: "New Step", description: "", icon: "FileText" }])}
                      onRemove={(i) => updateContent(["admissions", "scholarships", "steps"], (content.admissions?.scholarships?.steps || []).filter((_, idx) => idx !== i))}
                      itemLabel="Step"
                      renderItem={(item, index) => (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <FormField label="Title">
                              <TextInput value={item.title} onChange={v => updateContent(["admissions", "scholarships", "steps", index.toString(), "title"], v)} />
                            </FormField>
                            <FormField label="Icon">
                              <TextInput value={item.icon} onChange={v => updateContent(["admissions", "scholarships", "steps", index.toString(), "icon"], v)} placeholder="FileText, Users..." />
                            </FormField>
                          </div>
                          <FormField label="Description">
                            <TextAreaInput value={item.description} onChange={v => updateContent(["admissions", "scholarships", "steps", index.toString(), "description"], v)} rows={2} />
                          </FormField>
                        </div>
                      )}
                    />
                    <FormField label="Button Text"><TextInput {...bind(["admissions", "scholarships", "buttonText"])} /></FormField>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Required Documents</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["admissions", "documents", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["admissions", "documents", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <FormField label="Document List (one per line)">
                      <TextAreaInput
                        value={(content.admissions?.documents?.items || []).join("\n")}
                        onChange={v => updateContent(["admissions", "documents", "items"], v.split("\n").filter(item => item.trim()))}
                        rows={8}
                        placeholder="Birth Certificate&#10;School Leaving Certificate&#10;..."
                      />
                    </FormField>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fees" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Fee Structure</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Title"><TextInput {...bind(["admissions", "fees", "title"])} /></FormField>
                    <FormField label="Description"><TextAreaInput {...bind(["admissions", "fees", "description"])} rows={2} /></FormField>
                    <Separator className="my-2" />
                    <ArrayInput
                      items={content.admissions?.fees?.structure || []}
                      onAdd={() => updateContent(["admissions", "fees", "structure"], [...(content.admissions?.fees?.structure || []), { level: "New Level", admissionFee: "NPR 0", monthlyFee: "NPR 0" }])}
                      onRemove={(i) => updateContent(["admissions", "fees", "structure"], (content.admissions?.fees?.structure || []).filter((_, idx) => idx !== i))}
                      itemLabel="Fee Level"
                      renderItem={(item, index) => (
                        <div className="space-y-2">
                          <FormField label="Level">
                            <TextInput value={item.level} onChange={v => updateContent(["admissions", "fees", "structure", index.toString(), "level"], v)} placeholder="Primary (K-5)" />
                          </FormField>
                          <div className="grid grid-cols-2 gap-2">
                            <FormField label="Admission Fee">
                              <TextInput value={item.admissionFee} onChange={v => updateContent(["admissions", "fees", "structure", index.toString(), "admissionFee"], v)} placeholder="NPR 15,000" />
                            </FormField>
                            <FormField label="Monthly Fee">
                              <TextInput value={item.monthlyFee} onChange={v => updateContent(["admissions", "fees", "structure", index.toString(), "monthlyFee"], v)} placeholder="NPR 8,000" />
                            </FormField>
                          </div>
                        </div>
                      )}
                    />
                    <FormField label="Disclaimer"><TextAreaInput {...bind(["admissions", "fees", "disclaimer"])} rows={2} /></FormField>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="form" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Application Form</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="Form Title"><TextInput {...bind(["admissions", "form", "title"])} /></FormField>
                    <FormField label="Form Subtitle"><TextAreaInput {...bind(["admissions", "form", "subtitle"])} rows={2} /></FormField>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cta" className="border rounded-lg px-2">
                  <AccordionTrigger className="hover:no-underline font-semibold text-gray-700">Call to Action</AccordionTrigger>
                  <AccordionContent className="pt-4 p-2 space-y-4">
                    <FormField label="CTA Title"><TextInput {...bind(["admissions", "cta", "title"])} /></FormField>
                    <FormField label="CTA Description"><TextAreaInput {...bind(["admissions", "cta", "description"])} rows={2} /></FormField>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField label="Contact Button Text"><TextInput {...bind(["admissions", "cta", "contactButton"])} /></FormField>
                      <FormField label="Call Button Text"><TextInput {...bind(["admissions", "cta", "callButton"])} /></FormField>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>



            {/* ARTICLES PAGE */}
            <TabsContent value="articles" className="mt-0 space-y-4">
              <div className="pb-2 items-center">
                <h3 className="font-bold text-[#2C4F5E]">Articles / News</h3>
                <p className="text-xs text-gray-500">Manage your articles and blog posts.</p>
              </div>
              <Card className="shadow-none border-0">
                <CardContent className="p-0">
                  <AdminArticlesManager content={content} updateContent={updateContent} />
                </CardContent>
              </Card>
            </TabsContent>

          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}
