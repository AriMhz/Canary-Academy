"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { getAssetPath } from "@/lib/get-base-path"
import { useLanguage } from "@/lib/i18n-context"

export function Footer() {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Hide footer on admin pages
  if (pathname?.startsWith('/owner')) {
    return null
  }

  const footerLinks = {
    quickLinks: [
      { name: t('nav.about'), href: "/about" },
      { name: t('nav.academics'), href: "/academics" },
      { name: t('nav.admissions'), href: "/admissions" },
      { name: t('nav.scholarships'), href: "/admissions#scholarships" },
      { name: t('nav.gallery'), href: "/gallery" },
    ],
    resources: [
      { name: t('nav.newsEvents'), href: "/news" }, // Using nav.newsEvents as it matches "News & Events"
      { name: t('nav.contact'), href: "/contact" },
      { name: t('footer.career'), href: "/careers" },
      { name: t('footer.privacy'), href: "/privacy" },
    ],
  }

  return (
    <footer className="bg-[#2C4F5E] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-full p-1.5 shadow-md">
                <Image
                  src={getAssetPath("/images/school-20logo-20canary-20academy.png")}
                  alt="Canary Academy Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <div className="text-[22px] font-bold text-white leading-tight uppercase">Canary Academy</div>
                <div className="text-xs text-[#F5A623] font-medium tracking-wide">{t('slogan')}</div>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              {t('footer.text')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-[#F5A623] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=Canary+Academy,+Haldibari-2,+Jhapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5A623] transition-colors"
                >
                  {t('footer.location')}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+9779801444350" className="hover:text-[#F5A623] transition-colors">
                  +977 9801444350
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@canaryacademy.edu.np" className="hover:text-[#F5A623] transition-colors">
                  info@canaryacademy.edu.np
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/Canaryacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#F5A623] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/canaryacademy56/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#F5A623] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@VoiceOfCanary-t5i"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[#F5A623] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Information Officer */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-4">Information Officer</h4>
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border-4 border-white/10 shadow-xl mb-4 group hover:border-[#F5A623] transition-colors duration-300">
              <Image
                src={getAssetPath("/images/information-officer.jpg")}
                alt="Information Officer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="text-lg font-bold text-[#F5A623] mb-1">Information Officer</div>
              <a href="tel:+9779801444350" className="text-base font-medium text-white hover:text-[#F5A623] transition-colors block">
                +977 9801444350
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
            <p>{t('footer.established')}</p>
          </div>
        </div>
      </div>
    </footer >
  )
}
