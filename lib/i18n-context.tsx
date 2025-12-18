"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations } from './translations'

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang) {
            setLanguage(savedLang)
        }
        setIsLoaded(true)
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    const t = (path: string) => {
        const keys = path.split('.')
        let current: any = translations[language]

        for (const key of keys) {
            if (current[key] === undefined) {
                return path
            }
            current = current[key]
        }

        return current as string
    }

    if (!isLoaded) {
        return null // Avoid flash of default content
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
