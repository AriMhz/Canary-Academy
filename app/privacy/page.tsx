import { Container } from "@/components/container"

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#2C4F5E] to-[#3A5F70] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Privacy Policy</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-[#2C4F5E] mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Canary Academy collects personal information that you provide to us, including names, email addresses,
              phone numbers, and other contact details when you submit admission applications or contact us through our
              website.
            </p>

            <h2 className="text-3xl font-bold text-[#2C4F5E] mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2 mb-6">
              <li>Process admission applications</li>
              <li>Communicate with parents and guardians</li>
              <li>Send important updates about the school</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-3xl font-bold text-[#2C4F5E] mb-4 mt-8">Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, or disclosure. Your data is stored securely and accessed only by authorized personnel.
            </p>

            <h2 className="text-3xl font-bold text-[#2C4F5E] mb-4 mt-8">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:info@canaryacademy.edu.np" className="text-[#F5A623] hover:underline">
                info@canaryacademy.edu.np
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
