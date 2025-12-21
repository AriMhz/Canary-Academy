"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from "react"
import { getCMSContent, fetchCMSContent, type CMSContent, defaultContent } from "./cms-storage"
import { useLanguage } from "./i18n-context"
import { translations } from "./translations"

interface CMSContextType {
  content: CMSContent
  isEditorMode?: boolean
  updateContent?: (path: string[], value: any) => void
  refreshContent?: () => void
}

const CMSContext = createContext<CMSContextType | null>(null)

function mergeTranslations(content: any, trans: any): any {
  // ... (keep existing implementation)
  if (!content || !trans) return content
  if (Array.isArray(content)) {
    if (!Array.isArray(trans)) return content
    return content.map((item, i) => {
      if (trans[i]) return mergeTranslations(item, trans[i])
      return item
    })
  }
  if (typeof content === "object") {
    const newContent = { ...content }
    Object.keys(newContent).forEach((key) => {
      if (trans[key] !== undefined) {
        if (typeof trans[key] === "string") {
          if (typeof newContent[key] === "string") {
            newContent[key] = trans[key]
          }
          else if (newContent[key] && typeof newContent[key] === "object" && "label" in newContent[key]) {
            newContent[key] = { ...newContent[key], label: trans[key] }
          }
        } else if (typeof trans[key] === "object") {
          newContent[key] = mergeTranslations(newContent[key], trans[key])
        }
      }
    })
    return newContent
  }
  return content
}

export function CMSProvider({
  children,
  isEditorMode = false,
  content: initialContent,
  updateContent
}: {
  children: ReactNode
  isEditorMode?: boolean
  content?: CMSContent
  updateContent?: (path: string[], value: any) => void
}) {
  // Always start with defaultContent (or passed initialContent) to match server SSR
  const [content, setContent] = useState<CMSContent>(initialContent || defaultContent)
  const { language } = useLanguage()

  // Listen for storage changes and custom events
  useEffect(() => {
    // Hydrate from API on mount
    const loadContent = async () => {
      const data = await fetchCMSContent()
      setContent(data)
    }
    loadContent()

    const handleStorageChange = async () => {
      const data = await fetchCMSContent()
      setContent(data)
    }

    // Listen for localStorage changes (from other tabs/windows)
    window.addEventListener('storage', handleStorageChange)

    // Listen for custom cms:update event (from same window)
    window.addEventListener('cms:update', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cms:update', handleStorageChange)
    }
  }, [])

  // Refresh content function
  const refreshContent = () => {
    setContent(getCMSContent())
  }


  // Default update handler if not provided
  const handleUpdateContent = (path: string[], value: any) => {
    // If external updateContent provided, use it
    if (updateContent) {
      updateContent(path, value)
      return
    }

    // Otherwise update local state and save
    setContent((prev) => {
      const newContent = { ...prev }
      let current: any = newContent
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {}
        current = current[path[i]]
      }
      current[path[path.length - 1]] = value

      // Save changes efficiently (Partial Update)
      const section = path[0] // e.g. "about", "hero", "news"
      const sectionData = newContent[section as keyof CMSContent]

      import("./cms-storage").then(mod => {
        // Only save the section that changed
        mod.saveCMSSection(section, sectionData)
      })

      return newContent
    })
  }

  // Localize content based on selected language
  const localizedContent = useMemo(() => {
    if (language === 'en') return content

    const trans = translations[language]
    if (!trans) return content

    // Create a translation object that matches CMS structure
    // We need to flatten 'home' from translations to root for features, programs, etc.
    const effectiveTranslations = {
      ...trans,
      // Spread home properties to root to match CMSContent structure
      ...(trans.home || {}),
    }

    // Merge Nepali translations over the content
    const merged = mergeTranslations(content, effectiveTranslations) as CMSContent

    // Apply CMS-based overrides for Nepali content if they exist
    if (language === 'np') {
      if (content.about?.story?.paragraph1_np) {
        merged.about.story.paragraph1 = content.about.story.paragraph1_np
      }
      if (content.about?.story?.paragraph2_np) {
        merged.about.story.paragraph2 = content.about.story.paragraph2_np
      }
    }

    return merged
  }, [content, language])

  return (
    <CMSContext.Provider value={{ content: localizedContent, isEditorMode, updateContent: handleUpdateContent, refreshContent }}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const context = useContext(CMSContext)
  if (!context) {
    // If no context, create a hook that reads directly and can refresh
    // Initialize with defaultContent to match server
    const [content, setContent] = useState<CMSContent>(defaultContent)

    useEffect(() => {
      // Hydrate on mount
      const loadContent = async () => {
        const data = await fetchCMSContent()
        setContent(data)
      }
      loadContent()

      const handleStorageChange = async () => {
        const data = await fetchCMSContent()
        setContent(data)
      }
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('cms:update', handleStorageChange)
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('cms:update', handleStorageChange)
      }
    }, [])

    return { content, isEditorMode: false, refreshContent: async () => setContent(await fetchCMSContent()) }
  }
  return context
}

