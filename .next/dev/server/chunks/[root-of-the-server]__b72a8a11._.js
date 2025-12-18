module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/get-base-path.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Returns the base path for the application
 * In production (GitHub Pages), this will be '/Canary-Academy-demo'
 * In development, this will be ''
 */ __turbopack_context__.s([
    "getAssetPath",
    ()=>getAssetPath,
    "getBasePath",
    ()=>getBasePath
]);
function getBasePath() {
    return process.env.NEXT_PUBLIC_BASE_PATH || '';
}
function getAssetPath(path) {
    const basePath = getBasePath();
    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${cleanPath}`;
}
}),
"[project]/lib/data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Placeholder data for the website
// This can be replaced with database queries later
__turbopack_context__.s([
    "facultyData",
    ()=>facultyData,
    "features",
    ()=>features,
    "galleryImages",
    ()=>galleryImages,
    "newsData",
    ()=>newsData,
    "programs",
    ()=>programs,
    "stats",
    ()=>stats,
    "testimonials",
    ()=>testimonials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/get-base-path.ts [app-route] (ecmascript)");
;
const testimonials = [
    {
        id: 1,
        name: "Rajesh Sharma",
        role: "Parent",
        content: "Canary Academy has transformed my child's learning experience. The teachers are dedicated and the facilities are excellent.",
        rating: 5
    },
    {
        id: 2,
        name: "Anita Thapa",
        role: "Parent",
        content: "The holistic approach to education at Canary Academy ensures my daughter excels both academically and in extracurricular activities.",
        rating: 5
    },
    {
        id: 3,
        name: "Bikash Gurung",
        role: "Alumni",
        content: "My time at Canary Academy laid a strong foundation for my university education. Forever grateful to the institution.",
        rating: 5
    }
];
const stats = [
    {
        label: "Years of Excellence",
        value: "25+"
    },
    {
        label: "Qualified Teachers",
        value: "50+"
    },
    {
        label: "Happy Students",
        value: "1000+"
    },
    {
        label: "Alumni Network",
        value: "5000+"
    }
];
const features = [
    {
        title: "Qualified Faculty",
        description: "Our experienced teachers are dedicated to nurturing each student's potential with personalized attention.",
        icon: "👨‍🏫",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/professional-educator-woman.jpg")
    },
    {
        title: "Modern Curriculum",
        description: "We blend traditional values with contemporary teaching methods to prepare students for the future.",
        icon: "📚",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/modern-classroom-students.jpg")
    },
    {
        title: "State-of-the-art Facilities",
        description: "From science labs to sports facilities, we provide the best infrastructure for holistic development.",
        icon: "🏫",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-science-laboratory.png")
    },
    {
        title: "Extracurricular Activities",
        description: "Sports, arts, music, and clubs help students discover their passions beyond academics.",
        icon: "🎨",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-sports-event.png")
    }
];
const newsData = [
    {
        id: 1,
        title: "Annual Sports Day 2024",
        date: "2024-03-15",
        category: "Events",
        excerpt: "Join us for our annual sports day celebration featuring athletic competitions and team spirit.",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-sports-day.png")
    },
    {
        id: 2,
        title: "Science Exhibition Success",
        date: "2024-03-10",
        category: "Achievements",
        excerpt: "Our students showcased innovative projects at the inter-school science exhibition.",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/science-exhibition-students.jpg")
    },
    {
        id: 3,
        title: "New Computer Lab Inauguration",
        date: "2024-03-05",
        category: "News",
        excerpt: "State-of-the-art computer lab with latest technology now available for all students.",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/modern-computer-lab-school.jpg")
    }
];
const facultyData = [
    {
        id: 1,
        name: "Dr. Ramesh Adhikari",
        position: "Principal",
        qualification: "Ph.D. in Education",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/professional-educator-man.jpg")
    },
    {
        id: 2,
        name: "Mrs. Sita Rai",
        position: "Vice Principal",
        qualification: "M.Ed., 20 years experience",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/professional-educator-woman.jpg")
    },
    {
        id: 3,
        name: "Mr. Kamal Thapa",
        position: "Head of Science Department",
        qualification: "M.Sc. in Physics",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/science-teacher-man.jpg")
    }
];
const galleryImages = [
    {
        id: 1,
        title: "School Campus",
        category: "Campus",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/modern-school-exterior.png")
    },
    {
        id: 2,
        title: "Science Laboratory",
        category: "Facilities",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-science-laboratory.png")
    },
    {
        id: 3,
        title: "Library",
        category: "Facilities",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-library-students.jpg")
    },
    {
        id: 4,
        title: "Sports Day",
        category: "Events",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-sports-event.png")
    },
    {
        id: 5,
        title: "Annual Function",
        category: "Events",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/school-annual-function-stage.jpg")
    },
    {
        id: 6,
        title: "Classroom",
        category: "Facilities",
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$base$2d$path$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAssetPath"])("/modern-classroom-students.jpg")
    }
];
const programs = [
    {
        level: "Primary (K-5)",
        description: "Foundation years focusing on literacy, numeracy, and social skills development.",
        subjects: [
            "English",
            "Mathematics",
            "Science",
            "Social Studies",
            "Nepali",
            "Arts & Crafts"
        ]
    },
    {
        level: "Lower Secondary (6-8)",
        description: "Building on fundamentals with deeper subject exploration and critical thinking.",
        subjects: [
            "English",
            "Mathematics",
            "Science",
            "Social Studies",
            "Nepali",
            "Computer Science",
            "Physical Education"
        ]
    },
    {
        level: "Secondary (9-10)",
        description: "Comprehensive preparation for board examinations and higher education.",
        subjects: [
            "English",
            "Mathematics",
            "Science",
            "Social Studies",
            "Nepali",
            "Optional Mathematics",
            "Computer Science"
        ]
    }
];
}),
"[project]/lib/cms-storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// CMS Storage System - Manages content data
// Uses localStorage for now, can be upgraded to backend API later
__turbopack_context__.s([
    "defaultContent",
    ()=>defaultContent,
    "fetchCMSContent",
    ()=>fetchCMSContent,
    "getCMSContent",
    ()=>getCMSContent,
    "resetCMSContent",
    ()=>resetCMSContent,
    "saveCMSContent",
    ()=>saveCMSContent,
    "updateCMSContent",
    ()=>updateCMSContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-route] (ecmascript)");
;
const defaultContent = {
    hero: {
        badge: "Excellence in Education Since 1999",
        title: "Nurturing Tomorrow's Leaders Today",
        subtitle: "Empowering students with quality education, modern facilities, and holistic development for a brighter future.",
        cta: "Apply Now",
        learnMore: "Learn More",
        backgroundVideo: "/background.mp4",
        stats: {
            yearsExp: {
                value: 25,
                label: "Years of Excellence"
            },
            teachers: {
                value: 50,
                label: "Qualified Teachers"
            },
            students: {
                value: 1000,
                label: "Happy Students"
            },
            alumni: {
                value: 5000,
                label: "Alumni Network"
            }
        }
    },
    features: {
        title: "Why Choose Canary Academy",
        subtitle: "Discover what makes us the preferred choice for quality education",
        items: [
            {
                title: "Qualified Faculty",
                description: "Our experienced teachers are dedicated to nurturing each student's potential with personalized attention.",
                image: "/features/qualified faculity.jpg",
                icon: "👨‍🏫"
            },
            {
                title: "Modern Curriculum",
                description: "We blend traditional values with contemporary teaching methods to prepare students for the future.",
                image: "/features/modern curruculumn.jpg",
                icon: "📚"
            },
            {
                title: "State-of-the-art Facilities",
                description: "From science labs to sports facilities, we provide the best infrastructure for holistic development.",
                image: "/features/trophies.jpg",
                icon: "🏫"
            },
            {
                title: "Extracurricular Activities",
                description: "Sports, arts, music, and clubs help students discover their passions beyond academics.",
                image: "/features/extra activities.jpg",
                icon: "🎨"
            }
        ]
    },
    programs: {
        title: "Our Academic Programs",
        subtitle: "Comprehensive education programs designed for every stage of learning",
        items: [
            {
                level: "Primary (K-5)",
                description: "Foundation years focusing on literacy, numeracy, and social skills development.",
                subjects: [
                    "English",
                    "Mathematics",
                    "Science",
                    "Social Studies",
                    "Nepali",
                    "Arts & Crafts"
                ]
            },
            {
                level: "Lower Secondary (6-8)",
                description: "Building on fundamentals with deeper subject exploration and critical thinking.",
                subjects: [
                    "English",
                    "Mathematics",
                    "Science",
                    "Social Studies",
                    "Nepali",
                    "Computer Science",
                    "Physical Education"
                ]
            },
            {
                level: "Secondary (9-10)",
                description: "Comprehensive preparation for board examinations and higher education.",
                subjects: [
                    "English",
                    "Mathematics",
                    "Science",
                    "Social Studies",
                    "Nepali",
                    "Optional Mathematics",
                    "Computer Science"
                ]
            }
        ]
    },
    testimonials: {
        title: "What Our Community Says",
        subtitle: "Hear from parents, students, and alumni about their experiences",
        items: [
            {
                name: "Rajesh Sharma",
                role: "Parent",
                content: "Canary Academy has transformed my child's learning experience. The teachers are dedicated and the facilities are excellent.",
                rating: 5
            },
            {
                name: "Anita Thapa",
                role: "Parent",
                content: "The holistic approach to education at Canary Academy ensures my daughter excels both academically and in extracurricular activities.",
                rating: 5
            },
            {
                name: "Bikash Gurung",
                role: "Alumni",
                content: "My time at Canary Academy laid a strong foundation for my university education. Forever grateful to the institution.",
                rating: 5
            }
        ]
    },
    cta: {
        title: "Ready to Begin Your Journey?",
        text: "Join Canary Academy and become part of a community dedicated to excellence in education. Apply now or contact us to learn more.",
        applyNow: "Apply Now",
        contactUs: "Contact Us"
    },
    news: [],
    gallery: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["galleryImages"].map((item)=>({
            id: item.id,
            title: item.title,
            category: item.category,
            image: item.image
        })),
    about: {
        hero: {
            title: "About Canary Academy",
            description: "Established in 1999, Canary Academy has been a beacon of educational excellence in Nepal, nurturing young minds and shaping future leaders.",
            image: "/images/about-hero-bg.jpg"
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
                experience: {
                    value: "25+",
                    label: "Years of Excellence"
                },
                graduates: {
                    value: "1000+",
                    label: "Successful Graduates"
                }
            }
        },
        vision: {
            title: "Our Vision",
            description: "To be a leading educational institution that empowers students to become responsible global citizens with strong values, critical thinking abilities, and a passion for lifelong learning."
        },
        mission: {
            title: "Our Mission",
            description: "To provide holistic education that develops intellectual, physical, emotional, and social capabilities of each student through innovative teaching methods, modern infrastructure, and a nurturing environment."
        },
        values: {
            title: "Our Core Values",
            subtitle: "The principles that guide everything we do",
            items: [
                {
                    title: "Excellence",
                    description: "We strive for excellence in all aspects of education and continuously raise our standards."
                },
                {
                    title: "Integrity",
                    description: "We uphold honesty and strong moral principles in all our interactions."
                },
                {
                    title: "Community",
                    description: "We foster a sense of belonging and encourage collaboration among students, teachers, and parents."
                },
                {
                    title: "Innovation",
                    description: "We embrace new ideas and technologies to enhance the learning experience."
                }
            ]
        },
        journey: {
            title: "Our Journey",
            subtitle: "Key milestones in our history",
            milestones: [
                {
                    year: "1999",
                    event: "Canary Academy was founded with 50 students and 5 teachers"
                },
                {
                    year: "2005",
                    event: "Expanded to include secondary level education"
                },
                {
                    year: "2010",
                    event: "Inaugurated new campus with modern facilities"
                },
                {
                    year: "2015",
                    event: "Achieved 100% pass rate in board examinations"
                },
                {
                    year: "2020",
                    event: "Launched digital learning platforms"
                },
                {
                    year: "2024",
                    event: "Celebrating 25 years of educational excellence"
                }
            ]
        },
        team: {
            title: "Meet Our Team",
            description: "Our dedicated team of educators and staff work tirelessly to provide the best learning environment for our students.",
            button: "View Committee"
        },
        committee: {
            smc: {
                title: "School Management Committee",
                description: "Our dedicated committee members working for the school's progress.",
                members: [
                    {
                        name: "Pending Update",
                        designation: "Chairperson",
                        image: "",
                        phone: "+977 9800000000",
                        email: "smc.chair@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Member Secretary",
                        image: "",
                        phone: "+977 9800000000",
                        email: "smc.sec@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Member",
                        image: "",
                        phone: "+977 9800000000",
                        email: "smc.member@canaryacademy.edu.np"
                    }
                ]
            },
            soc: {
                title: "School Operation Committee",
                description: "Committee responsible for school operations and administration.",
                members: [
                    {
                        name: "Pending Update",
                        designation: "Head of Operations",
                        image: "",
                        phone: "+977 9800000000",
                        email: "ops.head@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Administrator",
                        image: "",
                        phone: "+977 9800000000",
                        email: "admin@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Coordinator",
                        image: "",
                        phone: "+977 9800000000",
                        email: "coordinator@canaryacademy.edu.np"
                    }
                ]
            },
            tpa: {
                title: "Parent Teacher Organization",
                description: "Organization fostering collaboration between parents and teachers.",
                members: [
                    {
                        name: "Pending Update",
                        designation: "President",
                        image: "",
                        phone: "+977 9800000000",
                        email: "pto.president@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Vice President",
                        image: "",
                        phone: "+977 9800000000",
                        email: "pto.vp@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Secretary",
                        image: "",
                        phone: "+977 9800000000",
                        email: "pto.sec@canaryacademy.edu.np"
                    },
                    {
                        name: "Pending Update",
                        designation: "Teacher Representative",
                        image: "",
                        phone: "+977 9800000000",
                        email: "teacher.rep@canaryacademy.edu.np"
                    }
                ]
            }
        },
        orgStructure: {
            title: "Organizational Structure",
            description: "How our school is organized.",
            image: "/org-structure.jpg"
        }
    },
    academics: {
        subjects: {
            title: "Our Subjects",
            description: "Explore the wide range of subjects we offer.",
            items: [
                {
                    name: "Mathematics",
                    image: "/subjects/math.jpg"
                },
                {
                    name: "Science",
                    image: "/subjects/science.jpg"
                }
            ]
        },
        regularClasses: {
            title: "Regular Classes",
            description: "Daily class schedules and routines.",
            schedules: [
                {
                    grade: "Grade 10",
                    time: "9:00 AM - 3:00 PM",
                    subjects: "Math, Science, English, Nepali"
                }
            ]
        },
        otherPrograms: {
            title: "Other Programs",
            description: "Extra-curricular and co-curricular activities.",
            programs: [
                {
                    name: "Music Class",
                    description: "Learn instruments and vocal music.",
                    image: ""
                }
            ]
        },
        calendar: {
            title: "Academic Calendar",
            description: "View our academic calendar for important dates and events throughout the year.",
            file: ""
        }
    },
    contact: {
        hero: {
            title: "Contact Us",
            subtitle: "Get in touch with us",
            image: ""
        },
        info: {
            address: "Pokhara, Nepal",
            phone: "+977-61-123456",
            email: "info@canaryacademy.edu.np",
            mapUrl: "https://www.google.com/maps/embed?..."
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
                        "P.O. Box: XXXX"
                    ]
                },
                {
                    icon: "Phone",
                    title: "Phone",
                    items: [
                        "+977-1-XXXXXXX (Office)",
                        "+977 98XXXXXXXX (Mobile)",
                        "+977-1-XXXXXXX (Fax)"
                    ]
                },
                {
                    icon: "Mail",
                    title: "Email",
                    items: [
                        "info@canaryacademy.edu.np",
                        "admissions@canaryacademy.edu.np",
                        "principal@canaryacademy.edu.np"
                    ]
                },
                {
                    icon: "Clock",
                    title: "Office Hours",
                    items: [
                        "Monday - Friday: 8:00 AM - 4:00 PM",
                        "Saturday: 8:00 AM - 1:00 PM",
                        "Sunday: Closed"
                    ]
                }
            ]
        }
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
                {
                    step: 1,
                    title: "Application",
                    description: "Fill out the online application form with required details.",
                    icon: "FileText"
                },
                {
                    step: 2,
                    title: "Document Submission",
                    description: "Submit all required documents for verification.",
                    icon: "Clock"
                },
                {
                    step: 3,
                    title: "Interview",
                    description: "Attend an interview with our admission committee.",
                    icon: "Users"
                },
                {
                    step: 4,
                    title: "Confirmation",
                    description: "Receive admission confirmation and complete enrollment.",
                    icon: "CheckCircle2"
                }
            ]
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
                {
                    title: "Submit Application",
                    description: "Fill out the scholarship application form along with admission form.",
                    icon: "FileText"
                },
                {
                    title: "Entrance Test",
                    description: "Appear for our scholarship entrance examination.",
                    icon: "Users"
                },
                {
                    title: "Get Results",
                    description: "Scholarship results announced within 2 weeks.",
                    icon: "CheckCircle2"
                }
            ],
            buttonText: "Contact for Scholarship Info"
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
                "Medical certificate"
            ]
        },
        fees: {
            title: "Fee Structure",
            description: "Our transparent fee structure for different grade levels:",
            structure: [
                {
                    level: "Primary (K-5)",
                    admissionFee: "NPR 15,000",
                    monthlyFee: "NPR 8,000"
                },
                {
                    level: "Lower Secondary (6-8)",
                    admissionFee: "NPR 18,000",
                    monthlyFee: "NPR 10,000"
                },
                {
                    level: "Secondary (9-10)",
                    admissionFee: "NPR 20,000",
                    monthlyFee: "NPR 12,000"
                }
            ],
            disclaimer: "* Fees are subject to change. Additional charges may apply for extracurricular activities and transportation."
        },
        form: {
            title: "Apply Online",
            subtitle: "Fill out the form below to start your admission process"
        },
        cta: {
            title: "Have Questions About Admissions?",
            description: "Our admission team is here to help you through every step of the process. Contact us for personalized assistance.",
            contactButton: "Contact Us",
            callButton: "Call Now"
        }
    },
    articles: []
};
const STORAGE_KEY = "cms_content";
function getCMSContent() {
    if ("TURBOPACK compile-time truthy", 1) return defaultContent;
    //TURBOPACK unreachable
    ;
}
async function fetchCMSContent() {
    if ("TURBOPACK compile-time truthy", 1) return defaultContent;
    //TURBOPACK unreachable
    ;
}
async function saveCMSContent(content) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function updateCMSContent(section, data) {
    const content = getCMSContent();
    content[section] = {
        ...content[section],
        ...data
    };
    saveCMSContent(content);
}
function resetCMSContent() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/app/api/content/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cms$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cms-storage.ts [app-route] (ecmascript)");
;
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data");
const DATA_FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, "cms.json");
// Ensure data directory exists
async function ensureDataDir() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(DATA_DIR);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(DATA_DIR, {
            recursive: true
        });
    }
}
async function GET() {
    try {
        await ensureDataDir();
        const fileContent = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(DATA_FILE, "utf-8");
        const data = JSON.parse(fileContent);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        // If file doesn't exist or error, return default content
        console.error("Error reading CMS content:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cms$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultContent"]);
    }
}
async function POST(request) {
    try {
        const data = await request.json();
        await ensureDataDir();
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error("Error saving CMS content:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to save content"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b72a8a11._.js.map