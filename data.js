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
        tr: "Pedagojik ilkelerle yapay zekâyı bütünleştirmeye kendini adamış, ileri görüşlü bir eğitimciyim. İnsan merkezli tasarım felsefesiyle hareket ederek eleştirel düşünmeyi destekleyen erişilebilir dijital içerikler ve özelleştirilmiş eğitim araçları geliştirme konusunda uzmanım.",
        en: "Forward-thinking educator dedicated to integrating artificial intelligence with pedagogical principles. I specialize in building accessible digital content and custom educational tools that foster critical thinking, guided by a human-centered design philosophy."
    },

    hasOccupation: [
        {
            "@type": "EmployeeRole",
            id: "job-editor",
            jobTitle: { tr: "İçerik Editörü", en: "Content Editor" },
            startDate: { tr: "Aralık 2022 - Halen", en: "Dec 2022 - Present" },
            workMode: {
                tr: "Hibrit · Yarı zamanlı", en: "Hybrid · Part-time"
            },
            description: {
                tr: "Üretken yapay zekâ protokollerini süreçlere entegre ederek editoryal iş akışlarını dönüştürdüm; üniversite platformlarında sıkı editoryal tutarlılığı korurken üretim süresini önemli ölçüde azalttım. Statik öğretim materyallerini, farklı öğrenen ihtiyaçları ve evrensel tasarım standartlarıyla uyumlu, dinamik ve erişilebilir dijital varlıklara dönüştürdüm. Disiplinlerarası ekiplerle iş birliği yaparak geniş bir öğrenci kitlesine hizmet eden yüksek kaliteli ve kapsayıcı öğrenme kaynaklarının sunulmasına katkı sağladım.",
                en: "Revolutionized editorial workflows by embedding generative AI protocols, significantly reducing production time while ensuring strict editorial consistency across university platforms. Transformed static instructional materials into dynamic, accessible digital assets, ensuring compliance with diverse learner needs and universal design standards. Partnered with interdisciplinary teams to deliver high-quality, inclusive learning resources that serve a massive student body."
            },
            worksFor: {
                "@type": "Organization",
                name: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
                department: { tr: "Öğrenme Teknolojileri Ar-Ge Birimi", en: "Learning Technologies R&D Unit" },
                address: { tr: "Eskişehir, Türkiye", en: "Eskisehir, Turkey" }
            }
        },
        {
            "@type": "EmployeeRole",
            id: "job-teacher",
            jobTitle: { tr: "İngilizce Öğretmeni", en: "English Teacher" },
            startDate: { tr: "Eylül 2025 - Aralık 2025", en: "Sep 2025 - Dec 2025" },
            workMode: { tr: "Yerinde · Staj", en: "On-site · Internship" },
            description: {
                tr: "Ezbere dayalı öğrenmeyi oyunlaştırılmış ve öğrenen merkezli stratejilerle değiştirerek sınıf dinamiklerini canlandırdım; bunun sonucunda katılım ve motivasyonda ölçülebilir bir artış sağlandı. Müfredat odağını 21. yüzyıl yetkinliklerine kaydırarak öğrencilerin eleştirel düşünme ve iş birliği becerilerini gerçek zamanlı senaryolarda aktif biçimde uyguladıkları bir öğrenme ortamı oluşturdum.",
                en: "Revitalized classroom dynamics by replacing rote memorization with gamified, learner-centered strategies, resulting in measurably higher participation and motivation. Shifted the curriculum focus to 21st-century competencies, fostering an environment where students actively applied critical thinking and collaboration skills in real-time scenarios."
            },
            worksFor: {
                "@type": "Organization",
                name: { tr: "T.C. Millî Eğitim Bakanlığı", en: "Ministry of National Education" },
                department: { tr: "Gülay Kanatlı Ortaokulu", en: "Gülay Kanatlı Secondary School" },
                address: { tr: "Eskişehir, Türkiye", en: "Eskisehir, Turkey" }
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
            demoUrl: { tr: "karatasbora.github.io/arc", en: "karatasbora.github.io/arc" },
            description: {
                tr: "Öğretmenlerin hazırlık için harcadığı saatleri saniyelere indiren; CEFR uyumlu çalışma kâğıtlarını özerk biçimde üreten akıllı bir ders planlama asistanı tasarlayıp geliştirdim. jsPDF kullanarak tamamen istemci tarafında çalışan bir belge motoru kurguladım; böylece arka uç bağımlılıklarını ortadan kaldırarak öğretmenlerin güvenli ve sınıfa hazır PDF’leri anında üretip indirmesini mümkün kıldım. Pedagojik açıdan sağlam ve yapılandırılmış JSON çıktıları garanti etmek için deterministik prompt mühendisliği uyguladım; böylece YZ üretiminin rastlantısal sonuçlar yerine eğitim çerçevelerine sıkı biçimde bağlı kalmasını sağladım. Eğitimcilerin bilişsel yükünü azaltmak üzere arayüzü özellikle bu hedefe göre tasarladım; verimliliği ve kaynaklara erişilebilirliği doğrudan artırdım.",
                en: "Engineered an intelligent lesson planning assistant that reduces hours of teacher prep time into seconds, autonomously generating CEFR-aligned worksheets. Architected a fully client-side document engine (using jsPDF) that eliminates backend dependencies, empowering teachers to instantly generate and download secure, classroom-ready PDFs. Implemented deterministic prompt engineering to guarantee pedagogically sound, structured JSON outputs, ensuring AI generation adheres strictly to educational frameworks rather than random chance. Designed the UI specifically to reduce cognitive load for educators, directly improving productivity and resource accessibility"
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
            name: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            address: { tr: "Eskişehir, Türkiye", en: "Eskişehir, Turkey" },
            studyMode: { tr: "Örgün Eğitim", en: "Formal Education" },
            description: {
                tr: "Modern pedagojik stratejiler geliştirmek için geleneksel öğrenen merkezli yöntemleri çağdaş eğitim teknolojileri araçlarıyla harmanladım.",
                en: "Blended traditional learner-centered methodologies with contemporary EdTech tools to develop modern pedagogical strategies."
            },
            award: { tr: "İngilizce Öğretmenliği Lisans Derecesi", en: "B.A. in English Language Teaching" },
            startDate: { tr: "Eylül 2022 - Haziran 2026", en: "Sep 2022 - Jun 2026" }
        },
        {
            "@type": "EducationalOrganization",
            id: "edu-erasmus",
            name: { tr: "Coimbra Üniversitesi", en: "University of Coimbra" },
            address: { tr: "Coimbra, Portekiz", en: "Coimbra, Portugal" },
            studyMode: { en: "Erasmus+" },
            description: {
                tr: "Uluslararası eğitim sistemlerine karşılaştırmalı bir bakış geliştirdim ve ileri düzey kültürlerarası iletişim becerileri edindim.",
                en: "Gained comparative insight into international education systems and developed advanced intercultural communication skills."
            },
            award: { tr: "Anglo-Amerikan Çalışmaları", en: "Anglo-American Studies" },
            startDate: { tr: "Eylül 2024 - Şubat 2025", en: "Sep 2024 - Feb 2025" }
        },
        {
            "@type": "EducationalOrganization",
            id: "edu-econ",
            name: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            studyMode: { tr: "Uzaktan Eğitim", en: "Remote Learning" },
            description: {
                tr: "Eğitim politikalarını ve gelişimini analiz etmek için sistem düşüncesi ve veri okuryazarlığından yararlanıyorum.",
                en: "Leveraging systems thinking and data literacy to analyze education policy and development."
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
            category: { tr: "Teknoloji", en: "Technology" },
            items: [
                { name: { tr: "Öğrenme ve Gelişim için Üretken YZ", en: "Generative AI for Learning and Development" }, targets: ["job-editor"] },
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
                { name: { tr: "Uyumluluk", en: "Adaptability" }, targets: ["edu-erasmus"] },
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
                "name": "Bora Karataş - Resume", // Strict string (EN)
                "mainEntity": {
                    "@type": "Person",
                    "name": person.name,
                    "jobTitle": person.jobTitle.en, // Pick EN for strict valid Text
                    "description": person.description.en, // Pick EN
                    "image": `${meta.baseUrl}/${meta.image}`,
                    "url": meta.baseUrl + "/",
                    "sameAs": [
                        meta.linkedin,
                        `mailto:${meta.email}`
                    ],

                    // --- SKILLS (ItemList) ---
                    "knowsAbout": person.knowsAbout.map(cat => ({
                        "@type": "ItemList",
                        "name": cat.category.en, // Pick EN
                        "itemListElement": cat.items.map(i => i.name.en || i.name) // Pick EN
                    })),

                    // --- EXPERIENCE (Strict) ---
                    // Using 'worksFor' to list organizations.
                    "worksFor": person.hasOccupation.map(job => {
                        return {
                            "@type": "Organization",
                            "name": job.worksFor.name.en || job.worksFor.name
                        };
                    }),

                    // --- EDUCATION ---
                    "alumniOf": person.alumniOf.map(edu => {
                        return {
                            "@type": "EducationalOrganization",
                            "name": edu.name.en || edu.name
                        };
                    }),

                    // --- PROJECTS (CreativeWork) ---
                    "hasPart": person.hasCredential.map(proj => ({
                        "@type": "CreativeWork",
                        "name": proj.name.en || proj.name, // CAUTION: Verify if project name is localized
                        "description": proj.description ? (proj.description.en || proj.description) : undefined,
                        "url": proj.links ? proj.links[0].url : proj.demoUrl,
                        "creator": {
                            "@type": "Person",
                            "name": person.name
                        }
                    }))
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
