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
            tr: "Yenilikçi Eğitim Uzmanı & Öğretim Teknoloğu | YZ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
            en: "Innovative Education Specialist & Instructional Technologist | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        jobTitleShort: {
            tr: "Yenilikçi Eğitim Uzmanı & Öğretim Teknoloğu",
            en: "Innovative Education Specialist & Instructional Technologist"
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
            tr: "Yenilikçi Eğitim Uzmanı & Öğretim Teknoloğu | YZ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
            en: "Innovative Education Specialist & Instructional Technologist | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        about: {
            tr: "Pedagoji ile yapay zekâ arasındaki bağı güçlendirmeyi amaçlayan ileri görüşlü bir eğitimciyim. Yapay zekâ destekli öğrenme deneyimleri ve erişilebilir dijital içerikler geliştirme konusunda uzmanlaşmış, insan odaklı tasarım anlayışını temel alan bir yaklaşım benimsiyorum. React ve Gemini API ile tam kapsamlı eğitim araçları geliştirme, prompt engineering ve öğrenme teknolojilerini pedagojik prensiplerle bütünleştirme alanlarında güçlü bir deneyime sahibim. Teknolojiyi, eleştirel düşünmeyi teşvik eden, kapsayıcı ve küresel vatandaşlığı destekleyen öğrenme ortamları oluşturmak için stratejik ve bilinçli bir biçimde kullanmayı hedefliyorum.",
            en: "I am a forward-thinking educator dedicated to strengthening the relationship between pedagogy and artificial intelligence. I specialize in developing AI-supported learning experiences and accessible digital content, guided by a human-centered design philosophy. With strong experience in full-stack educational tool development using React and the Gemini API, as well as prompt engineering and the integration of learning technologies with pedagogical principles, I work to create inclusive learning environments that foster critical thinking and global citizenship. My goal is to leverage technology thoughtfully and strategically to empower learners and enhance educational impact."
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
                tr: "Üniversite platformlarında kullanılan öğretim materyallerini erişilebilir ve etkileşimli dijital içeriklere dönüştürüyorum. Üretken yapay zekâ araçlarını editoryal süreçlere entegre ederek içerik üretiminde verimlilik, tutarlılık ve kaliteyi artırmaya odaklanıyorum. Disiplinlerarası ekiplerle birlikte çalışarak hem erişilebilirlik standartlarına uygun hem de farklı öğrenen profillerine hitap eden materyaller geliştirilmesine katkı sağlıyorum.",
                en: "I transform instructional materials into accessible and interactive digital learning resources used across university platforms. I integrate generative AI tools into editorial workflows to enhance efficiency, consistency, and quality in content production. Working collaboratively with interdisciplinary teams, I contribute to the creation of materials that meet accessibility standards and support diverse learner needs."
            }
        },
        {
            id: "job-teacher",
            role: { tr: "İngilizce Öğretmeni", en: "English Teacher" },
            company: { tr: "Yerinde · Staj | T.C. Millî Eğitim Bakanlığı · Gülay Kanatlı Ortaokulu", en: "On-site · Internship | Ministry of National Education · Gülay Kanatlı Secondary School" },
            date: { tr: "EYLÜL 2025 - ARALIK 2025", en: "SEP 2025 - DEC 2025" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Ezbere dayalı öğretim yerine iletişim, iş birliği ve eleştirel düşünme gibi 21. yüzyıl becerilerine odaklanan öğrenen merkezli bir müfredat uyguladım. Sınıf içi motivasyonu artıran oyunlaştırma temelli yöntemler kullanarak öğrencilerin derse katılımını güçlendirdim ve farklı öğrenci ihtiyaçlarına duyarlı, kapsayıcı bir öğrenme ortamı oluşturdum.",
                en: "I implemented a learner-centered curriculum that emphasized 21st-century skills such as communication, collaboration, and critical thinking rather than rote memorization. By applying gamified classroom management strategies, I significantly increased student engagement and motivation while fostering an inclusive learning environment that supported diverse learners and encouraged real-world language use.",
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
            role: { tr: "arc – Yapay Zekâ Destekli Eğitim Materyali Üretici", en: "arc – AI-Powered Educational Material Generator" },
            company: { tr: "Full Stack Geliştirici", en: "Full Stack Developer" },
            date: { tr: "2026", en: "2026" },
            location: { tr: "karatasbora.github.io/arc", en: "karatasbora.github.io/arc" },
            desc: {
                tr: "Bu proje, CEFR uyumlu çalışma kâğıtlarını özerk biçimde üretebilen, React 19 ve Google Gemini API üzerine inşa edilmiş yenilikçi bir eğitim aracıdır. Bu projede deterministik JSON çıktıları güvence altına almak için ileri düzey prompt engineering tekniklerini kullandım ve öğretmenlerin pedagojik odağı dinamik biçimde düzenleyebilmelerine imkân tanıyan bir yapı geliştirdim. jsPDF tabanlı özel bir istemci tarafı PDF motoru tasarlayarak arka uç bağımlılığını ortadan kaldırdım, öğretmen iş yükünü azalttım ve sınıfa hazır materyallerin hızlı üretimini mümkün kıldım. Projenin kullanıcı arayüzünü de öğretmen verimliliğini artıracak şekilde modern ve erişilebilir bir tasarım anlayışıyla geliştirdim.",
                en: "This project is an innovative educational tool built with React 19 and the Google Gemini API, designed to autonomously produce CEFR-aligned worksheets. In this project, I employed advanced prompt engineering techniques to ensure deterministic JSON outputs, enabling dynamic scaffolding and flexible pedagogical adjustments. I developed a custom client-side PDF engine using jsPDF, eliminating backend dependencies and allowing teachers to instantly generate professional, classroom-ready materials. The user interface was designed with a focus on usability, accessibility, and reducing teacher workload, ultimately improving productivity and resource accessibility.",
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
                tr: "Pedagojik yaklaşımlar, öğretim teknolojileri ve öğrenen merkezli öğretim yöntemleri üzerine yoğunlaştım. Bu süreçte geleneksel eğitim anlayışını güncel eğitim teknolojileriyle birleştiren projeler geliştirdim.",
                en: "I focused academically on pedagogy, instructional technologies, and learner-centered teaching methodologies, developing projects that blended traditional education with contemporary EdTech tools."
            }
        },
        {
            id: "edu-erasmus",
            degree: { tr: "Anglo-Amerikan Çalışmaları", en: "Anglo-American Studies" },
            school: { tr: "Universidade de Coimbra", en: "Universidade de Coimbra" },
            date: { tr: "ERASMUS+", en: "ERASMUS+" },
            location: { tr: "COIMBRA, PORTEKİZ", en: "COIMBRA, PORTUGAL" },
            desc: {
                tr: "Bu program, kültürlerarası iletişim becerilerimi geliştirmeme, küresel vatandaşlık perspektifi kazanmama ve uluslararası eğitim sistemlerine dair karşılaştırmalı bir bakış açısı edinmeme olanak sağladı.",
                en: "This program strengthened my intercultural communication skills, broadened my global citizenship perspective, and provided comparative insight into international education systems"
            }
        },
        {
            id: "edu-econ",
            degree: { tr: "İktisat (İngilizce)", en: "Economics (English)" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "UZAKTAN EĞİTİM", en: "REMOTE LEARNING" },
            desc: {
                tr: "Devam eden eğitimim ise sistem düşüncesi, veri okuryazarlığı ve eğitim politikalarına ilişkin analitik bakış geliştirmeyi destekleyen teorik ve pratik bir temel oluşturuyor.",
                en: "My ongoing studies further support my academic profile through systems thinking, data literacy, and analytical approaches relevant to education policy and development."
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
                    tr: "Öğrenme ve Gelişim için Yaratıcı Yapay Zeka",
                    en: "Generative AI for Learning and Development",
                    targets: ["job-editor"]
                },
                {
                    tr: "Prompt Mühendisliği",
                    en: "Prompt Engineering",
                    targets: ["proj-arc"]
                },
                {
                    tr: "Web Geliştirme",
                    en: "Web Development",
                    targets: ["proj-arc"]
                },
                {
                    tr: "Öğrenme Yönetim Sistemleri",
                    en: "Learning Management Systems",
                    targets: ["job-editor"]
                },
                {
                    tr: "İçerik Yönetim Sistemleri",
                    en: "Content Management Systems",
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
                    tr: "Öğretim Tasarımı",
                    en: "Instructional Design",
                    targets: ["job-teacher", "job-editor", "edu-elt"]
                },
                {
                    tr: "Pedagoji",
                    en: "Pedagogy",
                    targets: ["edu-elt"]
                },
                {
                    tr: "Yabancı Dil olarak İngilizce Öğretimi",
                    en: "Teaching English as a Foreign Language",
                    targets: ["job-teacher", "proj-arc"]
                },
                {
                    tr: "Evrensel Tasarım",
                    en: "Universal Design",
                    targets: ["job-editor", "proj-arc"]
                },
                {
                    tr: "Erişilebilirlik",
                    en: "Accessibility",
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
                    tr: "Oyunlaştırma",
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
            category: { tr: "Kişilerarası Beceriler", en: "Interpersonal Skills" },
            items: [
                {
                    tr: "Kültürlerarası İletişim",
                    en: "Intercultural Communication",
                    targets: ["edu-erasmus"]
                },
                {
                    tr: "Takım Çalışması",
                    en: "Teamwork",
                    targets: ["job-editor"]
                },
                {
                    tr: "Uyumlu",
                    en: "Adaptable",
                    targets: ["edu-erasmus"]
                },
                {
                    tr: "Küreselleşme",
                    en: "Globalization",
                    targets: ["edu-erasmus"]
                },
            ]
        }
    ],
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = resumeData;
}