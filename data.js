// data.js

const resumeData = {
    meta: {
        image: "profil.png",
        email: "borakaratas@anadolu.edu.tr",
        linkedin: "https://www.linkedin.com/in/borakaratas",
        linkedinLabel: "linkedin.com/in/borakaratas",
        location: {
            tr: "Eskişehir, Türkiye",
            en: "Eskisehir, Turkey"
        }
    },

    profile: {
        name: "Bora Karataş",
        title: {
            tr: "İçerik Editörü & Eğitimci | Yapay Zeka Destekli, Erişilebilir Öğrenme Deneyimleri Tasarlıyor | ELT & EdTech",
            en: "Content Editor & Educator | Designing AI-Supported, Accessible Learning Experiences | ELT & EdTech"
        },
        about: {
            tr: "Öğrenmenin bilgi depolamaktan, beceri üretmeye evrildiği dijital çağda, yapay zeka destekli içerik stratejileri geliştiriyorum. Eğitimi daha insani ve erişilebilir kılmak adına; teknolojiyi bir amaç değil, keşfetme sürecini özgürleştiren bir araç olarak kullanıyorum. Performans kaygısından uzak, modern ve analitik bir öğrenme vizyonu sunuyorum.",
            en: "In the digital age where learning evolves from storing information to generating skills, I develop AI-supported content strategies. To make education more human and accessible; I use technology not as a goal, but as a tool that liberates the discovery process. I offer a modern and analytical learning vision free from performance anxiety."
        }
    },

    experience: [
        {
            role: { tr: "İçerik Editörü", en: "Content Editor" },
            company: { tr: "Anadolu Üniversitesi | Öğrenme Teknolojileri Ar-Ge Birimi", en: "Anadolu University | Learning Technologies R&D Unit" },
            date: { tr: "ARALIK 2022 - HALEN", en: "DEC 2022 - PRESENT" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Öğrenme Teknolojileri Ar-Ge Birimi bünyesinde, statik ders materyallerini dijital deneyimlere dönüştüren kapsamlı bir dijital dönüşüm sürecinin parçasıyım. İçerik stratejisine Generative AI (LLM) araçlarını entegre ederek editöryal verimliliği artırırken evrensel tasarım ilkeleriyle erişilebilirliği ve öğrenci etkileşimini optimize ediyorum. Teknolojiyi sadece bir araç olarak değil, öğrenme sürecini özgürleştiren bir unsur olarak konumluyorum.",
                en: "Within the Learning Technologies R&D Unit, I am part of a comprehensive digital transformation process that turns static course materials into digital experiences. I integrate Generative AI (LLM) tools into content strategy to increase editorial efficiency while optimizing accessibility and student engagement with universal design principles. I position technology not just as a tool, but as an element that liberates the learning process."
            },
            tags: {
                tr: ["İçerik Stratejisi", "Yapay Zeka İstemleri", "Eğitim Yönetimi Sistemleri"],
                en: ["Content Strategy", "AI Prompts", "LMS"]
            }
        },
        {
            role: { tr: "İngilizce Öğretmeni (Stajyer)", en: "English Teacher (Intern)" },
            company: { tr: "T.C. Millî Eğitim Bakanlığı | Gülay Kanatlı Ortaokulu", en: "Ministry of National Education | Gülay Kanatlı Secondary School" },
            date: { tr: "EYLÜL 2025 - ARALIK 2025", en: "SEP 2025 - DEC 2025" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Gülay Kanatlı Ortaokulunda ezbere dayalı klasik gramer öğretimi yerine, dili aktif bir iletişim aracı olarak konumlandıran öğrenci merkezli bir müfredat uyguladım. Ders tasarımlarımı sadece dil bilgisi odaklı değil, 21. yüzyıl becerileri (4C) ve eleştirel düşünme yetisini geliştirecek şekilde kurguladım. Sınıf yönetiminde oyunlaştırma (gamification) tekniklerini stratejik olarak kullanarak pasif öğrencilerin motivasyonunu yükselttim ve derse katılım oranlarını maksimize ettim.",
                en: "Implemented a student-centered curriculum positioning language as an active communication tool rather than rote-based grammar teaching. Designed lessons focused on 21st-century skills (4C) and critical thinking. Strategically used gamification techniques in classroom management to boost motivation of passive students and maximize participation rates."
            },
            tags: {
                tr: ["Öğretim Tasarımı", "Sınıf Yönetimi", "Yabancı Dil olarak İngilizce Öğretimi"],
                en: ["Instructional Design", "Classroom Management", "TEFL"]
            }
        }
    ],

    education: [
        {
            degree: { tr: "İngilizce Öğretmenliği", en: "English Language Teaching (ELT)" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Pedagoji ve öğretim teknolojileri üzerine odaklandım. Geleneksel yaklaşımları modern EdTech araçlarıyla harmanlayan projeler geliştirdim.",
                en: "Focused on pedagogy and instructional technologies. Developed projects blending traditional approaches with modern EdTech tools."
            }
        },
        {
            degree: { tr: "Anglo-Amerikan Çalışmaları", en: "Anglo-American Studies" },
            school: { tr: "Universidade de Coimbra", en: "Universidade de Coimbra" },
            date: { tr: "ERASMUS+", en: "ERASMUS+" },
            location: { tr: "COIMBRA, PORTEKİZ", en: "COIMBRA, PORTUGAL" },
            desc: {
                tr: "Kültürlerarası iletişim ve adaptasyon yetkinlikleri kazandım. Global eğitim sistemlerini yerinde analiz etme fırsatı buldum.",
                en: "Gained intercultural communication and adaptation competencies. Had the opportunity to analyze global education systems on-site."
            }
        },
        {
            degree: { tr: "İktisat (İngilizce)", en: "Economics (English)" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "UZAKTAN EĞİTİM", en: "REMOTE LEARNING" },
            desc: {
                tr: "Sistem düşüncesi, veri okuryazarlığı ve analitik karar alma süreçleri üzerine eğitim alıyorum.",
                en: "Studying systems thinking, data literacy, and analytical decision-making processes."
            }
        }
    ],

    skills: {
        tr: [
            "Prompt Mühendisliği", "Öğretim Tasarımı", "Yapay Zeka", 
            "Öğrenme Yönetim Sistemleri", "İçerik Yönetim Sistemleri", 
            "Dijital Arşivleme", "Akademik Araştırma", "Sistem Düşüncesi"
        ],
        en: [
            "Prompt Engineering", "Instructional Design", "Artificial Intelligence", 
            "LMS", "CMS", "Digital Archiving", 
            "Academic Research", "Systems Thinking"
        ]
    },

    languages: [
        {
            name: { tr: "TÜRKÇE", en: "TURKISH" },
            level: { tr: "Ana Dil / Editoryal Hakimiyet", en: "Native / Editorial Mastery" }
        },
        {
            name: { tr: "İNGİLİZCE", en: "ENGLISH" },
            level: { tr: "Tam Profesyonel / C2 (Akademik)", en: "Full Professional / C2 (Academic)" }
        },
        {
            name: { tr: "PORTEKİZCE", en: "PORTUGUESE" },
            level: { tr: "Temel Kültürel Aşinalık", en: "Basic Cultural Familiarity" }
        }
    ]
};
