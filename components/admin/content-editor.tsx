"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save, LayoutTemplate, Settings2, Home, BookOpen, GraduationCap, Phone, Info, FileText, ChevronRight, Check, Lock } from "lucide-react"
import { getCMSContent, saveCMSContent, fetchCMSContent, type CMSContent } from "@/lib/cms-storage"
import { useToast } from "@/hooks/use-toast"
import { FormField, TextInput, TextAreaInput, NumberInput, ImageInput, VideoInput, FileInput, ArrayInput } from "./form-fields"
import { AdminArticlesManager } from "./admin-articles-manager"
import { cn } from "@/lib/utils"

export function ContentEditor() {
    const { toast } = useToast()
    const [content, setContent] = useState<CMSContent>(getCMSContent())
    const [activeTab, setActiveTab] = useState("home")
    const [hasChanges, setHasChanges] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Initialize content from API
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCMSContent()
                setContent(data)
            } catch (error) {
                console.error("Failed to load CMS content", error)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])

    const handleSave = async () => {
        setIsLoading(true) // Re-use loading state or add a saving state? Re-using might hide the form. better to just await.
        // Actually, let's just await.
        const success = await saveCMSContent(content)
        if (success) {
            setHasChanges(false)
            toast({
                title: "Changes saved",
                description: "Your website content has been updated successfully.",
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

    // File Upload Handling
    const handleUpload = (file: File, callback: (result: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            callback(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    // Navigation Items
    const navItems = [
        { id: "home", label: "Home", icon: Home, description: "Landing page setup" },
        { id: "about", label: "About", icon: Info, description: "History & team" },
        { id: "academics", label: "Academics", icon: GraduationCap, description: "Programs & Calendar" },
        { id: "admissions", label: "Admissions", icon: Settings2, description: "Fees & Scholarships" }, // Icon changed for variety
        { id: "contact", label: "Contact", icon: Phone, description: "Details & Map" },
        { id: "articles", label: "Articles", icon: FileText, description: "Manage content" },
    ]

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center text-[#2C4F5E]">Loading editor...</div>
    }

    return (
        // Adjusted height to account for header + tab list + padding. 
        // Using min-h to prevent it from being too small on small screens.
        <div className="flex h-[calc(100vh-280px)] min-h-[500px] bg-gray-50/50 rounded-xl overflow-hidden border shadow-premium">

            {/* Sidebar Navigation */}
            <div className="w-64 bg-white border-r flex flex-col">
                <div className="p-4 border-b bg-[#2C4F5E]/5">
                    <h2 className="font-bold text-[#2C4F5E] flex items-center gap-2">
                        <LayoutTemplate className="w-5 h-5" />
                        Editor
                    </h2>
                </div>

                <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
                    <div className="px-3 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group text-left",
                                    activeTab === item.id
                                        ? "bg-[#2C4F5E] text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-[#F5A623]" : "text-gray-400 group-hover:text-[#2C4F5E]")} />
                                <div className="flex-1">
                                    <div>{item.label}</div>
                                    {/* <div className={cn("text-[10px]", activeTab === item.id ? "text-white/70" : "text-gray-400")}>{item.description}</div> */}
                                </div>
                                {activeTab === item.id && <ChevronRight className="w-4 h-4 text-white/50" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Footer */}
                <div className="p-4 border-t bg-gray-50">
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={cn(
                            "w-full transition-all duration-300",
                            hasChanges
                                ? "bg-[#F5A623] hover:bg-[#FFB84D] text-white shadow-lg"
                                : "bg-gray-200 text-gray-400"
                        )}
                    >
                        {hasChanges ? (
                            <>
                                <Save className="h-4 w-4 mr-2" /> Save Changes
                            </>
                        ) : (
                            <>
                                <Check className="h-4 w-4 mr-2" /> Saved
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-50/50 flex flex-col min-w-0">
                {/* Page Header */}
                <div className="h-14 border-b bg-white flex items-center px-6 justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="font-bold text-lg text-[#2C4F5E] flex items-center gap-2">
                            {navItems.find(n => n.id === activeTab)?.icon && React.createElement(navItems.find(n => n.id === activeTab)!.icon, { className: "w-5 h-5 text-[#F5A623]" })}
                            {navItems.find(n => n.id === activeTab)?.label}
                            <span className="text-gray-300 font-light">/</span>
                            <span className="text-sm font-normal text-gray-500">Edit content</span>
                        </h2>
                    </div>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="max-w-4xl mx-auto space-y-6 pb-20">

                        {activeTab === "home" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Hero Section */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible defaultValue="hero" className="w-full">
                                            <AccordionItem value="hero" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">01</div>
                                                        <span className="font-semibold text-gray-700">Hero Section</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <FormField label="Badge Text"><TextInput {...bind(["hero", "badge"])} /></FormField>
                                                        <FormField label="CTA Button"><TextInput {...bind(["hero", "cta"])} /></FormField>
                                                    </div>
                                                    <FormField label="Main Title"><TextAreaInput {...bind(["hero", "title"])} rows={2} /></FormField>
                                                    <FormField label="Subtitle"><TextAreaInput {...bind(["hero", "subtitle"])} rows={3} /></FormField>

                                                    <div className="p-3 bg-gray-50 border rounded-lg">
                                                        <label className="text-sm font-medium text-gray-500 block mb-1">Background Video</label>
                                                        <div className="text-sm text-gray-600 italic flex items-center gap-2">
                                                            <Lock className="w-3 h-3" />
                                                            Fixed (Cannot be changed via Admin)
                                                        </div>
                                                    </div>

                                                    <Separator className="my-4" />
                                                    <div className="space-y-3">
                                                        <label className="text-sm font-semibold text-[#2C4F5E]">Key Statistics</label>
                                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                                            {Object.entries(content.hero.stats).map(([k, s]) => (
                                                                <div key={k} className="bg-gray-50 p-3 rounded-lg border space-y-2">
                                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{k}</div>
                                                                    <TextInput value={String(s.value)} onChange={v => updateContent(["hero", "stats", k, "value"], Number(v) || 0)} placeholder="Value" className="bg-white" />
                                                                    <TextInput value={s.label} onChange={v => updateContent(["hero", "stats", k, "label"], v)} placeholder="Label" className="bg-white" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Features */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="features" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">02</div>
                                                        <span className="font-semibold text-gray-700">Features</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Section Title"><TextInput {...bind(["features", "title"])} /></FormField>
                                                    <FormField label="Section Subtitle"><TextAreaInput {...bind(["features", "subtitle"])} /></FormField>
                                                    <Separator />
                                                    <ArrayInput
                                                        items={content.features.items}
                                                        onAdd={() => updateContent(["features", "items"], [...content.features.items, { title: "New Feature", description: "", image: "", icon: "" }])}
                                                        onRemove={(i) => updateContent(["features", "items"], content.features.items.filter((_, idx) => idx !== i))}
                                                        itemLabel="Feature"
                                                        renderItem={(item, index) => (
                                                            <div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
                                                                <TextInput value={item.title} onChange={v => updateContent(["features", "items", index.toString(), "title"], v)} placeholder="Title" className="font-medium" />
                                                                <TextAreaInput value={item.description} onChange={v => updateContent(["features", "items", index.toString(), "description"], v)} placeholder="Description" />
                                                                <ImageInput value={item.image} onChange={v => updateContent(["features", "items", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["features", "items", index.toString(), "image"], v))} />
                                                            </div>
                                                        )} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Programs */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="programs" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">03</div>
                                                        <span className="font-semibold text-gray-700">Programs</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Title"><TextInput {...bind(["programs", "title"])} /></FormField>
                                                    <FormField label="Subtitle"><TextAreaInput {...bind(["programs", "subtitle"])} /></FormField>
                                                    <Separator />
                                                    <ArrayInput items={content.programs.items} onAdd={() => updateContent(["programs", "items"], [...content.programs.items, { level: "New Program", description: "", subjects: [] }])} onRemove={(i) => updateContent(["programs", "items"], content.programs.items.filter((_, idx) => idx !== i))} itemLabel="Program" renderItem={(item, index) => (
                                                        <div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
                                                            <TextInput value={item.level} onChange={v => updateContent(["programs", "items", index.toString(), "level"], v)} placeholder="Program Level (e.g., Primary)" className="font-medium" />
                                                            <TextAreaInput value={item.description} onChange={v => updateContent(["programs", "items", index.toString(), "description"], v)} placeholder="Description" />
                                                            <TextAreaInput value={item.subjects.join("\n")} onChange={v => updateContent(["programs", "items", index.toString(), "subjects"], v.split("\n"))} rows={3} placeholder="Subjects (one per line)" />
                                                        </div>
                                                    )} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Testimonials */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="testimonials" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xs">04</div>
                                                        <span className="font-semibold text-gray-700">Testimonials</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Section Title"><TextInput {...bind(["testimonials", "title"])} /></FormField>
                                                    <Separator />
                                                    <ArrayInput items={content.testimonials.items} onAdd={() => updateContent(["testimonials", "items"], [...content.testimonials.items, { name: "Name", role: "", content: "", rating: 5 }])} onRemove={(i) => updateContent(["testimonials", "items"], content.testimonials.items.filter((_, idx) => idx !== i))} itemLabel="Review" renderItem={(item, index) => (
                                                        <div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <TextInput value={item.name} onChange={v => updateContent(["testimonials", "items", index.toString(), "name"], v)} placeholder="Reviewer Name" className="font-medium" />
                                                                <TextInput value={item.role} onChange={v => updateContent(["testimonials", "items", index.toString(), "role"], v)} placeholder="Role (e.g., Parent)" />
                                                            </div>
                                                            <TextAreaInput value={item.content} onChange={v => updateContent(["testimonials", "items", index.toString(), "content"], v)} placeholder="Testimonial content..." />
                                                        </div>
                                                    )} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "about" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* About Hero */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Hero Section</h3>
                                        <FormField label="Title"><TextInput {...bind(["about", "hero", "title"])} /></FormField>
                                        <FormField label="Description"><TextAreaInput {...bind(["about", "hero", "description"])} rows={3} /></FormField>
                                        <FormField label="Background Image"><ImageInput {...bind(["about", "hero", "image"])} onUpload={(f) => handleUpload(f, v => updateContent(["about", "hero", "image"], v))} /></FormField>
                                    </CardContent>
                                </Card>

                                {/* Our Story */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Our Story</h3>
                                        <FormField label="Title"><TextInput {...bind(["about", "story", "title"])} /></FormField>
                                        <FormField label="Subtitle"><TextAreaInput {...bind(["about", "story", "subtitle"])} /></FormField>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField label="Paragraph 1 (English)"><TextAreaInput {...bind(["about", "story", "paragraph1"])} rows={6} /></FormField>
                                            <FormField label="Paragraph 2 (English)"><TextAreaInput {...bind(["about", "story", "paragraph2"])} rows={6} /></FormField>
                                            <FormField label="Paragraph 1 (Nepali)"><TextAreaInput {...bind(["about", "story", "paragraph1_np"])} rows={6} placeholder="Optional: Override static translation" /></FormField>
                                            <FormField label="Paragraph 2 (Nepali)"><TextAreaInput {...bind(["about", "story", "paragraph2_np"])} rows={6} placeholder="Optional: Override static translation" /></FormField>
                                        </div>
                                        <FormField label="Image Caption"><TextInput {...bind(["about", "story", "imageCaption"])} /></FormField>
                                        <FormField label="Story Image"><ImageInput {...bind(["about", "story", "image"])} onUpload={(f) => handleUpload(f, v => updateContent(["about", "story", "image"], v))} /></FormField>
                                    </CardContent>
                                </Card>

                                {/* Committees */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="smc" className="px-4 border-b">
                                                <AccordionTrigger>School Management Committee (SMC)</AccordionTrigger>
                                                <AccordionContent className="pt-2 space-y-4">
                                                    <FormField label="Title"><TextInput {...bind(["about", "committee", "smc", "title"])} /></FormField>
                                                    <FormField label="Description"><TextAreaInput {...bind(["about", "committee", "smc", "description"])} rows={2} /></FormField>
                                                    <Separator />
                                                    <ArrayInput items={content.about.committee?.smc?.members || []} onAdd={() => updateContent(["about", "committee", "smc", "members"], [...(content.about.committee?.smc?.members || []), { name: "New Member", designation: "", image: "", phone: "", email: "" }])} onRemove={(i) => updateContent(["about", "committee", "smc", "members"], (content.about.committee?.smc?.members || []).filter((_, idx) => idx !== i))} itemLabel="Member" renderItem={(item, index) => (
                                                        <div className="space-y-2 p-3 bg-gray-50 border rounded-lg">
                                                            <TextInput value={item.name} onChange={v => updateContent(["about", "committee", "smc", "members", index.toString(), "name"], v)} placeholder="Name" className="font-medium" />
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
                                            <AccordionItem value="soc" className="px-4 border-b">
                                                <AccordionTrigger>School Operation Committee (SOC)</AccordionTrigger>
                                                <AccordionContent className="pt-2 space-y-4">
                                                    {/* Reuse similar structure if needed or keep simple generic reuse */}
                                                    <FormField label="Title"><TextInput {...bind(["about", "committee", "soc", "title"])} /></FormField>
                                                    <FormField label="Description"><TextAreaInput {...bind(["about", "committee", "soc", "description"])} rows={2} /></FormField>
                                                    <Separator />
                                                    <ArrayInput items={content.about.committee?.soc?.members || []} onAdd={() => updateContent(["about", "committee", "soc", "members"], [...(content.about.committee?.soc?.members || []), { name: "New Member", designation: "", image: "", phone: "", email: "" }])} onRemove={(i) => updateContent(["about", "committee", "soc", "members"], (content.about.committee?.soc?.members || []).filter((_, idx) => idx !== i))} itemLabel="Member" renderItem={(item, index) => (
                                                        <div className="space-y-2 p-3 bg-gray-50 border rounded-lg">
                                                            <TextInput value={item.name} onChange={v => updateContent(["about", "committee", "soc", "members", index.toString(), "name"], v)} placeholder="Name" className="font-medium" />
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
                                            <AccordionItem value="tpa" className="px-4 border-b">
                                                <AccordionTrigger>Parent Teacher Association (TPA)</AccordionTrigger>
                                                <AccordionContent className="pt-2 space-y-4">
                                                    <FormField label="Title"><TextInput {...bind(["about", "committee", "tpa", "title"])} /></FormField>
                                                    <FormField label="Description"><TextAreaInput {...bind(["about", "committee", "tpa", "description"])} rows={2} /></FormField>
                                                    <Separator />
                                                    <ArrayInput items={content.about.committee?.tpa?.members || []} onAdd={() => updateContent(["about", "committee", "tpa", "members"], [...(content.about.committee?.tpa?.members || []), { name: "New Member", designation: "", image: "", phone: "", email: "" }])} onRemove={(i) => updateContent(["about", "committee", "tpa", "members"], (content.about.committee?.tpa?.members || []).filter((_, idx) => idx !== i))} itemLabel="Member" renderItem={(item, index) => (
                                                        <div className="space-y-2 p-3 bg-gray-50 border rounded-lg">
                                                            <TextInput value={item.name} onChange={v => updateContent(["about", "committee", "tpa", "members", index.toString(), "name"], v)} placeholder="Name" className="font-medium" />
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
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Organizational Structure */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Organizational Structure</h3>
                                        <FormField label="Title"><TextInput {...bind(["about", "orgStructure", "title"])} /></FormField>
                                        <FormField label="Description"><TextAreaInput {...bind(["about", "orgStructure", "description"])} rows={3} /></FormField>
                                        <FormField label="Structure Image"><ImageInput {...bind(["about", "orgStructure", "image"])} onUpload={(f) => handleUpload(f, v => updateContent(["about", "orgStructure", "image"], v))} /></FormField>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "academics" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Subjects */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Subjects</h3>
                                        <FormField label="Title"><TextInput {...bind(["academics", "subjects", "title"])} /></FormField>
                                        <FormField label="Description"><TextAreaInput {...bind(["academics", "subjects", "description"])} rows={2} /></FormField>
                                        <Separator />
                                        <ArrayInput items={content.academics?.subjects?.items || []} onAdd={() => updateContent(["academics", "subjects", "items"], [...(content.academics?.subjects?.items || []), { name: "Subject", image: "" }])} onRemove={(i) => updateContent(["academics", "subjects", "items"], (content.academics?.subjects?.items || []).filter((_, idx) => idx !== i))} itemLabel="Subject" renderItem={(item, index) => (
                                            <div className="flex items-end gap-3 p-3 bg-gray-50 rounded-lg border">
                                                <div className="flex-1 space-y-2">
                                                    <TextInput value={item.name} onChange={v => updateContent(["academics", "subjects", "items", index.toString(), "name"], v)} placeholder="Subject Name" />
                                                    <ImageInput value={item.image} onChange={v => updateContent(["academics", "subjects", "items", index.toString(), "image"], v)} onUpload={f => handleUpload(f, v => updateContent(["academics", "subjects", "items", index.toString(), "image"], v))} />
                                                </div>
                                            </div>
                                        )} />
                                    </CardContent>
                                </Card>

                                {/* Calendar */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Academic Calendar</h3>
                                        <FormField label="Title"><TextInput {...bind(["academics", "calendar", "title"])} /></FormField>
                                        <FormField label="Description"><TextAreaInput {...bind(["academics", "calendar", "description"])} rows={2} /></FormField>
                                        <Separator />
                                        <FormField label="Calendar File">
                                            <FileInput
                                                value={content.academics?.calendar?.file || ""}
                                                onChange={v => updateContent(["academics", "calendar", "file"], v)}
                                                onUpload={f => handleUpload(f, v => updateContent(["academics", "calendar", "file"], v))}
                                                label="Upload calendar image or PDF file"
                                                accept="image/*,.pdf"
                                            />
                                        </FormField>
                                    </CardContent>
                                </Card>
                            </div>
                        )}



                        {activeTab === "contact" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Hero Section</h3>
                                        <FormField label="Title"><TextInput {...bind(["contact", "hero", "title"])} /></FormField>
                                        <FormField label="Subtitle"><TextAreaInput {...bind(["contact", "hero", "subtitle"])} rows={2} /></FormField>
                                        <FormField label="Background Image">
                                            <ImageInput
                                                value={content.contact?.hero?.image || ""}
                                                onChange={v => updateContent(["contact", "hero", "image"], v)}
                                                onUpload={f => handleUpload(f, v => updateContent(["contact", "hero", "image"], v))}
                                            />
                                        </FormField>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-4 space-y-4">
                                        <h3 className="font-semibold text-lg border-b pb-2">Contact Details</h3>
                                        <FormField label="Address">
                                            <TextInput {...bind(["contact", "info", "address"])} placeholder="School address" />
                                        </FormField>
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField label="Phone Number">
                                                <TextInput {...bind(["contact", "info", "phone"])} placeholder="+977-61-123456" />
                                            </FormField>
                                            <FormField label="Email Address">
                                                <TextInput {...bind(["contact", "info", "email"])} placeholder="info@school.edu.np" />
                                            </FormField>
                                        </div>
                                        <Separator />
                                        <FormField label="Google Maps Embed URL">
                                            <TextAreaInput {...bind(["contact", "info", "mapUrl"])} rows={4} placeholder="Paste Google Maps embed URL here" />
                                        </FormField>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "admissions" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Hero Section */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="hero" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">01</div>
                                                        <span className="font-semibold text-gray-700">Hero Section</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
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
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Admission Process */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="process" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">02</div>
                                                        <span className="font-semibold text-gray-700">Admission Process</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Title"><TextInput {...bind(["admissions", "process", "title"])} /></FormField>
                                                    <FormField label="Subtitle"><TextInput {...bind(["admissions", "process", "subtitle"])} /></FormField>
                                                    <Separator />
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
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Scholarships & Financial Aid */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible defaultValue="scholarships" className="w-full">
                                            <AccordionItem value="scholarships" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs">03</div>
                                                        <span className="font-semibold text-gray-700">Scholarships & Financial Aid</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Title"><TextInput {...bind(["admissions", "scholarships", "title"])} /></FormField>
                                                    <FormField label="Subtitle"><TextInput {...bind(["admissions", "scholarships", "subtitle"])} /></FormField>
                                                    <FormField label="Badge Text"><TextInput {...bind(["admissions", "scholarships", "badge"])} /></FormField>
                                                    <FormField label="Main Title"><TextInput {...bind(["admissions", "scholarships", "mainTitle"])} /></FormField>
                                                    <FormField label="Description Paragraph 1"><TextAreaInput {...bind(["admissions", "scholarships", "description1"])} rows={3} /></FormField>
                                                    <FormField label="Description Paragraph 2"><TextAreaInput {...bind(["admissions", "scholarships", "description2"])} rows={3} /></FormField>
                                                    <Separator />
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
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Required Documents */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="documents" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs">04</div>
                                                        <span className="font-semibold text-gray-700">Required Documents</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Title"><TextInput {...bind(["admissions", "documents", "title"])} /></FormField>
                                                    <FormField label="Description"><TextAreaInput {...bind(["admissions", "documents", "description"])} rows={2} /></FormField>
                                                    <Separator />
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
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Fee Structure */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="fees" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-xs">05</div>
                                                        <span className="font-semibold text-gray-700">Fee Structure</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Title"><TextInput {...bind(["admissions", "fees", "title"])} /></FormField>
                                                    <FormField label="Description"><TextAreaInput {...bind(["admissions", "fees", "description"])} rows={2} /></FormField>
                                                    <Separator />
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
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Application Form */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="form" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold text-xs">06</div>
                                                        <span className="font-semibold text-gray-700">Application Form (Apply Online)</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="Form Title"><TextInput {...bind(["admissions", "form", "title"])} /></FormField>
                                                    <FormField label="Form Subtitle"><TextAreaInput {...bind(["admissions", "form", "subtitle"])} rows={2} /></FormField>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>

                                {/* Call to Action */}
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="cta" className="border-b px-4">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold text-xs">07</div>
                                                        <span className="font-semibold text-gray-700">Call to Action (Have Questions?)</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 space-y-4 pt-2">
                                                    <FormField label="CTA Title"><TextInput {...bind(["admissions", "cta", "title"])} /></FormField>
                                                    <FormField label="CTA Description"><TextAreaInput {...bind(["admissions", "cta", "description"])} rows={2} /></FormField>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormField label="Contact Button Text"><TextInput {...bind(["admissions", "cta", "contactButton"])} /></FormField>
                                                        <FormField label="Call Button Text"><TextInput {...bind(["admissions", "cta", "callButton"])} /></FormField>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </div>
                        )}


                        {activeTab === "articles" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-0">
                                        <AdminArticlesManager content={content} updateContent={updateContent} />
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
