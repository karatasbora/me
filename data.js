// data.js

const resumeData = {
    // --- 1. CONFIGURATION: THE LAYOUT ---
    structure: [
        { type: 'text', titleKey: 'about', dataKey: 'profile.about' },
        { type: 'list', titleKey: 'experience', dataKey: 'experience' },
        { type: 'list', titleKey: 'education', dataKey: 'education' },
        { type: 'grid', titleKey: 'languages', dataKey: 'languages' },
        { type: 'tags', titleKey: 'skills', dataKey: 'skills' }, 
    ],

    // --- 2. UI LABELS ---
    ui: {
        about: { tr: "Hakkında", en: "About" },
        experience: { tr: "Deneyim", en: "Experience" },
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

    // --- 4. PROFILE SECTION ---
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

    // --- 5. EXPERIENCE (With IDs, No Tags) ---
    experience: [
        {
            id: "job-editor", // Unique ID
            role: { tr: "İçerik Editörü", en: "Content Editor" },
            company: { tr: "Hibrit · Yarı zamanlı | Anadolu Üniversitesi · Öğrenme Teknolojileri Ar-Ge Birimi", en: "Hybrid · Part-time | Anadolu University · Learning Technologies R&D Unit" },
            date: { tr: "ARALIK 2022 - HALEN", en: "DEC 2022 - PRESENT" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Kurumsal dijital dönüşüm girişimlerine katkı sağlayarak durağan öğretim materyallerinin etkileşimli ve kapsayıcı dijital öğrenme deneyimlerine dönüştürülmesi üzerinde çalışıyorum. Evrensel tasarım ve erişilebilirlik ilkelerine bağlı kalarak, editoryal verimliliği, tutarlılığı ve ölçeklenebilirliği artırmak için içerik geliştirme iş akışlarına Üretken Yapay Zekâ (LLM) araçlarını entegre ediyorum. Çok disiplinli ekiplerle iş birliği içinde çalışarak dijital platformlarda öğrenen etkileşimini artırıyor ve farklı öğrenme ihtiyaçlarını destekliyorum.",
                en: "Contribute to institutional digital transformation initiatives aimed at converting static instructional materials into interactive and inclusive digital learning experiences. Integrate Generative AI (LLM) tools into content development workflows to improve editorial efficiency, consistency, and scalability while adhering to universal design and accessibility principles. Collaborate with multidisciplinary teams to enhance learner engagement and support diverse learning needs across digital platforms."
            }
        },
        {
            id: "job-teacher", // Unique ID
            role: { tr: "İngilizce Öğretmeni", en: "English Teacher" },
            company: { tr: "Yerinde · Staj | T.C. Millî Eğitim Bakanlığı · Gülay Kanatlı Ortaokulu", en: "On-site · Internship | Ministry of National Education · Gülay Kanatlı Secondary School" },
            date: { tr: "EYLÜL 2025 - ARALIK 2025", en: "SEP 2025 - DEC 2025" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Ezbere dayalı dilbilgisi öğretimi yerine iletişim, eleştirel düşünme ve gerçek yaşamda dil kullanımını merkeze alan öğrenen odaklı bir İngilizce öğretim programı uyguladım. Dersleri 21. yüzyıl yetkinlikleriyle (iletişim, iş birliği, yaratıcılık ve eleştirel düşünme) uyumlu şekilde tasarladım. Öğrenci motivasyonunu, katılımını ve kapsayıcılığı artırmak amacıyla sınıf yönetiminde oyunlaştırma stratejileri kullandım.",
                en: "Implemented a learner-centered English language curriculum emphasizing communication, critical thinking, and real-world language use rather than rote grammar instruction. Designed lessons aligned with 21st-century competencies (communication, collaboration, creativity, and critical thinking). Applied gamification strategies to classroom management to increase student motivation, participation, and inclusivity."
            }
        }
    ],

    // --- 6. EDUCATION (With IDs, No Tags) ---
    education: [
        {
            id: "edu-elt", // Unique ID
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

    // --- 7. MASTER SKILLS LIST (Reverse Logic) ---
    // Defines the skill ONCE, then targets the IDs where it should appear.
    skills: [
        {
            category: { tr: "Eğitim Teknolojileri & YZ", en: "EdTech & AI" },
            items: [
                {
                    tr: "Eğitsel İçerik için Prompt Mühendisliği", 
                    en: "Prompt Engineering for Educational Content", // Restored full text
                    targets: ["job-editor"]
                },
                {
                    tr: "Öğrenme Yönetim Sistemleri (LMS)", 
                    en: "Learning Management Systems (LMS)",
                    targets: ["job-editor"]
                },
                {
                    tr: "İçerik Yönetim Sistemleri (CMS)", 
                    en: "Content Management Systems (CMS)",
                    targets: ["job-editor"]
                },
                {
                    tr: "Eğitimde Yapay Zekâ", 
                    en: "Artificial Intelligence in Education", // Restored full text
                    targets: ["edu-elt", "job-editor"]
                },
                {
                    tr: "Eğitim Teknolojileri", 
                    en: "Educational Technology",
                    targets: ["edu-elt"]
                }
            ]
        },
        {
            category: { tr: "Pedagoji & Tasarım", en: "Pedagogy & Design" },
            items: [
                {
                    tr: "Öğretim Tasarımı & LXD", 
                    en: "Instructional Design & LXD",
                    targets: ["job-teacher", "job-editor"]
                },
                {
                    tr: "Sınıf Yönetimi", 
                    en: "Classroom Management",
                    targets: ["job-teacher"]
                },
                {
                    tr: "Yabancı Dil olarak İngilizce Öğretimi", 
                    en: "Teaching English as a Foreign Language", // Restored full text
                    targets: ["job-teacher"]
                }
            ]
        },
        {
            category: { tr: "Analiz & Strateji", en: "Analysis & Strategy" },
            items: [
                {
                    tr: "Dijital Arşivleme & Bilgi Organizasyonu", 
                    en: "Digital Archiving & Knowledge Organization", // Restored full text
                    targets: ["job-editor"]
                },
                {
                    tr: "Sistem Düşüncesi", 
                    en: "Systems Thinking",
                    targets: ["edu-econ"]
                },
                {
                    tr: "Akademik Araştırma & Analiz", 
                    en: "Academic Research & Analysis",
                    targets: ["edu-econ"]
                },
                {
                    tr: "Kültürlerarası İletişim", 
                    en: "Intercultural Communication",
                    targets: ["edu-erasmus"]
                }
            ]
        }
    ],
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = resumeData;
}
