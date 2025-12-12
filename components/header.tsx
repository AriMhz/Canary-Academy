"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Menu, X, ChevronDown, Phone, Mail, Bell } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Academics", href: "/academics" },
  {
    name: "Admissions",
    href: "/admissions",
    children: [
      { name: "Admission Process", href: "/admissions" },
      { name: "Scholarships", href: "/admissions#scholarships" },
    ],
  },
  {
    name: "Media",
    href: "#",
    children: [
      { name: "Gallery", href: "/gallery" },
      { name: "News & Events", href: "/news" },
    ],
  },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Background transparency logic
      setIsScrolled(currentScrollY > 20)

      // Hide/Show navbar logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Scroll Down -> Hide
      } else {
        setIsVisible(true)  // Scroll Up -> Show
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${isMobileMenuOpen
        ? "bg-[#0B2447]" // No transform/transition when menu is open
        : `transition-all duration-300 ${isScrolled ? "bg-[#0B2447]/95 backdrop-blur-md shadow-md" : "bg-[#0B2447]/80 backdrop-blur-sm"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/school-20logo-20canary-20academy.png"
                alt="Canary Academy Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-white leading-tight">Canary Academy</div>
              <div className="text-xs text-[#F5A623] font-medium">Estd. 1999</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-[#F5A623] transition-colors outline-none">
                      {item.name} <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-[#0B2447] border-white/10 text-white min-w-[200px]">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.name} asChild className="focus:bg-white/10 focus:text-[#F5A623]">
                          <Link href={child.href} className="w-full cursor-pointer">
                            {child.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/90 hover:text-[#F5A623] transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5A623] transition-all group-hover:w-full" />
                </Link>
              )
            )}
          </div>

          {/* Desktop Actions (CTA + Notification) */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild className="bg-[#F5A623] hover:bg-[#FFB84D] text-white">
              <Link href="/admissions">Apply Now</Link>
            </Button>

            <Link href="/news" className="flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/10 hover:text-[#F5A623] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0B2447]" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Notification - Mobile */}
            <Link href="/news" className="p-2 text-white hover:text-[#F5A623] transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-[#F5A623] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>


      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-gradient-to-bl from-[#0B2447] via-[#0f2a4a] to-[#0B2447] transition-all duration-500 lg:hidden flex flex-col ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5">
          {/* Mobile Menu Logo */}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/images/school-20logo-20canary-20academy.png"
                alt="Canary Academy Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">Canary Academy</div>
              <div className="text-[10px] text-[#F5A623] font-medium">Estd. 1999</div>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="group p-3 text-white/80 hover:text-[#F5A623] hover:bg-white/5 rounded-full transition-all duration-300 hover:rotate-90"
            aria-label="Close Menu"
          >
            <X size={32} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
          <div className="flex flex-col gap-6 items-start text-left">
            {/* Navigation */}
            <Accordion type="single" collapsible className="w-full max-w-md">
              {navigation.map((item, index) =>
                item.children ? (
                  <AccordionItem
                    key={item.name}
                    value={item.name}
                    className={`border-b-white/10 transition-all duration-700 delay-[${index * 100}ms] ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                      }`}
                  >
                    <AccordionTrigger className="text-3xl font-bold text-white hover:text-[#F5A623] hover:no-underline py-6 justify-between gap-4 group">
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4 pl-2 pb-4 items-start border-l-2 border-[#F5A623]/30 ml-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-white/60 hover:text-[#F5A623] hover:translate-x-[8px] transition-all duration-300 block py-1 pl-4"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div
                    key={item.name}
                    className={`border-b border-white/10 w-full transition-all duration-700 delay-[${index * 100}ms] ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                      }`}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-start py-6 text-3xl font-bold text-white hover:text-[#F5A623] transition-colors w-full group"
                    >
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </div>
                )
              )}
            </Accordion>

            {/* CTA */}
            <div
              className={`mt-4 w-full max-w-md transition-all duration-1000 delay-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <Button
                asChild
                className="bg-[#F5A623] hover:bg-[#FFB84D] text-white w-full h-14 text-xl font-bold shadow-[0_0_20px_rgba(245,166,35,0.3)] hover:shadow-[0_0_30px_rgba(245,166,35,0.5)] transition-all duration-300"
              >
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div
              className={`mt-12 w-full max-w-md border-t border-white/10 pt-8 flex flex-col items-start gap-4 transition-all duration-1000 delay-700 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <a href="tel:+977-1-4354228" className="flex items-center gap-3 text-white/80 hover:text-[#F5A623] transition-colors group">
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F5A623]/20 transition-colors">
                  <Phone size={20} />
                </div>
                <span className="text-lg font-medium">+977-1-4354228</span>
              </a>
              <a href="mailto:info@canaryacademy.edu.np" className="flex items-center gap-3 text-white/80 hover:text-[#F5A623] transition-colors group">
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#F5A623]/20 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="text-lg font-medium">info@canaryacademy.edu.np</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
