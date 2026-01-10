// data.js

const resumeData = {
    // --- 1. CONFIGURATION: THE LAYOUT ---
    structure: [
        { type: 'text', titleKey: 'about', dataKey: 'profile.about' },
        { type: 'list', titleKey: 'experience', dataKey: 'experience' },
        { type: 'list', titleKey: 'projects', dataKey: 'projects' },
        { type: 'list', titleKey: 'education', dataKey: 'education' },
        { type: 'grid', titleKey: 'languages', dataKey: 'languages' },
        { type: 'tags', titleKey: 'skills', dataKey: 'skills' },
    ],

    // --- 2. UI LABELS ---
    ui: {
        about: { tr: "Hakkında", en: "About" },
        experience: { tr: "Deneyim", en: "Experience" },
        projects: { tr: "Projeler", en: "Projects" },
        education: { tr: "Eğitim", en: "Education" },
        skills: { tr: "Yetkinlikler Özeti", en: "Skills Summary" },
        languages: { tr: "Diller", en: "Languages" },
        print: { tr: "PDF", en: "PDF" },

        documentTitle: {
            tr: "Bora Karataş - Özgeçmiş",
            en: "Bora Karataş - Resume"
        },
        seoDesc: {
            tr: "Eğitim Uzmanı & İçerik Editörü | Yapay Zekâ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
            en: "Innovative Education Specialist & Instructional Technologist | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        jobTitleShort: {
            tr: "Eğitim Uzmanı & İçerik Editörü",
            en: "Innovative Education Specialist and Instructional Technologist"
        }
    },

    // --- 3. GLOBAL META ---
    meta: {
        image: "profil.webp",
        email: "borakaratas@anadolu.edu.tr",
        linkedin: "https://www.linkedin.com/in/borakaratas",
        linkedinLabel: "linkedin.com/in/borakaratas",
        location: {
            tr: "Eskişehir, Türkiye",
            en: "Eskisehir, Turkey"
        }
    },

    // --- 4. PROFILE SECTION ---
    profile: {
        name: "Bora Karataş",
        title: {
            tr: "Eğitim Uzmanı & İçerik Editörü | Yapay Zekâ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
            en: "Innovative Education Specialist & Instructional Technologist | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        about: {
            tr: "Yapay zekâ ve eğitim teknolojileriyle desteklenen, erişilebilir ve insan odaklı öğrenme deneyimlerinin tasarımı konusunda uzmanlaşmış bir eğitim profesyoneliyim. Yükseköğretim ve kamu eğitimi bağlamlarında içerik stratejisi, öğretim tasarımı ve dijital dönüşüm alanlarında deneyime sahibim. Küresel sürdürülebilirlik ve eşitlik hedefleriyle uyumlu, kapsayıcı, etik ve öğrenen merkezli eğitimi ilerletmeye kararlıyım. Teknolojiyi, kendi başına bir amaç olarak değil; keşif, eleştirel düşünme ve yaşam boyu öğrenmeyi mümkün kılan bir araç olarak ele alırım.",
            en: "Forward-thinking educator bridging the gap between pedagogy and artificial intelligence. Expert in developing inclusive, AI-supported learning experiences and accessible digital content. Proven track record in full-stack educational tool development (React, Gemini API) and prompt engineering. Committed to human-centered design that leverages technology to foster critical thinking and global citizenship."
        }
    },

    // --- 5. EXPERIENCE ---
    experience: [
        {
            id: "job-editor",
            role: { tr: "İçerik Editörü", en: "Content Editor" },
            company: { tr: "Hibrit · Yarı zamanlı | Anadolu Üniversitesi · Öğrenme Teknolojileri Ar-Ge Birimi", en: "Hybrid · Part-time | Anadolu University · Learning Technologies R&D Unit" },
            date: { tr: "ARALIK 2022 - HALEN", en: "DEC 2022 - PRESENT" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Kurumsal dijital dönüşüm girişimlerine katkı sağlayarak durağan öğretim materyallerinin etkileşimli ve kapsayıcı dijital öğrenme deneyimlerine dönüştürülmesi üzerinde çalışıyorum. Evrensel tasarım ve erişilebilirlik ilkelerine bağlı kalarak, editoryal verimliliği, tutarlılığı ve ölçeklenebilirliği artırmak için içerik geliştirme iş akışlarına Üretken Yapay Zekâ (LLM) araçlarını entegre ediyorum. Çok disiplinli ekiplerle iş birliği içinde çalışarak dijital platformlarda öğrenen etkileşimini artırıyor ve farklı öğrenme ihtiyaçlarını destekliyorum.",
                en: "Develop and edit interactive digital learning materials, transforming static instructional content into accessible formats for university platforms. Integrate Generative AI (LLM) tools into daily editorial workflows to improve the efficiency and consistency of content production. Collaborate with multidisciplinary teams to ensure all digital content meets accessibility standards and supports diverse learner needs."
            }
        },
        {
            id: "job-teacher",
            role: { tr: "İngilizce Öğretmeni", en: "English Teacher" },
            company: { tr: "Yerinde · Staj | T.C. Millî Eğitim Bakanlığı · Gülay Kanatlı Ortaokulu", en: "On-site · Internship | Ministry of National Education · Gülay Kanatlı Secondary School" },
            date: { tr: "EYLÜL 2025 - ARALIK 2025", en: "SEP 2025 - DEC 2025" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Ezbere dayalı dilbilgisi öğretimi yerine iletişim, eleştirel düşünme ve gerçek yaşamda dil kullanımını merkeze alan öğrenen odaklı bir İngilizce öğretim programı uyguladım. Dersleri 21. yüzyıl yetkinlikleriyle (iletişim, iş birliği, yaratıcılık ve eleştirel düşünme) uyumlu şekilde tasarladım. Öğrenci motivasyonunu, katılımını ve kapsayıcılığı artırmak amacıyla sınıf yönetiminde oyunlaştırma stratejileri kullandım.",
                en: "Designed and delivered a learner-centered curriculum focused on 21st-century competencies (communication, collaboration, critical thinking) rather than rote memorization. Implemented gamified classroom management techniques that increased student motivation and participation rates in a diverse classroom setting. Adapted lesson plans to ensure inclusivity, fostering a safe environment for real-world language application.",
            }
        },
    ],

    // --- 6. PROJECTS ---
    projects: [
        {
            id: "proj-arc",
            links: [
                {
                    label: { tr: "Web Sitesi", en: "Website" },
                    url: "https://karatasbora.github.io/arc/"
                },
                {
                    label: { tr: "Kaynak Kod", en: "Source Code" },
                    url: "https://github.com/karatasbora/arc"
                }
            ],
            role: { tr: "arc", en: "arc – AI-Powered Educational Material Generator" },
            company: { tr: "Yapay Zeka Destekli Materyal Tasarımı", en: "Full Stack Developer & LXD Lead" },
            date: { tr: "2026", en: "2026" },
            location: { tr: "karatasbora.github.io/arc", en: "karatasbora.github.io/arc" },
            desc: {
                tr: "React 19 ve Google Gemini API kullanarak CEFR uyumlu çalışma kağıtlarını özerk biçimde üreten, yapay zekâ yerel (AI-native) bir eğitim aracı geliştirdim. Proje, deterministik JSON çıktıları güvence altına almak için gelişmiş prompt mühendisliği tekniklerini sergiliyor; böylece ayarlanabilir \"scaffolding\" ve belirli pedagojik odaklar gibi özellikler mümkün hale geliyor. İstemci tarafında çalışan, özel geliştirilmiş bir PDF motoru (jsPDF) sayesinde dinamik içerikler herhangi bir backend bağımlılığı olmadan profesyonel, sınıf kullanımına hazır materyallere dönüştürülüyor. Tüm bunlar, öğretmen verimliliğini ve eğitime erişilebilirliği artırmayı amaçlayan modern \"Zinc temalı\" bir kullanıcı arayüzü içinde sunuluyor.",
                en: "Engineered an AI-native educational tool using React 19 and the Google Gemini API to autonomously generate CEFR-aligned worksheets. Mastered advanced prompt engineering to secure deterministic JSON outputs, enabling dynamic scaffolding and specific pedagogical focus adjustments. Built a custom client-side PDF engine (jsPDF) to render professional, classroom-ready handouts instantly, eliminating backend dependencies and enhancing teacher productivity. Delivered a modern UI focused on reducing educator workload and increasing resource accessibility.",
            }
        },
    ],

    // --- 7. EDUCATION ---
    education: [
        {
            id: "edu-elt",
            degree: { tr: "İngilizce Öğretmenliği", en: "English Language Teaching" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Pedagoji, öğretim teknolojileri ve öğrenen merkezli öğretim yaklaşımlarına akademik olarak odaklandım. Geleneksel eğitim yöntemlerini çağdaş EdTech araçlarıyla bütünleştiren projeler geliştirdim.",
                en: "Focused academically on pedagogy, instructional technologies, and learner-centered teaching methodologies. Developed projects integrating traditional educational approaches with contemporary EdTech tools."
            }
        },
        {
            id: "edu-erasmus",
            degree: { tr: "Anglo-Amerikan Çalışmaları", en: "Anglo-American Studies" },
            school: { tr: "Universidade de Coimbra", en: "Universidade de Coimbra" },
            date: { tr: "ERASMUS+", en: "ERASMUS+" },
            location: { tr: "COIMBRA, PORTEKİZ", en: "COIMBRA, PORTUGAL" },
            desc: {
                tr: "Kültürlerarası iletişim ve küresel vatandaşlık yetkinlikleri geliştirdim. Akademik hareketlilik yoluyla uluslararası eğitim sistemlerine karşılaştırmalı bir bakış kazandım.",
                en: "Developed intercultural communication and global citizenship competencies. Gained comparative insight into international education systems through academic mobility."
            }
        },
        {
            id: "edu-econ",
            degree: { tr: "İktisat (İngilizce)", en: "Economics (English)" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "UZAKTAN EĞİTİM", en: "REMOTE LEARNING" },
            desc: {
                tr: "Eğitim politikası ve kalkınma bağlamlarıyla ilişkili sistem düşüncesi, veri okuryazarlığı ve analitik karar verme süreçlerine odaklanan devam eden çalışmalar.",
                en: "Ongoing studies with emphasis on systems thinking, data literacy, and analytical decision-making processes relevant to education policy and development contexts."
            }
        }
    ],

    languages: [
        {
            name: { tr: "TÜRKÇE", en: "TURKISH" },
            level: { tr: "Ana Dili / Editoryal Hakimiyet", en: "Native / Editorial Proficiency" }
        },
        {
            name: { tr: "İNGİLİZCE", en: "ENGLISH" },
            level: { tr: "Tam Profesyonel / C2 (Akademik)", en: "Full Professional / C2 (Academic)" }
        },
        {
            name: { tr: "PORTEKİZCE", en: "PORTUGUESE" },
            level: { tr: "Temel Kültürel Aşinalık", en: "Basic Cultural Familiarity" }
        }
    ],

    // --- 8. MASTER SKILLS LIST ---
    skills: [
        {
            category: { tr: "Teknoloji & YZ Yetkinlikleri", en: "Technology & AI Capabilities" },
            items: [
                {
                    tr: "Yaratıcı YZ ve LLM'ler",
                    en: "Gebnerative AI & LLMs",
                    targets: ["job-editor"]
                },
                {
                    tr: "Prompt Mühendisliği",
                    en: "Prompt Engineering",
                    targets: ["proj-arc"]
                },
                {
                    tr: "Web Geliştirme (React/API)",
                    en: "Web Development (React/API)",
                    targets: ["proj-arc"]
                },
                {
                    tr: "LMS & CMS Yönetimi",
                    en: "LMS & CMS Management",
                    targets: ["job-editor"]
                },
                {
                    tr: "Dijital Dönüşüm",
                    en: "Digital Transformation",
                    targets: ["job-editor"]
                }
            ]
        },
        {
            category: { tr: "Pedagoji & Tasarımı", en: "Pedagogy & Design" },
            items: [
                {
                    tr: "Öğretim Tasarımı & LXD",
                    en: "Instructional Design & LXD",
                    targets: ["job-teacher", "job-editor", "edu-elt"]
                },
                {
                    tr: "Pedagoji",
                    en: "Pedagogy",
                    targets: ["edu-elt"]
                },
                {
                    tr: "Evrensel Tasarım / Erişilebilirlik",
                    en: "Universal Design / Accessibility",
                    targets: ["job-editor", "proj-arc"]
                },
                {
                    tr: "EdTech Entegrasyonu",
                    en: "EdTech Integration",
                    targets: ["edu-elt"]
                },
                {
                    tr: "Program Geliştirme",
                    en: "Curriculum Development",
                    targets: ["job-teacher", "edu-elt"]
                },
                {
                    tr: "Oyunifikasyon",
                    en: "Gamification",
                    targets: ["job-teacher"]
                },
                {
                    tr: "21. Yüzyıl Yetkinlikleri",
                    en: "21st Century Skills",
                    targets: ["job-teacher"]
                }
            ]
        },
        {
            category: { tr: "Analiz & Strateji", en: "Analysis & Strategy" },
            items: [
                {
                    tr: "Sistem Düşüncesi",
                    en: "Systems Thinking",
                    targets: ["edu-econ"]
                },
                {
                    tr: "Veri Okuryazarlığı",
                    en: "Data Literacy",
                    targets: ["edu-econ"]
                }
            ],
        },
        {
            category: { tr: "Çeviklik & İletişim", en: "Agility & Communication" },
            items: [
                {
                    tr: "Kültürlerarası İletişim",
                    en: "Intercultural Communication",
                    targets: ["edu-erasmus"]
                },
                {
                    tr: "İşbirliği",
                    en: "Collaboration",
                    targets: ["job-editor"]
                },
                {
                    tr: "Adaptasyon & Küreselleşme",
                    en: "Adaptation & Globalization",
                    targets: ["edu-erasmus"]
                },
            ]
        }
    ],
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = resumeData;
}
