// --- 1. SINGLE SOURCE OF TRUTH (Local Definitions) ---
/**
 * @typedef {Object} LocalizedString
 * @property {string} tr
 * @property {string} en
 */
/** @type {{ baseUrl: string, image: string, email: string, linkedin: string, linkedinLabel: string, location: LocalizedString, keywords: LocalizedString, verificationCodes: { google: string } }} */
const meta = {
    baseUrl: "https://karatasbora.github.io/me",
    image: "profil.webp",
    email: "borakaratas@anadolu.edu.tr",
    linkedin: "https://www.linkedin.com/in/borakaratas",
    linkedinLabel: "linkedin.com/in/borakaratas",
    location: { tr: "Eskişehir, Türkiye", en: "Eskisehir, Turkey" },
    verificationCodes: {
        google: "QzyLRgFCHH93peNx08rdCue9fZDR-5OYVc818U5goIU"
    },
    keywords: {
        tr: "Bora Karataş, Eğitim Teknoloğu, Öğretim Tasarımı, ELT, Yapay Zeka, Eğitimde YZ",
        en: "Bora Karataş, Instructional Technologist, Instructional Design, ELT, AI in Education, EdTech"
    }
};

/** @type {{ "@type": string, name: string, jobTitle: LocalizedString, description: LocalizedString, hasOccupation: Array<any>, hasCredential: Array<any>, alumniOf: Array<any>, knowsLanguage: Array<any>, knowsAbout: Array<any> }} */
const person = {
    "@type": "Person",
    name: "Bora Karataş",
    jobTitle: {
        tr: "Yenilikçi Eğitim Uzmanı & Öğretim Teknoloğu | YZ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
        en: "Innovative Education Specialist & Instructional Technologist | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
    },
    description: {
        tr: "İleri görüşlü bir eğitimci olarak, yapay zekayı pedagojik ilkelerle bütünleştirmeye kendimi adadım. İnsan merkezli tasarım felsefesiyle yönlendirilen, eleştirel düşünmeyi teşvik eden erişilebilir dijital içerik ve özelleştirilmiş eğitim araçları geliştirme konusunda uzmanım.",
        en: "Forward-thinking educator dedicated to integrating artificial intelligence with pedagogical principles. I specialize in building accessible digital content and custom educational tools that foster critical thinking, guided by a human-centered design philosophy."
    },

    hasOccupation: [
        {
            "@type": "EmployeeRole",
            id: "job-editor",
            jobTitle: { tr: "İçerik Editörü", en: "Content Editor" },
            startDate: { tr: "Aralık 2022 - Halen", en: "Dec 2022 - Present" },
            location: {
                tr: "Hibrit · Yarı zamanlı", en: "Hybrid · Part-time"
            },
            description: {
                tr: "Üniversite platformlarında kullanılan öğretim materyallerini erişilebilir ve etkileşimli dijital içeriklere dönüştürüyorum. Üretken yapay zekâ araçlarını editoryal süreçlere entegre ederek içerik üretiminde verimlilik, tutarlılık ve kaliteyi artırmaya odaklanıyorum. Disiplinlerarası ekiplerle birlikte çalışarak hem erişilebilirlik standartlarına uygun hem de farklı öğrenen profillerine hitap eden materyaller geliştirilmesine katkı sağlıyorum.",
                en: "I transform instructional materials into accessible and interactive digital learning resources used across university platforms. I integrate generative AI tools into editorial workflows to enhance efficiency, consistency, and quality in content production. Working collaboratively with interdisciplinary teams, I contribute to the creation of materials that meet accessibility standards and support diverse learner needs."
            },
            worksFor: {
                "@type": "Organization",
                name: { tr: "Anadolu Üniversitesi · Öğrenme Teknolojileri Ar-Ge Birimi | Eskişehir, Türkiye", en: "Anadolu University · Learning Technologies R&D Unit | Eskisehir, Turkey" }
            }
        },
        {
            "@type": "EmployeeRole",
            id: "job-teacher",
            jobTitle: { tr: "İngilizce Öğretmeni", en: "English Teacher" },
            startDate: { tr: "Eylül 2025 - Aralık 2025", en: "Sep 2025 - Dec 2025" },
            location: { tr: "Yerinde · Staj", en: "On-site · Internship" },
            description: {
                tr: "Ezbere dayalı öğretim yerine iletişim, iş birliği ve eleştirel düşünme gibi 21. yüzyıl becerilerine odaklanan öğrenen merkezli bir müfredat uyguladım. Sınıf içi motivasyonu artıran oyunlaştırma temelli yöntemler kullanarak öğrencilerin derse katılımını güçlendirdim ve farklı öğrenci ihtiyaçlarına duyarlı, kapsayıcı bir öğrenme ortamı oluşturdum.",
                en: "I implemented a learner-centered curriculum that emphasized 21st-century skills such as communication, collaboration, and critical thinking rather than rote memorization. By applying gamified classroom management strategies, I significantly increased student engagement and motivation while fostering an inclusive learning environment that supported diverse learners and encouraged real-world language use."
            },
            worksFor: {
                "@type": "Organization",
                name: { tr: "T.C. Millî Eğitim Bakanlığı · Gülay Kanatlı Ortaokulu | Eskişehir, Türkiye", en: "Ministry of National Education · Gülay Kanatlı Secondary School | Eskisehir, Turkey" }
            }
        }
    ],

    hasCredential: [
        {
            "@type": "CreativeWork",
            id: "proj-arc",
            links: [
                { label: { tr: "Proje Demosu", en: "Project Demo" }, url: "https://karatasbora.github.io/arc/" },
                { label: { en: "GitHub" }, url: "https://github.com/karatasbora/arc" }
            ],
            name: { tr: "arc – Yapay Zekâ Destekli Eğitim Materyali Üretici", en: "arc – AI-Powered Educational Material Generator" },
            dateCreated: { tr: "Aralık 2025 - Halen", en: "Dec 2025 - Present" },
            location: { tr: "karatasbora.github.io/arc", en: "karatasbora.github.io/arc" },
            description: {
                tr: "Bu proje, CEFR uyumlu çalışma kâğıtlarını özerk biçimde üretebilen, React 19 ve Google Gemini API üzerine inşa edilmiş yenilikçi bir eğitim aracıdır. Bu projede deterministik JSON çıktıları güvence altına almak için ileri düzey prompt engineering tekniklerini kullandım ve öğretmenlerin pedagojik odağı dinamik biçimde düzenleyebilmelerine imkân tanıyan bir yapı geliştirdim. jsPDF tabanlı özel bir istemci tarafı PDF motoru tasarlayarak arka uç bağımlılığını ortadan kaldırdım, öğretmen iş yükünü azalttım ve sınıfa hazır materyallerin hızlı üretimini mümkün kıldım. Projenin kullanıcı arayüzünü de öğretmen verimliliğini artıracak şekilde modern ve erişilebilir bir tasarım anlayışıyla geliştirdim.",
                en: "This project is an innovative educational tool built with React 19 and the Google Gemini API, designed to autonomously produce CEFR-aligned worksheets. In this project, I employed advanced prompt engineering techniques to ensure deterministic JSON outputs, enabling dynamic scaffolding and flexible pedagogical adjustments. I developed a custom client-side PDF engine using jsPDF, eliminating backend dependencies and allowing teachers to instantly generate professional, classroom-ready materials. The user interface was designed with a focus on usability, accessibility, and reducing teacher workload, ultimately improving productivity and resource accessibility."
            },
            creator: {
                "@type": "Person",
                jobTitle: { tr: "Full Stack Geliştirici", en: "Full Stack Developer" }
            }
        }
    ],

    alumniOf: [
        {
            "@type": "EducationalOrganization",
            id: "edu-elt",
            name: { tr: "Anadolu Üniversitesi | Eskişehir, Türkiye", en: "Anadolu University | Eskişehir, Turkey" },
            location: { tr: "Örgün Eğitim", en: "Formal Education" },
            description: {
                tr: "Pedagojik yaklaşımlar, öğretim teknolojileri ve öğrenen merkezli öğretim yöntemleri üzerine yoğunlaştım. Bu süreçte geleneksel eğitim anlayışını güncel eğitim teknolojileriyle birleştiren projeler geliştirdim.",
                en: "I focused academically on pedagogy, instructional technologies, and learner-centered teaching methodologies, developing projects that blended traditional education with contemporary EdTech tools."
            },
            award: { tr: "İngilizce Öğretmenliği Lisans Derecesi", en: "B.A. in English Language Teaching" },
            startDate: { tr: "Eylül 2022 - Haziran 2026", en: "Sep 2022 - Jun 2026" }
        },
        {
            "@type": "EducationalOrganization",
            id: "edu-erasmus",
            name: { tr: "Coimbra Üniversitesi | Coimbra, Portekiz", en: "University of Coimbra | Coimbra, Portugal" },
            location: { en: "Erasmus+" },
            description: {
                tr: "Bu program, kültürlerarası iletişim becerilerimi geliştirmeme, küresel vatandaşlık perspektifi kazanmama ve uluslararası eğitim sistemlerine dair karşılaştırmalı bir bakış açısı edinmeme olanak sağladı.",
                en: "This program strengthened my intercultural communication skills, broadened my global citizenship perspective, and provided comparative insight into international education systems"
            },
            award: { tr: "Anglo-Amerikan Çalışmaları", en: "Anglo-American Studies" },
            startDate: { tr: "Eylül 2024 - Şubat 2025", en: "Sep 2024 - Feb 2025" }
        },
        {
            "@type": "EducationalOrganization",
            id: "edu-econ",
            name: { tr: "Anadolu Üniversitesi", en: "Anadolu University | Eskişehir, Turkey" },
            location: { tr: "Uzaktan Eğitim", en: "Remote Learning" },
            description: {
                tr: "Devam eden eğitimim ise sistem düşüncesi, veri okuryazarlığı ve eğitim politikalarına ilişkin analitik bakış geliştirmeyi destekleyen teorik ve pratik bir temel oluşturuyor.",
                en: "My ongoing studies further support my academic profile through systems thinking, data literacy, and analytical approaches relevant to education policy and development."
            },
            award: { tr: "İktisat (İngilizce) Lisans Derecesi", en: "B.S. in Economics (English)" },
            startDate: { tr: "Eylül 2022 - Halen", en: "Sep 2022 - Present" }
        }
    ],

    knowsLanguage: [
        {
            "@type": "Language",
            name: { tr: "TÜRKÇE", en: "TURKISH" },
            proficiencyLevel: { tr: "Ana Dili / Editoryal Hakimiyet", en: "Native / Editorial Proficiency" }
        },
        {
            "@type": "Language",
            name: { tr: "İNGİLİZCE", en: "ENGLISH" },
            proficiencyLevel: { tr: "Tam Profesyonel / C2 (Akademik)", en: "Full Professional / C2 (Academic)" }
        },
        {
            "@type": "Language",
            name: { tr: "PORTEKİZCE", en: "PORTUGUESE" },
            proficiencyLevel: { tr: "Temel Kültürel Aşinalık", en: "Basic Cultural Familiarity" }
        }
    ],

    knowsAbout: [
        {
            category: { tr: "Teknoloji & YZ Yetkinlikleri", en: "Technology & AI Capabilities" },
            items: [
                { name: { tr: "Öğrenme ve Gelişim için Yaratıcı Yapay Zeka", en: "Generative AI for Learning and Development" }, targets: ["job-editor"] },
                { name: { tr: "Prompt Mühendisliği", en: "Prompt Engineering" }, targets: ["proj-arc"] },
                { name: { tr: "Web Geliştirme", en: "Web Development" }, targets: ["proj-arc"] },
                { name: { tr: "Öğrenme Yönetim Sistemleri", en: "Learning Management Systems" }, targets: ["job-editor"] },
                { name: { tr: "İçerik Yönetim Sistemleri", en: "Content Management Systems" }, targets: ["job-editor"] },
                { name: { tr: "Dijital Dönüşüm", en: "Digital Transformation" }, targets: ["job-editor"] }
            ]
        },
        {
            category: { tr: "Pedagoji & Tasarım", en: "Pedagogy & Design" },
            items: [
                { name: { tr: "Öğretim Tasarımı", en: "Instructional Design" }, targets: ["job-teacher", "job-editor", "edu-elt"] },
                { name: { tr: "Pedagoji", en: "Pedagogy" }, targets: ["edu-elt"] },
                { name: { tr: "Yabancı Dil olarak İngilizce Öğretimi", en: "Teaching English as a Foreign Language" }, targets: ["job-teacher", "proj-arc"] },
                { name: { tr: "Evrensel Tasarım", en: "Universal Design" }, targets: ["job-editor", "proj-arc"] },
                { name: { tr: "Erişilebilirlik", en: "Accessibility" }, targets: ["job-editor", "proj-arc"] },
                { name: { tr: "EdTech Entegrasyonu", en: "EdTech Integration" }, targets: ["edu-elt"] },
                { name: { tr: "Program Geliştirme", en: "Curriculum Development" }, targets: ["job-teacher", "edu-elt"] },
                { name: { tr: "Oyunlaştırma", en: "Gamification" }, targets: ["job-teacher"] },
                { name: { tr: "21. Yüzyıl Yetkinlikleri", en: "21st Century Skills" }, targets: ["job-teacher"] }
            ]
        },
        {
            category: { tr: "Analiz & Strateji", en: "Analysis & Strategy" },
            items: [
                { name: { tr: "Sistem Düşüncesi", en: "Systems Thinking" }, targets: ["edu-econ"] },
                { name: { tr: "Veri Okuryazarlığı", en: "Data Literacy" }, targets: ["edu-econ"] }
            ],
        },
        {
            category: { tr: "Kişilerarası Beceriler", en: "Interpersonal Skills" },
            items: [
                { name: { tr: "Kültürlerarası İletişim", en: "Intercultural Communication" }, targets: ["edu-erasmus"] },
                { name: { tr: "Takım Çalışması", en: "Teamwork" }, targets: ["job-editor"] },
                { name: { tr: "Uyumlu", en: "Adaptable" }, targets: ["edu-erasmus"] },
                { name: { tr: "Küreselleşme", en: "Globalization" }, targets: ["edu-erasmus"] },
            ]
        }
    ]
};

// --- 2. EXPORT OBJECT & GRAPH CONSTRUCTION ---
const resumeData = {
    // UI Config
    structure: [
        { type: 'text', titleKey: 'about', dataKey: 'person.description' },
        { type: 'list', titleKey: 'experience', dataKey: 'person.hasOccupation' },
        { type: 'list', titleKey: 'projects', dataKey: 'person.hasCredential' },
        { type: 'list', titleKey: 'education', dataKey: 'person.alumniOf' },
        { type: 'grid', titleKey: 'languages', dataKey: 'person.knowsLanguage' },
        { type: 'tags', titleKey: 'skills', dataKey: 'person.knowsAbout' },
    ],
    ui: {
        about: { tr: "Hakkında", en: "About" },
        experience: { tr: "Deneyim", en: "Experience" },
        projects: { tr: "Projeler", en: "Projects" },
        education: { tr: "Eğitim", en: "Education" },
        skills: { tr: "Yetkinlikler Özeti", en: "Skills Summary" },
        languages: { tr: "Diller", en: "Languages" },
        print: { tr: "PDF", en: "PDF" },
        connections: { tr: "Bağlantılar:", en: "Connections:" },
        viewCategory: { tr: "Kategoriyi Görüntüle", en: "View Category" },
        unknownRole: { tr: "Bilinmeyen Rol", en: "Unknown Role" },
        copied: { tr: "Kopyalandı!", en: "Copied!" },
        showDetails: { tr: "Detayları Göster", en: "Show Details" },

        documentTitle: {
            tr: "Bora Karataş - Özgeçmiş",
            en: "Bora Karataş - Resume"
        },
        seoDesc: {
            tr: "Yenilikçi Eğitim Uzmanı & Öğretim Teknoloğu | YZ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
            en: "Innovative Education Specialist & Instructional Technologist | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        jobTitleShort: {
            tr: "Yenilikçi Eğitim Uzmanı & Öğretim Teknoloğu",
            en: "Innovative Education Specialist & Instructional Technologist"
        }
    },

    meta: meta,
    person: person,

    jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": person.name,
                "url": meta.baseUrl + "/"
            },
            {
                "@type": "ProfilePage",
                "name": { tr: "Bora Karataş - Özgeçmiş", en: "Bora Karataş - Resume" },
                "mainEntity": {
                    // Spread the person object (Name, JobTitle, Description, etc.)
                    ...person,
                    "image": `${meta.baseUrl}/${meta.image}`,
                    "url": meta.baseUrl + "/",
                    "sameAs": [
                        meta.linkedin,
                        `mailto:${meta.email}`
                    ],
                    // Manual Skill Flattening for Schema Compliance
                    "knowsAbout": person.knowsAbout.flatMap(cat => cat.items.map(i => i.name))
                }
            }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = resumeData;
} else if (typeof window !== 'undefined') {
    window.resumeData = resumeData;
}
