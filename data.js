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
            en: "Education Specialist & Content Editor | AI-Supported Learning Design | ELT · EdTech · Accessible & Human-Centered Education"
        },
        about: {
            tr: "Öğrenmenin bilgi depolamaktan, beceri üretmeye evrildiği dijital çağda, yapay zeka destekli içerik stratejileri geliştiriyorum. Eğitimi daha insani ve erişilebilir kılmak adına; teknolojiyi bir amaç değil, keşfetme sürecini özgürleştiren bir araç olarak kullanıyorum. Performans kaygısından uzak, modern ve analitik bir öğrenme vizyonu sunuyorum.",
            en: "Education professional specializing in the design of accessible, human-centered learning experiences supported by artificial intelligence and educational technologies. Experienced in content strategy, instructional design, and digital transformation within higher education and public schooling contexts. Committed to advancing inclusive, ethical, and learner-centered education aligned with global sustainability and equity goals. Approaches technology as an enabling tool for exploration, critical thinking, and lifelong learning rather than as an end in itself."
        }
    },

    experience: [
        {
            role: { tr: "İçerik Editörü", en: "Content Editor" },
            company: { tr: "Anadolu Üniversitesi | Öğrenme Teknolojileri Ar-Ge Birimi", en: "Anadolu University | Learning Technologies R&D Unit" },
            date: { tr: "ARALIK 2022 - HALEN", en: "DEC 2022 - PRESENT" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Statik ders materyallerini dijital deneyimlere dönüştüren kapsamlı bir dijital dönüşüm sürecinin parçasıyım. İçerik stratejisine Generative AI (LLM) araçlarını entegre ederek editöryal verimliliği artırırken evrensel tasarım ilkeleriyle erişilebilirliği ve öğrenci etkileşimini optimize ediyorum. Teknolojiyi sadece bir araç olarak değil, öğrenme sürecini özgürleştiren bir unsur olarak konumluyorum.",
                en: "Contribute to institutional digital transformation initiatives aimed at converting static instructional materials into interactive and inclusive digital learning experiences. Integrate Generative AI (LLM) tools into content development workflows to improve editorial efficiency, consistency, and scalability while adhering to universal design and accessibility principles. Collaborate with multidisciplinary teams to enhance learner engagement and support diverse learning needs across digital platforms."
            },
            tags: {
                tr: ["İçerik Stratejisi", "Yapay Zeka İstemleri", "Eğitim Yönetimi Sistemleri"],
                en: ["Content Strategy", "AI Prompt Engineering", "Learning Management Systems"]
            }
        },
        {
            role: { tr: "İngilizce Öğretmeni (Stajyer)", en: "English Teacher (Intern)" },
            company: { tr: "T.C. Millî Eğitim Bakanlığı | Gülay Kanatlı Ortaokulu", en: "Ministry of National Education | Gülay Kanatlı Secondary School" },
            date: { tr: "EYLÜL 2025 - ARALIK 2025", en: "SEP 2025 - DEC 2025" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Ezbere dayalı klasik gramer öğretimi yerine, dili aktif bir iletişim aracı olarak konumlandıran öğrenci merkezli bir müfredat uyguladım. Ders tasarımlarımı sadece dil bilgisi odaklı değil, 21. yüzyıl becerileri (4C) ve eleştirel düşünme yetisini geliştirecek şekilde kurguladım. Sınıf yönetiminde oyunlaştırma (gamification) tekniklerini stratejik olarak kullanarak pasif öğrencilerin motivasyonunu yükselttim ve derse katılım oranlarını maksimize ettim.",
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
            degree: { tr: "İngilizce Öğretmenliği", en: "English Language Teaching (ELT)" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "ESKİŞEHİR, TÜRKİYE", en: "ESKISEHIR, TURKEY" },
            desc: {
                tr: "Pedagoji ve öğretim teknolojileri üzerine odaklandım. Geleneksel yaklaşımları modern EdTech araçlarıyla harmanlayan projeler geliştirdim.",
                en: "Academic focus on pedagogy, instructional technologies, and learner-centered teaching methodologies. Developed projects integrating traditional educational approaches with contemporary EdTech tools."
            }
        },
        {
            degree: { tr: "Anglo-Amerikan Çalışmaları", en: "Anglo-American Studies" },
            school: { tr: "Universidade de Coimbra", en: "Universidade de Coimbra" },
            date: { tr: "ERASMUS+", en: "ERASMUS+" },
            location: { tr: "COIMBRA, PORTEKİZ", en: "COIMBRA, PORTUGAL" },
            desc: {
                tr: "Kültürlerarası iletişim ve adaptasyon yetkinlikleri kazandım. Global eğitim sistemlerini yerinde analiz etme fırsatı buldum.",
                en: "Developed intercultural communication and global citizenship competencies. Gained comparative insight into international education systems through academic mobility."
            }
        },
        {
            degree: { tr: "İktisat (İngilizce)", en: "Economics (English)" },
            school: { tr: "Anadolu Üniversitesi", en: "Anadolu University" },
            date: { tr: "Lisans Derecesi", en: "Bachelor's Degree" },
            location: { tr: "UZAKTAN EĞİTİM", en: "REMOTE LEARNING" },
            desc: {
                tr: "Sistem düşüncesi, veri okuryazarlığı ve analitik karar alma süreçleri üzerine eğitim alıyorum.",
                en: "Ongoing studies with emphasis on systems thinking, data literacy, and analytical decision-making processes relevant to education policy and development contexts."
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
