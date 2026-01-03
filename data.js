// data.js

const resumeData = {
    // --- 1. CONFIGURATION: THE LAYOUT ---
    // This array controls the order and type of sections. 
    // To add a section, simply add it here and define its data below.
    structure: [
        { type: 'text', titleKey: 'about', dataKey: 'profile.about' },
        { type: 'list', titleKey: 'experience', dataKey: 'experience' },
        { type: 'list', titleKey: 'education', dataKey: 'education' },
        
        // 🟢 TEST: Adding Certifications simply requires this line + the data below
        { type: 'list', titleKey: 'certifications', dataKey: 'certifications' }, 
        
        { type: 'tags', titleKey: 'skills', dataKey: 'skills' },
        { type: 'grid', titleKey: 'languages', dataKey: 'languages' }
    ],

    // --- 2. UI LABELS ---
    ui: {
        about: { tr: "Hakkında", en: "About" },
        experience: { tr: "Deneyim", en: "Experience" },
        education: { tr: "Eğitim", en: "Education" },
        skills: { tr: "Teknik Yetkinlikler & Uzmanlıklar", en: "Technical Skills & Specializations" },
        languages: { tr: "Diller", en: "Languages" },
        certifications: { tr: "Sertifikalar", en: "Certifications" }, // New Label
        print: { tr: "PDF", en: "PDF" },

        documentTitle: { 
            tr: "Bora Karataş - Özgeçmiş", 
            en: "Bora Karataş - Resume" 
        },
        seoDesc: {
            tr: "Eğitim Uzmanı & İçerik Editörü | Yapay Zekâ Destekli Öğretim Tasarımı | ELT · EdTech · Erişilebilir & İnsan Merkezli Eğitim",
            en: "Education Specialist & Content Editor | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        jobTitleShort: { 
            tr: "Eğitim Uzmanı & İçerik Editörü", 
            en: "Education Specialist & Content Editor" 
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

    // --- 4. DATA SECTIONS ---
    profile: {
        name: "Bora Karataş",
        title: {
            tr: "Eğitim Uzmanı & İçerik Editörü | Yapay Zekâ Destekli Öğretim Tasarımı | ELT · EdTech · Accessible & Human-Centered Education",
            en: "Education Specialist & Content Editor | AI-Supported Instructional Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        about: {
            tr: "Yapay zekâ ve eğitim teknolojileriyle desteklenen, erişilebilir ve insan odaklı öğrenme deneyimlerinin tasarımı konusunda uzmanlaşmış bir eğitim profesyoneliyim. Yükseköğretim ve kamu eğitimi bağlamlarında içerik stratejisi, öğretim tasarımı ve dijital dönüşüm alanlarında deneyime sahibim. Küresel sürdürülebilirlik ve eşitlik hedefleriyle uyumlu, kapsayıcı, etik ve öğrenen merkezli eğitimi ilerletmeye kararlıyım. Teknolojiyi, kendi başına bir amaç olarak değil; keşif, eleştirel düşünme ve yaşam boyu öğrenmeyi mümkün kılan bir araç olarak ele alırım.",
            en: "Education professional specializing in the design of accessible, human-centered learning experiences supported by artificial intelligence and educational technologies. Experienced in content strategy, instructional design, and digital transformation within higher education and public schooling contexts. Committed to advancing inclusive, ethical, and learner-centered education aligned with global sustainability and equity goals. Approaches technology as an enabling tool for exploration, critical thinking, and lifelong learning rather than as an end in itself."
        }
    },

    experience: [
        {
            role: { tr: "İçerik Editörü", en: "Content Editor" },
            company: { tr: "Hibrit · Yarı zamanlı | Anadolu Üniversitesi · Öğrenme Teknolojileri Ar-Ge Birimi", en: "Hybrid · Part-time | Anadolu University · Learning Technologies R&D Unit" },
            date: { tr: "ARALIK 2022 - HALEN", en: "DEC 2022 - PRESENT" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Kurumsal dijital dönüşüm girişimlerine katkı sağlayarak durağan öğretim materyallerinin etkileşimli ve kapsayıcı dijital öğrenme deneyimlerine dönüştürülmesi üzerinde çalışıyorum. Evrensel tasarım ve erişilebilirlik ilkelerine bağlı kalarak, editoryal verimliliği, tutarlılığı ve ölçeklenebilirliği artırmak için içerik geliştirme iş akışlarına Üretken Yapay Zekâ (LLM) araçlarını entegre ediyorum. Çok disiplinli ekiplerle iş birliği içinde çalışarak dijital platformlarda öğrenen etkileşimini artırıyor ve farklı öğrenme ihtiyaçlarını destekliyorum.",
                en: "Contribute to institutional digital transformation initiatives aimed at converting static instructional materials into interactive and inclusive digital learning experiences. Integrate Generative AI (LLM) tools into content development workflows to improve editorial efficiency, consistency, and scalability while adhering to universal design and accessibility principles. Collaborate with multidisciplinary teams to enhance learner engagement and support diverse learning needs across digital platforms."
            },
            tags: {
                tr: ["İçerik Stratejisi", "Yapay Zekâ Prompt Mühendisliği", "Öğrenme Yönetim Sistemleri (LMS)"],
                en: ["Content Strategy", "AI Prompt Engineering", "Learning Management Systems"]
            }
        },
        {
            role: { tr: "İngilizce Öğretmeni", en: "English Teacher" },
            company: { tr: "Yerinde · Staj | T.C. Millî Eğitim Bakanlığı · Gülay Kanatlı Ortaokulu", en: "On-site · Internship | Ministry of National Education · Gülay Kanatlı Secondary School" },
            date: { tr: "EYLÜL 2025 - ARALIK 2025", en: "SEP 2025 - DEC 2025" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Ezbere dayalı dilbilgisi öğretimi yerine iletişim, eleştirel düşünme ve gerçek yaşamda dil kullanımını merkeze alan öğrenen odaklı bir İngilizce öğretim programı uyguladım. Dersleri 21. yüzyıl yetkinlikleriyle (iletişim, iş birliği, yaratıcılık ve eleştirel düşünme) uyumlu şekilde tasarladım. Öğrenci motivasyonunu, katılımını ve kapsayıcılığı artırmak amacıyla sınıf yönetiminde oyunlaştırma stratejileri kullandım.",
                en: "Implemented a learner-centered English language curriculum emphasizing communication, critical thinking, and real-world language use rather than rote grammar instruction. Designed lessons aligned with 21st-century competencies (communication, collaboration, creativity, and critical thinking). Applied gamification strategies to classroom management to increase student motivation, participation, and inclusivity."
            },
            tags: {
                tr: ["Öğretim Tasarımı", "Sınıf Yönetimi", "Yabancı Dil olarak İngilizce Öğretimi"],
                en: ["Instructional Design", "Classroom Management", "Teaching English as a Foreign Language"]
            }
        }
    ],

    education: [
        {
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

    // 🟢 NEW DATA SECTION
    certifications: [
        {
            role: { tr: "Sertifikalı Scrum Master", en: "Certified Scrum Master" },
            company: { tr: "Scrum Alliance", en: "Scrum Alliance" },
            date: { tr: "2023", en: "2023" },
            location: { tr: "ONLINE", en: "ONLINE" },
            desc: { 
                tr: "Çevik proje yönetimi ve takım liderliği konusunda uluslararası geçerliliği olan sertifika.",
                en: "Internationally recognized certification in Agile project management and team leadership." 
            }
        }
    ],

    skills: {
        tr: [
            "Eğitimde Yapay Zekâ", "Eğitsel İçerik için Prompt Mühendisliği", "Öğretim Tasarımı & Öğrenme Deneyimi Tasarımı (LXD)", 
            "Öğrenme Yönetim Sistemleri (LMS)", "İçerik Yönetim Sistemleri", 
            "Dijital Arşivleme & Bilgi Organizasyonu", "Akademik Araştırma & Analiz", "Sistem Düşüncesi"
        ],
        en: [
            "Artificial Intelligence in Education", "Prompt Engineering for Educational Content", "Instructional Design & Learning Experience Design (LXD)", 
            "Learning Management Systems (LMS)", "Content Management Systems (CMS)", "Digital Archiving & Knowledge Organization", 
            "Academic Research & Analysis", "Systems Thinking"
        ]
    },

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
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = resumeData;
}
