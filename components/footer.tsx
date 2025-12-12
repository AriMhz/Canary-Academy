import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { getAssetPath } from "@/lib/get-base-path"

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Scholarships", href: "/admissions#scholarships" },
    { name: "Gallery", href: "/gallery" },
  ],
  resources: [
    { name: "News & Events", href: "/news" },
    { name: "Contact", href: "/contact" },
    { name: "Career Opportunities", href: "/careers" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#2C4F5E] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src={getAssetPath("/images/school-20logo-20canary-20academy.png")}
                  alt="Canary Academy Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-bold">Canary Academy</div>
                <div className="text-xs text-[#F5A623]">Estd. 1999</div>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Excellence in education for over two decades. Nurturing young minds with world-class teaching and values.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
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
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone size={18} className="flex-shrink-0" />
                <span>+977-1-XXXXXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail size={18} className="flex-shrink-0" />
                <span>info@canaryacademy.edu.np</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-4">
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
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} Canary Academy. All rights reserved.</p>
            <p>Established 2056 BS (1999 AD)</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
