// CMS Storage System - Manages content data
// Uses localStorage for now, can be upgraded to backend API later

import { galleryImages } from "./data"

export interface CMSContent {
  hero: {
    badge: string
    badge_np?: string
    title: string
    title_np?: string
    subtitle: string
    subtitle_np?: string
    cta: string
    cta_np?: string
    learnMore: string
    learnMore_np?: string // ensuring consistency though not explicitly asked, good practice
    backgroundVideo: string
    stats: {
      yearsExp: { value: number; label: string; label_np?: string }
      teachers: { value: number; label: string; label_np?: string }
      students: { value: number; label: string; label_np?: string }
      alumni: { value: number; label: string; label_np?: string }
    }
  }
  features: {
    title: string
    title_np?: string
    subtitle: string
    subtitle_np?: string
    items: Array<{
      title: string
      title_np?: string
      description: string
      description_np?: string
      image: string
      icon: string
    }>
  }
  programs: {
    title: string
    title_np?: string
    subtitle: string
    subtitle_np?: string
    items: Array<{
      level: string
      level_np?: string
      description: string
      description_np?: string
      subjects: string[]
      subjects_np?: string[]
    }>
  }
  testimonials: {
    title: string
    title_np?: string
    subtitle: string
    subtitle_np?: string
    items: Array<{
      name: string
      name_np?: string
      role: string
      role_np?: string
      content: string
      content_np?: string
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
    title_np?: string
    category: string
    image: string
  }>
  popup: {
    isActive: boolean
    image: string
  }
  about: {
    hero: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      image: string
    }
    story: {
      badge: string
      badge_np?: string
      title: string
      title_np?: string
      subtitle: string
      subtitle_np?: string
      paragraph1: string
      paragraph1_np?: string
      paragraph2: string
      paragraph2_np?: string
      imageCaption: string
      imageCaption_np?: string
      image: string
      stats: {
        experience: { value: string; label: string; label_np?: string }
        graduates: { value: string; label: string; label_np?: string }
      }
    }
    vision: {
      title: string
      title_np?: string
      description: string
      description_np?: string
    }
    mission: {
      title: string
      title_np?: string
      description: string
      description_np?: string
    }
    values: {
      title: string
      title_np?: string
      subtitle: string
      subtitle_np?: string
      items: Array<{
        title: string
        title_np?: string
        description: string
        description_np?: string
      }>
    }
    journey: {
      title: string
      title_np?: string
      subtitle: string
      subtitle_np?: string
      milestones: Array<{
        year: string
        event: string
        event_np?: string
      }>
    }
    team: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      button: string
      button_np?: string
    }
    committee: {
      smc: {
        title: string
        title_np?: string
        description: string
        description_np?: string
        members: Array<{ name: string; name_np?: string; designation: string; designation_np?: string; image: string; phone?: string; email?: string }>
      }
      soc: {
        title: string
        title_np?: string
        description: string
        description_np?: string
        members: Array<{ name: string; name_np?: string; designation: string; designation_np?: string; image: string; phone?: string; email?: string }>
      }
      tpa: {
        title: string
        title_np?: string
        description: string
        description_np?: string
        members: Array<{ name: string; name_np?: string; designation: string; designation_np?: string; image: string; phone?: string; email?: string }>
      }
    }
    orgStructure: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      image: string
    }
  }
  academics: {
    subjects: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      items: Array<{ name: string; name_np?: string; image: string }>
    }
    regularClasses: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      schedules: Array<{ grade: string; grade_np?: string; time: string; time_np?: string; subjects: string; subjects_np?: string }>
    }
    otherPrograms: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      programs: Array<{ name: string; name_np?: string; description: string; description_np?: string; image: string }>
    }
    calendar: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      file: string
    }
  }
  contact: {
    hero: { title: string; title_np?: string; subtitle: string; subtitle_np?: string; image: string }
    info: {
      address: string
      address_np?: string
      phone: string
      email: string
      mapUrl: string
    }
    details: {
      title: string
      title_np?: string
      cards: Array<{
        icon: string
        title: string
        title_np?: string
        items: string[]
        items_np?: string[]
      }>
    }
    cta: {
      title: string
      title_np?: string
      text: string
      text_np?: string
      buttonText: string
      buttonText_np?: string
    }
  }
  admissions: {
    hero: { title: string; title_np?: string; subtitle: string; subtitle_np?: string; image: string }
    process: {
      title: string
      title_np?: string
      subtitle: string
      subtitle_np?: string
      steps: Array<{ step: number; title: string; title_np?: string; description: string; description_np?: string; icon: string }>
    }
    scholarships: {
      title: string
      title_np?: string
      subtitle: string
      subtitle_np?: string
      badge: string
      badge_np?: string
      mainTitle: string
      mainTitle_np?: string
      description1: string
      description1_np?: string
      description2: string
      description2_np?: string
      applyTitle: string
      applyTitle_np?: string
      steps: Array<{ title: string; title_np?: string; description: string; description_np?: string; icon: string }>
      buttonText: string
      buttonText_np?: string
    }
    documents: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      items: string[]
      items_np?: string[]
    }
    fees: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      structure: Array<{ level: string; level_np?: string; admissionFee: string; admissionFee_np?: string; monthlyFee: string; monthlyFee_np?: string }>
      disclaimer: string
      disclaimer_np?: string
    }
    form: {
      title: string
      title_np?: string
      subtitle: string
      subtitle_np?: string
    }
    cta: {
      title: string
      title_np?: string
      description: string
      description_np?: string
      contactButton: string
      contactButton_np?: string
      callButton: string
      callButton_np?: string
    }
  }
  articles: Array<{
    id: number
    title: string
    title_np?: string
    content: string
    content_np?: string
    author: string
    date: string
    image: string
    videoUrl?: string
    excerpt: string
    excerpt_np?: string
    category?: string
  }>
}

export const defaultContent: CMSContent = {
  hero: {
    badge: "Excellence in Education Since 1999",
    badge_np: "",
    title: "Nurturing Tomorrow's Leaders Today",
    title_np: "",
    subtitle: "Empowering students with quality education, modern facilities, and holistic development for a brighter future.",
    subtitle_np: "",
    cta: "Apply Now",
    cta_np: "",
    learnMore: "Learn More",
    learnMore_np: "",
    backgroundVideo: "/background.mp4",
    stats: {
      yearsExp: { value: 25, label: "Years of Excellence", label_np: "" },
      teachers: { value: 50, label: "Qualified Teachers", label_np: "" },
      students: { value: 1000, label: "Happy Students", label_np: "" },
      alumni: { value: 5000, label: "Alumni Network", label_np: "" },
    },
  },
  features: {
    title: "Why Choose Canary Academy",
    title_np: "",
    subtitle: "Discover what makes us the preferred choice for quality education",
    subtitle_np: "",
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
    title_np: "",
    subtitle: "Comprehensive education programs designed for every stage of learning",
    subtitle_np: "",
    items: [
      {
        level: "Primary (K-5)",
        level_np: "",
        description: "Foundation years focusing on literacy, numeracy, and social skills development.",
        description_np: "",
        subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali", "Arts & Crafts"],
        subjects_np: [],
      },
      {
        level: "Lower Secondary (6-8)",
        level_np: "",
        description: "Building on fundamentals with deeper subject exploration and critical thinking.",
        description_np: "",
        subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali", "Computer Science", "Physical Education"],
        subjects_np: [],
      },
      {
        level: "Secondary (9-10)",
        level_np: "",
        description: "Comprehensive preparation for board examinations and higher education.",
        description_np: "",
        subjects: ["English", "Mathematics", "Science", "Social Studies", "Nepali", "Optional Mathematics", "Computer Science"],
        subjects_np: [],
      },
    ],
  },
  testimonials: {
    title: "What Our Community Says",
    title_np: "",
    subtitle: "Hear from parents, students, and alumni about their experiences",
    subtitle_np: "",
    items: [
      {
        name: "Rajesh Sharma",
        name_np: "",
        role: "Parent",
        role_np: "",
        content: "Canary Academy has transformed my child's learning experience. The teachers are dedicated and the facilities are excellent.",
        content_np: "",
        rating: 5,
      },
      {
        name: "Anita Thapa",
        name_np: "",
        role: "Parent",
        role_np: "",
        content: "The holistic approach to education at Canary Academy ensures my daughter excels both academically and in extracurricular activities.",
        content_np: "",
        rating: 5,
      },
      {
        name: "Bikash Gurung",
        name_np: "",
        role: "Alumni",
        role_np: "",
        content: "My time at Canary Academy laid a strong foundation for my university education. Forever grateful to the institution.",
        content_np: "",
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
  popup: {
    isActive: false,
    image: "/images/popup-ad.jpg"
  },

  about: {
    hero: {
      title: "About Canary Academy",
      title_np: "",
      description: "Established in 1999, Canary Academy has been a beacon of educational excellence in Nepal, nurturing young minds and shaping future leaders.",
      description_np: "",
      image: "/images/about-hero-bg.jpg",
    },
    story: {
      badge: "Est. 1999",
      badge_np: "",
      title: "Our Story",
      title_np: "",
      subtitle: "A journey of educational excellence",
      subtitle_np: "",
      paragraph1: "Canary Academy was founded in 1999 with a vision to provide quality education that nurtures both academic excellence and character development. What started as a small institution with just a handful of students has grown into one of the most respected educational institutions in the region.",
      paragraph1_np: "",
      paragraph2: "Over the years, we have remained committed to our founding principles while continuously evolving our teaching methodologies to meet the demands of the modern world. Our alumni have gone on to excel in various fields, from medicine and engineering to arts and entrepreneurship.",
      paragraph2_np: "",
      imageCaption: "Building Tomorrow's Leaders",
      imageCaption_np: "",
      image: "/images/school-building.jpg",
      stats: {
        experience: { value: "25+", label: "Years of Excellence", label_np: "" },
        graduates: { value: "1000+", label: "Successful Graduates", label_np: "" },
      },
    },
    vision: {
      title: "Our Vision",
      title_np: "",
      description: "To be a leading educational institution that empowers students to become responsible global citizens with strong values, critical thinking abilities, and a passion for lifelong learning.",
      description_np: "",
    },
    mission: {
      title: "Our Mission",
      title_np: "",
      description: "To provide holistic education that develops intellectual, physical, emotional, and social capabilities of each student through innovative teaching methods, modern infrastructure, and a nurturing environment.",
      description_np: "",
    },
    values: {
      title: "Our Core Values",
      title_np: "",
      subtitle: "The principles that guide everything we do",
      subtitle_np: "",
      items: [
        {
          title: "Excellence",
          title_np: "",
          description: "We strive for excellence in all aspects of education and continuously raise our standards.",
          description_np: "",
        },
        {
          title: "Integrity",
          title_np: "",
          description: "We uphold honesty and strong moral principles in all our interactions.",
          description_np: "",
        },
        {
          title: "Community",
          title_np: "",
          description: "We foster a sense of belonging and encourage collaboration among students, teachers, and parents.",
          description_np: "",
        },
        {
          title: "Innovation",
          title_np: "",
          description: "We embrace new ideas and technologies to enhance the learning experience.",
          description_np: "",
        },
      ],
    },
    journey: {
      title: "Our Journey",
      title_np: "",
      subtitle: "Key milestones in our history",
      subtitle_np: "",
      milestones: [
        { year: "1999", event: "Canary Academy was founded with 50 students and 5 teachers", event_np: "" },
        { year: "2005", event: "Expanded to include secondary level education", event_np: "" },
        { year: "2010", event: "Inaugurated new campus with modern facilities", event_np: "" },
        { year: "2015", event: "Achieved 100% pass rate in board examinations", event_np: "" },
        { year: "2020", event: "Launched digital learning platforms", event_np: "" },
        { year: "2024", event: "Celebrating 25 years of educational excellence", event_np: "" },
      ],
    },
    team: {
      title: "Meet Our Team",
      title_np: "",
      description: "Our dedicated team of educators and staff work tirelessly to provide the best learning environment for our students.",
      description_np: "",
      button: "View Committee",
      button_np: "",
    },
    committee: {
      smc: {
        title: "School Management Committee",
        title_np: "",
        description: "Our dedicated committee members working for the school's progress.",
        description_np: "",
        members: [
          { name: "Pending Update", name_np: "", designation: "Chairperson", designation_np: "", image: "", phone: "+977 9800000000", email: "smc.chair@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Member Secretary", designation_np: "", image: "", phone: "+977 9800000000", email: "smc.sec@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Member", designation_np: "", image: "", phone: "+977 9800000000", email: "smc.member@canaryacademy.edu.np" },
        ],
      },
      soc: {
        title: "School Operation Committee",
        title_np: "",
        description: "Committee responsible for school operations and administration.",
        description_np: "",
        members: [
          { name: "Pending Update", name_np: "", designation: "Head of Operations", designation_np: "", image: "", phone: "+977 9800000000", email: "ops.head@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Administrator", designation_np: "", image: "", phone: "+977 9800000000", email: "admin@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Coordinator", designation_np: "", image: "", phone: "+977 9800000000", email: "coordinator@canaryacademy.edu.np" },
        ],
      },
      tpa: {
        title: "Parent Teacher Organization",
        title_np: "",
        description: "Organization fostering collaboration between parents and teachers.",
        description_np: "",
        members: [
          { name: "Pending Update", name_np: "", designation: "President", designation_np: "", image: "", phone: "+977 9800000000", email: "pto.president@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Vice President", designation_np: "", image: "", phone: "+977 9800000000", email: "pto.vp@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Secretary", designation_np: "", image: "", phone: "+977 9800000000", email: "pto.sec@canaryacademy.edu.np" },
          { name: "Pending Update", name_np: "", designation: "Teacher Representative", designation_np: "", image: "", phone: "+977 9800000000", email: "teacher.rep@canaryacademy.edu.np" },
        ],
      },
    },
    orgStructure: {
      title: "Organizational Structure",
      title_np: "",
      description: "How our school is organized.",
      description_np: "",
      image: "/org-structure.jpg",
    },
  },
  academics: {
    subjects: {
      title: "Our Subjects",
      title_np: "",
      description: "Explore the wide range of subjects we offer.",
      description_np: "",
      items: [
        { name: "Mathematics", name_np: "", image: "/subjects/math.jpg" },
        { name: "Science", name_np: "", image: "/subjects/science.jpg" },
      ],
    },
    regularClasses: {
      title: "Regular Classes",
      title_np: "",
      description: "Daily class schedules and routines.",
      description_np: "",
      schedules: [
        { grade: "Grade 10", grade_np: "", time: "9:00 AM - 3:00 PM", time_np: "", subjects: "Math, Science, English, Nepali", subjects_np: "" },
      ],
    },
    otherPrograms: {
      title: "Other Programs",
      title_np: "",
      description: "Extra-curricular and co-curricular activities.",
      description_np: "",
      programs: [
        { name: "Music Class", name_np: "", description: "Learn instruments and vocal music.", description_np: "", image: "" },
      ],
    },
    calendar: {
      title: "Academic Calendar",
      title_np: "",
      description: "View our academic calendar for important dates and events throughout the year.",
      description_np: "",
      file: "",
    },
  },
  contact: {
    hero: { title: "Contact Us", title_np: "", subtitle: "Get in touch with us", subtitle_np: "", image: "" },
    info: {
      address: "Pokhara, Nepal",
      address_np: "",
      phone: "+977-61-123456",
      email: "info@canaryacademy.edu.np",
      mapUrl: "https://www.google.com/maps/embed?...",
    },
    details: {
      title: "Get In Touch",
      title_np: "",
      cards: [
        {
          icon: "MapPin",
          title: "Address",
          title_np: "",
          items: [
            "Canary Academy",
            "Haldibari 2, Jhapa",
            "P.O. Box: XXXX",
          ],
          items_np: [],
        },
        {
          icon: "Phone",
          title: "Phone",
          title_np: "",
          items: [
            "+977-1-XXXXXXX (Office)",
            "+977 98XXXXXXXX (Mobile)",
            "+977-1-XXXXXXX (Fax)",
          ],
          items_np: [],
        },
        {
          icon: "Mail",
          title: "Email",
          title_np: "",
          items: [
            "info@canaryacademy.edu.np",
            "admissions@canaryacademy.edu.np",
            "principal@canaryacademy.edu.np",
          ],
          items_np: [],
        },
        {
          icon: "Clock",
          title: "Office Hours",
          title_np: "",
          items: [
            "Monday - Friday: 8:00 AM - 4:00 PM",
            "Saturday: 8:00 AM - 1:00 PM",
            "Sunday: Closed",
          ],
          items_np: [],
        },
      ],
    },
    cta: {
      title: "Schedule a School Tour",
      title_np: "",
      text: "Experience our facilities and meet our faculty. Contact us to schedule your visit.",
      text_np: "",
      buttonText: "+977-61-123456",
      buttonText_np: "",
    }
  },
  admissions: {
    hero: {
      title: "Admissions",
      title_np: "",
      subtitle: "Join our family and become part of our educational excellence",
      subtitle_np: "",
      image: ""
    },
    process: {
      title: "Admission Process",
      title_np: "",
      subtitle: "Simple steps to join our academy",
      subtitle_np: "",
      steps: [
        { step: 1, title: "Application", title_np: "", description: "Fill out the online application form with required details.", description_np: "", icon: "FileText" },
        { step: 2, title: "Document Submission", title_np: "", description: "Submit all required documents for verification.", description_np: "", icon: "Clock" },
        { step: 3, title: "Interview", title_np: "", description: "Attend an interview with our admission committee.", description_np: "", icon: "Users" },
        { step: 4, title: "Confirmation", title_np: "", description: "Receive admission confirmation and complete enrollment.", description_np: "", icon: "CheckCircle2" },
      ],
    },
    scholarships: {
      title: "Scholarships & Financial Aid",
      title_np: "",
      subtitle: "Making quality education accessible to all deserving students",
      subtitle_np: "",
      badge: "Financial Support Available",
      badge_np: "",
      mainTitle: "Merit-Based Scholarships",
      mainTitle_np: "",
      description1: "We believe that financial constraints should not hinder a student's access to quality education. Our scholarship program is designed to support academically excellent and financially deserving students.",
      description1_np: "",
      description2: "Scholarships cover up to 100% of tuition fees based on merit and need. We also offer flexible payment plans for families requiring financial assistance.",
      description2_np: "",
      applyTitle: "How to Apply for Scholarship",
      applyTitle_np: "",
      steps: [
        { title: "Submit Application", title_np: "", description: "Fill out the scholarship application form along with admission form.", description_np: "", icon: "FileText" },
        { title: "Entrance Test", title_np: "", description: "Appear for our scholarship entrance examination.", description_np: "", icon: "Users" },
        { title: "Get Results", title_np: "", description: "Scholarship results announced within 2 weeks.", description_np: "", icon: "CheckCircle2" },
      ],
      buttonText: "Contact for Scholarship Info",
      buttonText_np: "",
    },
    documents: {
      title: "Required Documents",
      title_np: "",
      description: "Please prepare the following documents for the admission process:",
      description_np: "",
      items: [
        "Birth Certificate (Original and photocopy)",
        "Previous school leaving certificate",
        "Mark sheets of previous grades",
        "Passport-sized photographs (4 copies)",
        "Parent/Guardian ID proof",
        "Medical certificate",
      ],
      items_np: [],
    },
    fees: {
      title: "Fee Structure",
      title_np: "",
      description: "Our transparent fee structure for different grade levels:",
      description_np: "",
      structure: [
        { level: "Primary (K-5)", level_np: "", admissionFee: "NPR 15,000", admissionFee_np: "", monthlyFee: "NPR 8,000", monthlyFee_np: "" },
        { level: "Lower Secondary (6-8)", level_np: "", admissionFee: "NPR 18,000", admissionFee_np: "", monthlyFee: "NPR 10,000", monthlyFee_np: "" },
        { level: "Secondary (9-10)", level_np: "", admissionFee: "NPR 20,000", admissionFee_np: "", monthlyFee: "NPR 12,000", monthlyFee_np: "" },
      ],
      disclaimer: "* Fees are subject to change. Additional charges may apply for extracurricular activities and transportation.",
      disclaimer_np: "",
    },
    form: {
      title: "Apply Online",
      title_np: "",
      subtitle: "Fill out the form below to start your admission process",
      subtitle_np: "",
    },
    cta: {
      title: "Have Questions About Admissions?",
      title_np: "",
      description: "Our admission team is here to help you through every step of the process. Contact us for personalized assistance.",
      description_np: "",
      contactButton: "Contact Us",
      contactButton_np: "",
      callButton: "Call Now",
      callButton_np: "",
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
        popup: { ...defaultContent.popup, ...(parsed.popup || {}) },

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
          info: { ...defaultContent.contact.info, ...(data.contact?.info || {}) },
          details: {
            ...defaultContent.contact.details,
            ...(data.contact?.details || {}),
            cards: data.contact?.details?.cards || defaultContent.contact.details.cards
          },
          cta: { ...defaultContent.contact.cta, ...(data.contact?.cta || {}) }
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
        popup: { ...defaultContent.popup, ...(data.popup || {}) },
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
    // Get auth headers from session
    let headers: HeadersInit = { 'Content-Type': 'application/json' }
    let hasAuth = false
    try {
      const sessionData = sessionStorage.getItem('adminSession')
      if (sessionData) {
        const { token, expiresAt } = JSON.parse(sessionData)
        // Check if session is expired
        if (token && expiresAt && Date.now() < expiresAt) {
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
          hasAuth = true
        } else if (token) {
          // Session expired
          sessionStorage.removeItem('adminSession')
          throw new Error('Session expired. Please log in again.')
        }
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('Session expired')) {
        throw e
      }
      // Session not available, continue without auth
    }

    if (!hasAuth) {
      throw new Error('Not logged in. Please log in as admin first.')
    }

    // Check payload size before sending (Vercel serverless limit is 4.5MB)
    const payload = JSON.stringify(content)
    const payloadSizeMB = new Blob([payload]).size / (1024 * 1024)
    const MAX_PAYLOAD_SIZE_MB = 4.5

    if (payloadSizeMB > MAX_PAYLOAD_SIZE_MB) {
      console.error(`Payload size: ${payloadSizeMB.toFixed(2)}MB exceeds limit of ${MAX_PAYLOAD_SIZE_MB}MB`)
      throw new Error(
        `Content size (${payloadSizeMB.toFixed(1)}MB) exceeds the ${MAX_PAYLOAD_SIZE_MB}MB limit.\n\n` +
        `This is usually caused by large images embedded in the content.\n` +
        `Please use smaller images (< 200KB each) or upload them to an external service.`
      )
    }

    // Save to API (database) with authentication
    const response = await fetch('/api/content', {
      method: 'POST',
      headers,
      body: payload
    })

    if (!response.ok) {
      let errorMessage = `Server error (${response.status}): ${response.statusText}`
      try {
        const errorData = await response.json()
        if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch {
        // Could not parse error response
      }

      if (response.status === 401) {
        sessionStorage.removeItem('adminSession')
        throw new Error('Session expired. Please log in again.')
      }
      if (response.status === 413) {
        throw new Error('Content too large. Try compressing images to < 500KB each.')
      }
      throw new Error(errorMessage)
    }

    // Check response body for success
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.error || 'Unknown error occurred')
    }

    // Dispatch custom event to notify components of the update
    window.dispatchEvent(new Event('cms:update'))
    return true;
  } catch (error) {
    console.error("Error saving CMS content:", error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    alert(`❌ Error Saving Content!\n\n${errorMessage}\n\nPlease check the browser console for more details.`)
    return false;
  }
}

export async function saveCMSSection(section: string, data: any): Promise<boolean> {
  if (typeof window === "undefined") return false

  try {
    // Get auth headers from session (matching saveCMSContent logic)
    let headers: HeadersInit = { 'Content-Type': 'application/json' }
    let hasAuth = false
    try {
      const sessionData = sessionStorage.getItem('adminSession')
      if (sessionData) {
        const { token, expiresAt } = JSON.parse(sessionData)
        // Check if session is expired
        if (token && expiresAt && Date.now() < expiresAt) {
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
          hasAuth = true
        } else if (token) {
          // Session expired
          sessionStorage.removeItem('adminSession')
          throw new Error('Session expired. Please log in again.')
        }
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('Session expired')) {
        throw e
      }
      // Session not available, continue without auth
    }

    if (!hasAuth) {
      throw new Error('Not logged in. Please log in as admin first.')
    }

    const response = await fetch('/api/content', {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ section, data })
    })

    if (!response.ok) {
      let errorMessage = `Server error (${response.status}): ${response.statusText}`
      try {
        const errorData = await response.json()
        if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch {
        // Could not parse error response
      }

      if (response.status === 401) {
        sessionStorage.removeItem('adminSession')
        throw new Error('Session expired. Please log in again.')
      }
      if (response.status === 413) {
        throw new Error('Section too large. Try compressing images.')
      }
      throw new Error(errorMessage)
    }

    const result = await response.json()
    if (!result.success) {
      throw new Error(result.error || 'Unknown error occurred')
    }

    // Notify update
    window.dispatchEvent(new Event('cms:update'))
    return true
  } catch (error) {
    console.error(`Error saving section ${section}:`, error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    alert(`❌ Error Saving Content!\n\n${errorMessage}\n\nPlease check the browser console for more details.`)
    return false
  }
}

export function updateCMSContent(section: keyof CMSContent, data: any): void {
  const content = getCMSContent()
  // Update local state first for immediate UI feedback
  content[section] = { ...content[section], ...data } as any

  // Save specific section mainly
  // We prefer partial update to avoid payload size limits
  saveCMSSection(section, content[section])
}

export function resetCMSContent(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
