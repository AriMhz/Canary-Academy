// CMS Storage System - Manages content data
// Uses localStorage for now, can be upgraded to backend API later

import { galleryImages } from "./data"

export interface CMSContent {
  hero: {
    badge: string
    title: string
    subtitle: string
    cta: string
    learnMore: string
    backgroundVideo: string
    stats: {
      yearsExp: { value: number; label: string }
      teachers: { value: number; label: string }
      students: { value: number; label: string }
      alumni: { value: number; label: string }
    }
  }
  features: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      image: string
      icon: string
    }>
  }
  programs: {
    title: string
    subtitle: string
    items: Array<{
      level: string
      description: string
      subjects: string[]
    }>
  }
  testimonials: {
    title: string
    subtitle: string
    items: Array<{
      name: string
      role: string
      content: string
      rating: number
    }>
  }
  cta: {
    title: string
    text: string
    applyNow: string
    contactUs: string
  }
  news: Array<{
    id: number
    title: string
    date: string
    category: string
    excerpt: string
    content?: string
    image: string
    videoUrl?: string
  }>
  gallery: Array<{
    id: number
    title: string
    category: string
    image: string
  }>
  about: {
    hero: {
      title: string
      description: string
      image: string
    }
    story: {
      badge: string
      title: string
      subtitle: string
      paragraph1: string
      paragraph2: string
      paragraph1_np?: string
      paragraph2_np?: string
      imageCaption: string
      image: string
      stats: {
        experience: { value: string; label: string }
        graduates: { value: string; label: string }
      }
    }
    vision: {
      title: string
      description: string
    }
    mission: {
      title: string
      description: string
    }
    values: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
      }>
    }
    journey: {
      title: string
      subtitle: string
      milestones: Array<{
        year: string
        event: string
      }>
    }
    team: {
      title: string
      description: string
      button: string
    }
    committee: {
      smc: {
        title: string
        description: string
        members: Array<{ name: string; designation: string; image: string; phone?: string; email?: string }>
      }
      soc: {
        title: string
        description: string
        members: Array<{ name: string; designation: string; image: string; phone?: string; email?: string }>
      }
      tpa: {
        title: string
        description: string
        members: Array<{ name: string; designation: string; image: string; phone?: string; email?: string }>
      }
    }
    orgStructure: {
      title: string
      description: string
      image: string
    }
  }
  academics: {
    subjects: {
      title: string
      description: string
      items: Array<{ name: string; image: string }>
    }
    regularClasses: {
      title: string
      description: string
      schedules: Array<{ grade: string; time: string; subjects: string }>
    }
    otherPrograms: {
      title: string
      description: string
      programs: Array<{ name: string; description: string; image: string }>
    }
    calendar: {
      title: string
      description: string
      file: string
    }
  }
  contact: {
    hero: { title: string; subtitle: string; image: string }
    info: {
      address: string
      phone: string
      email: string
      mapUrl: string
    }
    details: {
      title: string
      cards: Array<{
        icon: string
        title: string
        items: string[]
      }>
    }
  }
  admissions: {
    hero: { title: string; subtitle: string; image: string }
    process: {
      title: string
      subtitle: string
      steps: Array<{ step: number; title: string; description: string; icon: string }>
    }
    scholarships: {
      title: string
      subtitle: string
      badge: string
      mainTitle: string
      description1: string
      description2: string
      applyTitle: string
      steps: Array<{ title: string; description: string; icon: string }>
      buttonText: string
    }
    documents: {
      title: string
      description: string
      items: string[]
    }
    fees: {
      title: string
      description: string
      structure: Array<{ level: string; admissionFee: string; monthlyFee: string }>
      disclaimer: string
    }
    form: {
      title: string
      subtitle: string
    }
    cta: {
      title: string
      description: string
      contactButton: string
      callButton: string
    }
  }
  articles: Array<{
    id: number
    title: string
    content: string
    author: string
    date: string
    image: string
    videoUrl?: string
    excerpt: string
    category?: string
  }>
}

export const defaultContent: CMSContent = {
  hero: {
    badge: "Excellence in Education Since 1999",
    title: "Nurturing Tomorrow's Leaders Today",
    subtitle: "Empowering students with quality education, modern facilities, and holistic development for a brighter future.",
    cta: "Apply Now",
    learnMore: "Learn More",
    backgroundVideo: "/background.mp4",
    stats: {
      yearsExp: { value: 25, label: "Years of Excellence" },
      teachers: { value: 50, label: "Qualified Teachers" },
      students: { value: 1000, label: "Happy Students" },
      alumni: { value: 5000, label: "Alumni Network" },
    },
  },
  features: {
    title: "Why Choose Canary Academy",
    subtitle: "Discover what makes us the preferred choice for quality education",
    items: [
      {
        title: "Qualified Faculty",
        description: "Our experienced teachers are dedicated to nurturing each student's potential with personalized attention.",
        image: "/features/qualified faculity.jpg",
        icon: "👨‍🏫",
      },
      {
        title: "Modern Curriculum",
        description: "We blend traditional values with contemporary teaching methods to prepare students for the future.",
        image: "/features/modern curruculumn.jpg",
        icon: "📚",
      },
      {
        title: "State-of-the-art Facilities",
        description: "From science labs to sports facilities, we provide the best infrastructure for holistic development.",
        image: "/features/trophies.jpg",
        icon: "🏫",
      },
      {
        title: "Extracurricular Activities",
        description: "Sports, arts, music, and clubs help students discover their passions beyond academics.",
        image: "/features/extra activities.jpg",
        icon: "🎨",
      },
    ],
  },
  programs: {
    title: "Our Academic Programs",
    subtitle: "Comprehensive education programs designed for every stage of learning",
    items: [
      {
        level: "Primary (K-5)",
        description: "Foundation years focusing on literacy, numeracy, and social skills development.",
        subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali", "Arts & Crafts"],
      },
      {
        level: "Lower Secondary (6-8)",
        description: "Building on fundamentals with deeper subject exploration and critical thinking.",
        subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali", "Computer Science", "Physical Education"],
      },
      {
        level: "Secondary (9-10)",
        description: "Comprehensive preparation for board examinations and higher education.",
        subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali", "Optional Mathematics", "Computer Science"],
      },
    ],
  },
  testimonials: {
    title: "What Our Community Says",
    subtitle: "Hear from parents, students, and alumni about their experiences",
    items: [
      {
        name: "Rajesh Sharma",
        role: "Parent",
        content: "Canary Academy has transformed my child's learning experience. The teachers are dedicated and the facilities are excellent.",
        rating: 5,
      },
      {
        name: "Anita Thapa",
        role: "Parent",
        content: "The holistic approach to education at Canary Academy ensures my daughter excels both academically and in extracurricular activities.",
        rating: 5,
      },
      {
        name: "Bikash Gurung",
        role: "Alumni",
        content: "My time at Canary Academy laid a strong foundation for my university education. Forever grateful to the institution.",
        rating: 5,
      },
    ],
  },
  cta: {
    title: "Ready to Begin Your Journey?",
    text: "Join Canary Academy and become part of a community dedicated to excellence in education. Apply now or contact us to learn more.",
    applyNow: "Apply Now",
    contactUs: "Contact Us",
  },
  news: [],
  gallery: galleryImages.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image,
  })),

  about: {
    hero: {
      title: "About Canary Academy",
      description: "Established in 1999, Canary Academy has been a beacon of educational excellence in Nepal, nurturing young minds and shaping future leaders.",
      image: "/images/about-hero-bg.jpg",
    },
    story: {
      badge: "Est. 1999",
      title: "Our Story",
      subtitle: "A journey of educational excellence",
      paragraph1: "Canary Academy was founded in 1999 with a vision to provide quality education that nurtures both academic excellence and character development. What started as a small institution with just a handful of students has grown into one of the most respected educational institutions in the region.",
      paragraph2: "Over the years, we have remained committed to our founding principles while continuously evolving our teaching methodologies to meet the demands of the modern world. Our alumni have gone on to excel in various fields, from medicine and engineering to arts and entrepreneurship.",
      imageCaption: "Building Tomorrow's Leaders",
      image: "/images/school-building.jpg",
      stats: {
        experience: { value: "25+", label: "Years of Excellence" },
        graduates: { value: "1000+", label: "Successful Graduates" },
      },
    },
    vision: {
      title: "Our Vision",
      description: "To be a leading educational institution that empowers students to become responsible global citizens with strong values, critical thinking abilities, and a passion for lifelong learning.",
    },
    mission: {
      title: "Our Mission",
      description: "To provide holistic education that develops intellectual, physical, emotional, and social capabilities of each student through innovative teaching methods, modern infrastructure, and a nurturing environment.",
    },
    values: {
      title: "Our Core Values",
      subtitle: "The principles that guide everything we do",
      items: [
        {
          title: "Excellence",
          description: "We strive for excellence in all aspects of education and continuously raise our standards.",
        },
        {
          title: "Integrity",
          description: "We uphold honesty and strong moral principles in all our interactions.",
        },
        {
          title: "Community",
          description: "We foster a sense of belonging and encourage collaboration among students, teachers, and parents.",
        },
        {
          title: "Innovation",
          description: "We embrace new ideas and technologies to enhance the learning experience.",
        },
      ],
    },
    journey: {
      title: "Our Journey",
      subtitle: "Key milestones in our history",
      milestones: [
        { year: "1999", event: "Canary Academy was founded with 50 students and 5 teachers" },
        { year: "2005", event: "Expanded to include secondary level education" },
        { year: "2010", event: "Inaugurated new campus with modern facilities" },
        { year: "2015", event: "Achieved 100% pass rate in board examinations" },
        { year: "2020", event: "Launched digital learning platforms" },
        { year: "2024", event: "Celebrating 25 years of educational excellence" },
      ],
    },
    team: {
      title: "Meet Our Team",
      description: "Our dedicated team of educators and staff work tirelessly to provide the best learning environment for our students.",
      button: "View Committee",
    },
    committee: {
      smc: {
        title: "School Management Committee",
        description: "Our dedicated committee members working for the school's progress.",
        members: [
          { name: "Pending Update", designation: "Chairperson", image: "", phone: "+977 9800000000", email: "smc.chair@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Member Secretary", image: "", phone: "+977 9800000000", email: "smc.sec@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Member", image: "", phone: "+977 9800000000", email: "smc.member@canaryacademy.edu.np" },
        ],
      },
      soc: {
        title: "School Operation Committee",
        description: "Committee responsible for school operations and administration.",
        members: [
          { name: "Pending Update", designation: "Head of Operations", image: "", phone: "+977 9800000000", email: "ops.head@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Administrator", image: "", phone: "+977 9800000000", email: "admin@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Coordinator", image: "", phone: "+977 9800000000", email: "coordinator@canaryacademy.edu.np" },
        ],
      },
      tpa: {
        title: "Parent Teacher Organization",
        description: "Organization fostering collaboration between parents and teachers.",
        members: [
          { name: "Pending Update", designation: "President", image: "", phone: "+977 9800000000", email: "pto.president@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Vice President", image: "", phone: "+977 9800000000", email: "pto.vp@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Secretary", image: "", phone: "+977 9800000000", email: "pto.sec@canaryacademy.edu.np" },
          { name: "Pending Update", designation: "Teacher Representative", image: "", phone: "+977 9800000000", email: "teacher.rep@canaryacademy.edu.np" },
        ],
      },
    },
    orgStructure: {
      title: "Organizational Structure",
      description: "How our school is organized.",
      image: "/org-structure.jpg",
    },
  },
  academics: {
    subjects: {
      title: "Our Subjects",
      description: "Explore the wide range of subjects we offer.",
      items: [
        { name: "Mathematics", image: "/subjects/math.jpg" },
        { name: "Science", image: "/subjects/science.jpg" },
      ],
    },
    regularClasses: {
      title: "Regular Classes",
      description: "Daily class schedules and routines.",
      schedules: [
        { grade: "Grade 10", time: "9:00 AM - 3:00 PM", subjects: "Math, Science, English, Nepali" },
      ],
    },
    otherPrograms: {
      title: "Other Programs",
      description: "Extra-curricular and co-curricular activities.",
      programs: [
        { name: "Music Class", description: "Learn instruments and vocal music.", image: "" },
      ],
    },
    calendar: {
      title: "Academic Calendar",
      description: "View our academic calendar for important dates and events throughout the year.",
      file: "",
    },
  },
  contact: {
    hero: { title: "Contact Us", subtitle: "Get in touch with us", image: "" },
    info: {
      address: "Pokhara, Nepal",
      phone: "+977-61-123456",
      email: "info@canaryacademy.edu.np",
      mapUrl: "https://www.google.com/maps/embed?...",
    },
    details: {
      title: "Get In Touch",
      cards: [
        {
          icon: "MapPin",
          title: "Address",
          items: [
            "Canary Academy",
            "Haldibari 2, Jhapa",
            "P.O. Box: XXXX",
          ],
        },
        {
          icon: "Phone",
          title: "Phone",
          items: [
            "+977-1-XXXXXXX (Office)",
            "+977 98XXXXXXXX (Mobile)",
            "+977-1-XXXXXXX (Fax)",
          ],
        },
        {
          icon: "Mail",
          title: "Email",
          items: [
            "info@canaryacademy.edu.np",
            "admissions@canaryacademy.edu.np",
            "principal@canaryacademy.edu.np",
          ],
        },
        {
          icon: "Clock",
          title: "Office Hours",
          items: [
            "Monday - Friday: 8:00 AM - 4:00 PM",
            "Saturday: 8:00 AM - 1:00 PM",
            "Sunday: Closed",
          ],
        },
      ],
    },
  },
  admissions: {
    hero: {
      title: "Admissions",
      subtitle: "Join our family and become part of our educational excellence",
      image: ""
    },
    process: {
      title: "Admission Process",
      subtitle: "Simple steps to join our academy",
      steps: [
        { step: 1, title: "Application", description: "Fill out the online application form with required details.", icon: "FileText" },
        { step: 2, title: "Document Submission", description: "Submit all required documents for verification.", icon: "Clock" },
        { step: 3, title: "Interview", description: "Attend an interview with our admission committee.", icon: "Users" },
        { step: 4, title: "Confirmation", description: "Receive admission confirmation and complete enrollment.", icon: "CheckCircle2" },
      ],
    },
    scholarships: {
      title: "Scholarships & Financial Aid",
      subtitle: "Making quality education accessible to all deserving students",
      badge: "Financial Support Available",
      mainTitle: "Merit-Based Scholarships",
      description1: "We believe that financial constraints should not hinder a student's access to quality education. Our scholarship program is designed to support academically excellent and financially deserving students.",
      description2: "Scholarships cover up to 100% of tuition fees based on merit and need. We also offer flexible payment plans for families requiring financial assistance.",
      applyTitle: "How to Apply for Scholarship",
      steps: [
        { title: "Submit Application", description: "Fill out the scholarship application form along with admission form.", icon: "FileText" },
        { title: "Entrance Test", description: "Appear for our scholarship entrance examination.", icon: "Users" },
        { title: "Get Results", description: "Scholarship results announced within 2 weeks.", icon: "CheckCircle2" },
      ],
      buttonText: "Contact for Scholarship Info",
    },
    documents: {
      title: "Required Documents",
      description: "Please prepare the following documents for the admission process:",
      items: [
        "Birth Certificate (Original and photocopy)",
        "Previous school leaving certificate",
        "Mark sheets of previous grades",
        "Passport-sized photographs (4 copies)",
        "Parent/Guardian ID proof",
        "Medical certificate",
      ],
    },
    fees: {
      title: "Fee Structure",
      description: "Our transparent fee structure for different grade levels:",
      structure: [
        { level: "Primary (K-5)", admissionFee: "NPR 15,000", monthlyFee: "NPR 8,000" },
        { level: "Lower Secondary (6-8)", admissionFee: "NPR 18,000", monthlyFee: "NPR 10,000" },
        { level: "Secondary (9-10)", admissionFee: "NPR 20,000", monthlyFee: "NPR 12,000" },
      ],
      disclaimer: "* Fees are subject to change. Additional charges may apply for extracurricular activities and transportation.",
    },
    form: {
      title: "Apply Online",
      subtitle: "Fill out the form below to start your admission process",
    },
    cta: {
      title: "Have Questions About Admissions?",
      description: "Our admission team is here to help you through every step of the process. Contact us for personalized assistance.",
      contactButton: "Contact Us",
      callButton: "Call Now",
    },
  },
  articles: [],
}

const STORAGE_KEY = "cms_content"

export function getCMSContent(): CMSContent {
  if (typeof window === "undefined") return defaultContent

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Deep merge: prioritize stored content, but fill in missing fields from defaults
      return {
        ...defaultContent,
        ...parsed,
        hero: {
          ...defaultContent.hero,
          ...parsed.hero,
          stats: { ...defaultContent.hero.stats, ...(parsed.hero?.stats || {}) }
        },
        features: {
          ...defaultContent.features,
          ...parsed.features,
          items: parsed.features?.items || defaultContent.features.items
        },
        programs: {
          ...defaultContent.programs,
          ...parsed.programs,
          items: parsed.programs?.items || defaultContent.programs.items
        },
        testimonials: {
          ...defaultContent.testimonials,
          ...parsed.testimonials,
          items: parsed.testimonials?.items || defaultContent.testimonials.items
        },
        cta: { ...defaultContent.cta, ...parsed.cta },
        news: parsed.news !== undefined ? parsed.news : defaultContent.news,
        gallery: parsed.gallery !== undefined ? parsed.gallery : defaultContent.gallery,

        about: {
          ...defaultContent.about,
          ...parsed.about,
          hero: { ...defaultContent.about.hero, ...(parsed.about?.hero || {}) },
          story: { ...defaultContent.about.story, ...(parsed.about?.story || {}) },
          vision: { ...defaultContent.about.vision, ...(parsed.about?.vision || {}) },
          mission: { ...defaultContent.about.mission, ...(parsed.about?.mission || {}) },
          values: {
            ...defaultContent.about.values,
            ...(parsed.about?.values || {}),
            items: parsed.about?.values?.items || defaultContent.about.values.items
          },
          journey: {
            ...defaultContent.about.journey,
            ...(parsed.about?.journey || {}),
            milestones: parsed.about?.journey?.milestones || defaultContent.about.journey.milestones
          },
          team: { ...defaultContent.about.team, ...(parsed.about?.team || {}) },
          committee: {
            ...defaultContent.about.committee,
            ...(parsed.about?.committee || {}),
            smc: {
              ...defaultContent.about.committee.smc,
              ...(parsed.about?.committee?.smc || {}),
              members: parsed.about?.committee?.smc?.members || defaultContent.about.committee.smc.members
            },
            soc: {
              ...defaultContent.about.committee.soc,
              ...(parsed.about?.committee?.soc || {}),
              members: parsed.about?.committee?.soc?.members || defaultContent.about.committee.soc.members
            },
            tpa: {
              ...defaultContent.about.committee.tpa,
              ...(parsed.about?.committee?.tpa || {}),
              members: parsed.about?.committee?.tpa?.members || defaultContent.about.committee.tpa.members
            },
          },
          orgStructure: { ...defaultContent.about.orgStructure, ...(parsed.about?.orgStructure || {}) },
        },
        academics: {
          ...defaultContent.academics,
          ...parsed.academics,
          subjects: {
            ...defaultContent.academics.subjects,
            ...(parsed.academics?.subjects || {}),
            items: parsed.academics?.subjects?.items || defaultContent.academics.subjects.items
          },
          regularClasses: {
            ...defaultContent.academics.regularClasses,
            ...(parsed.academics?.regularClasses || {}),
            schedules: parsed.academics?.regularClasses?.schedules || defaultContent.academics.regularClasses.schedules
          },
          otherPrograms: {
            ...defaultContent.academics.otherPrograms,
            ...(parsed.academics?.otherPrograms || {}),
            programs: parsed.academics?.otherPrograms?.programs || defaultContent.academics.otherPrograms.programs
          },
          calendar: {
            ...defaultContent.academics.calendar,
            ...(parsed.academics?.calendar || {}),
          },
        },
        contact: {
          ...defaultContent.contact,
          ...parsed.contact,
          hero: { ...defaultContent.contact.hero, ...(parsed.contact?.hero || {}) },
          info: { ...defaultContent.contact.info, ...(parsed.contact?.info || {}) }
        },
        admissions: {
          ...defaultContent.admissions,
          ...parsed.admissions,
          hero: { ...defaultContent.admissions.hero, ...(parsed.admissions?.hero || {}) },
          process: {
            ...defaultContent.admissions.process,
            ...(parsed.admissions?.process || {}),
            steps: parsed.admissions?.process?.steps || defaultContent.admissions.process.steps
          },
          scholarships: {
            ...defaultContent.admissions.scholarships,
            ...(parsed.admissions?.scholarships || {}),
            steps: parsed.admissions?.scholarships?.steps || defaultContent.admissions.scholarships.steps
          },
        },
        articles: parsed.articles !== undefined ? parsed.articles : defaultContent.articles,
      }
    }
  } catch (error) {
    console.error("Error loading CMS content:", error)
  }

  return defaultContent
}

export async function fetchCMSContent(): Promise<CMSContent> {
  if (typeof window === "undefined") return defaultContent

  try {
    const response = await fetch('/api/content', { cache: 'no-store' })
    if (response.ok) {
      const data = await response.json()
      return {
        ...defaultContent,
        ...data,
        hero: {
          ...defaultContent.hero,
          ...(data.hero || {}),
          stats: { ...defaultContent.hero.stats, ...(data.hero?.stats || {}) }
        },
        about: {
          ...defaultContent.about,
          ...(data.about || {}),
          committee: {
            ...defaultContent.about.committee,
            ...(data.about?.committee || {}),
            smc: { ...defaultContent.about.committee.smc, ...(data.about?.committee?.smc || {}) },
            soc: { ...defaultContent.about.committee.soc, ...(data.about?.committee?.soc || {}) },
            tpa: { ...defaultContent.about.committee.tpa, ...(data.about?.committee?.tpa || {}) },
          },
          orgStructure: {
            ...defaultContent.about.orgStructure,
            ...(data.about?.orgStructure || {})
          }
        },
        features: { ...defaultContent.features, ...(data.features || {}) },
        programs: { ...defaultContent.programs, ...(data.programs || {}) },
        testimonials: { ...defaultContent.testimonials, ...(data.testimonials || {}) },
        contact: {
          ...defaultContent.contact,
          ...data.contact,
          hero: { ...defaultContent.contact.hero, ...(data.contact?.hero || {}) },
          info: { ...defaultContent.contact.info, ...(data.contact?.info || {}) }
        },
        admissions: {
          ...defaultContent.admissions,
          ...data.admissions,
          hero: { ...defaultContent.admissions.hero, ...(data.admissions?.hero || {}) },
          process: {
            ...defaultContent.admissions.process,
            ...(data.admissions?.process || {}),
            steps: data.admissions?.process?.steps || defaultContent.admissions.process.steps
          },
          scholarships: {
            ...defaultContent.admissions.scholarships,
            ...(data.admissions?.scholarships || {}),
            steps: data.admissions?.scholarships?.steps || defaultContent.admissions.scholarships.steps
          },
          fees: {
            ...defaultContent.admissions.fees,
            ...(data.admissions?.fees || {}),
            structure: data.admissions?.fees?.structure || defaultContent.admissions.fees.structure
          },
          documents: {
            ...defaultContent.admissions.documents,
            ...(data.admissions?.documents || {}),
            items: data.admissions?.documents?.items || defaultContent.admissions.documents.items
          }
        },
        articles: data.articles !== undefined ? data.articles : defaultContent.articles,
        news: data.news !== undefined ? data.news : defaultContent.news,
        gallery: data.gallery !== undefined ? data.gallery : defaultContent.gallery,
      }
    }
  } catch (error) {
    console.error("Error fetching CMS content:", error)
  }
  return defaultContent
}

export async function saveCMSContent(content: CMSContent): Promise<boolean> {
  if (typeof window === "undefined") return false

  try {
    // Save to API (database)
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })

    if (!response.ok) {
      throw new Error(`Failed to save: ${response.statusText}`)
    }

    // Dispatch custom event to notify components of the update
    window.dispatchEvent(new Event('cms:update'))
    return true;
  } catch (error) {
    console.error("Error saving CMS content:", error)
    alert("❌ Error Saving Content!\n\nPossible reasons:\n1. Image is too large (try compressing it to < 1MB)\n2. Internet connection issue\n\nPlease check the console for more details.")
    return false;
  }
}

export function updateCMSContent(section: keyof CMSContent, data: any): void {
  const content = getCMSContent()
  content[section] = { ...content[section], ...data } as any
  saveCMSContent(content)
}

export function resetCMSContent(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
