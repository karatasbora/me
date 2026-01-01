// --- 1. UI LABELS (Static Interface Text) ---
// These are text elements that are part of the layout, not your resume content.
const UI_LABELS = {
    about: { tr: "Hakkında", en: "About" },
    experience: { tr: "Deneyim", en: "Experience" },
    education: { tr: "Eğitim", en: "Education" },
    skills: { tr: "Teknik Yetkinlikler & Uzmanlıklar", en: "Technical Skills & Specializations" },
    languages: { tr: "Diller", en: "Languages" },
    print: { tr: "PDF", en: "PDF" }
};

const dom = {
    html: document.documentElement,
    name: document.getElementById('p-name'),
    title: document.getElementById('p-title'),
    location: document.getElementById('p-location'),
    email: document.getElementById('link-email'),
    linkedin: document.getElementById('link-linkedin'),
    aboutHead: document.getElementById('head-about'),
    aboutPara: document.getElementById('p-about'),
    expHead: document.getElementById('head-experience'),
    expList: document.getElementById('experience-list'),
    eduHead: document.getElementById('head-education'),
    eduList: document.getElementById('education-list'),
    skillsHead: document.getElementById('head-skills'),
    skillsList: document.getElementById('skills-list'),
    langsHead: document.getElementById('head-languages'),
    langsList: document.getElementById('languages-list'),
    btnPrint: document.querySelector('#btn-print span'),
    btnTr: document.getElementById('btn-tr'),
    btnEn: document.getElementById('btn-en')
};

// --- 2. SEO & METADATA MANAGEMENT ---
function updateSEO(lang) {
    const seoData = {
        tr: {
            title: "Bora Karataş - Özgeçmiş",
            desc: "İçerik Editörü ve Eğitimci. Yapay Zeka destekli, erişilebilir öğrenme deneyimleri tasarlıyor. Anadolu Üniversitesi Ar-Ge Birimi.",
            jobTitle: "İçerik Editörü"
        },
        en: {
            title: "Bora Karataş - Resume",
            desc: "Content Editor & Educator specializing in AI-Supported Learning Experiences. Instructional Design & EdTech Portfolio.",
            jobTitle: "Content Editor"
        }
    };

    const currentSEO = seoData[lang];

    // A. Update Title & Meta Description
    document.title = currentSEO.title;
    document.querySelector('meta[name="description"]').setAttribute('content', currentSEO.desc);

    // B. Update Open Graph (Social Media)
    document.querySelector('meta[property="og:title"]').setAttribute('content', currentSEO.title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', currentSEO.desc);

    // C. Update Twitter Card
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', currentSEO.title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', currentSEO.desc);

    // D. Update JSON-LD Schema (Structured Data for Google)
    try {
        const jsonLdScript = document.getElementById('json-ld');
        if (jsonLdScript) {
            const schema = JSON.parse(jsonLdScript.textContent);
            schema.jobTitle = currentSEO.jobTitle;
            schema.description = currentSEO.desc;
            jsonLdScript.textContent = JSON.stringify(schema, null, 2);
        }
    } catch (e) {
        console.warn("JSON-LD update failed", e);
    }
}

// --- 3. HTML GENERATORS (Helper Functions) ---

// Generates the colorful skill tags
function createTagsHTML(tagsArray) {
    if (!tagsArray) return '';
    return tagsArray.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
}

// Generates the Language cards
function createLanguageHTML(languages, langKey) {
    return languages.map(langItem => `
        <div class="lang-item">
            <span class="lang-title">${langItem.name[langKey]}</span>
            <span class="lang-level">${langItem.level[langKey]}</span>
        </div>
    `).join('');
}

// Generates Job and Education blocks (reusable structure)
function createBlockHTML(item, langKey) {
    // Detect if it is a Job (role) or School (degree)
    const title = item.role ? item.role[langKey] : item.degree[langKey];
    const subTitle = item.company ? item.company[langKey] : item.school[langKey];
    
    // Optional Tags (only if they exist)
    const tagsHTML = item.tags ? `<div class="tags-wrapper">${createTagsHTML(item.tags[langKey])}</div>` : '';

    return `
    <div class="job-block">
        <div class="job-header">
            <span class="job-title">${title}</span>
            <span class="job-date">${item.date[langKey]}</span>
        </div>
        <div class="job-subheader">
            <span class="company">${subTitle}</span>
            <span class="location">${item.location[langKey]}</span>
        </div>
        <div class="job-content">
            <p>${item.desc[langKey]}</p>
            ${tagsHTML}
        </div>
    </div>`;
}

// --- 4. MAIN RENDER FUNCTION ---
function renderResume(lang) {
    // A. Update Global State & SEO
    updateSEO(lang);
    dom.html.lang = lang;

    // B. Header & Profile Info
    dom.name.textContent = resumeData.profile.name;
    dom.title.textContent = resumeData.profile.title[lang];
    dom.location.textContent = resumeData.meta.location[lang];
    
    // Contact Links
    dom.email.textContent = resumeData.meta.email;
    dom.email.href = `mailto:${resumeData.meta.email}`;
    dom.linkedin.textContent = resumeData.meta.linkedinLabel || "LinkedIn";
    dom.linkedin.href = resumeData.meta.linkedin;

    // C. UI Labels (Section Headers)
    dom.aboutHead.textContent = UI_LABELS.about[lang];
    dom.expHead.textContent = UI_LABELS.experience[lang];
    dom.eduHead.textContent = UI_LABELS.education[lang];
    dom.skillsHead.textContent = UI_LABELS.skills[lang];
    dom.langsHead.textContent = UI_LABELS.languages[lang];
    if (dom.btnPrint) dom.btnPrint.textContent = UI_LABELS.print[lang];

    // D. Dynamic List Rendering
    // Update About content
    dom.aboutPara.textContent = resumeData.profile.about[lang];

    // Batch update lists to minimize browser reflows
    dom.expList.innerHTML = resumeData.experience
        .map(job => createBlockHTML(job, lang))
        .join('');

    dom.eduList.innerHTML = resumeData.education
        .map(school => createBlockHTML(school, lang))
        .join('');

    dom.skillsList.innerHTML = createTagsHTML(resumeData.skills[lang]);

    dom.langsList.innerHTML = createLanguageHTML(resumeData.languages, lang);

    // E. UI State & Post-Processing
    dom.btnTr.setAttribute('aria-pressed', lang === 'tr');
    dom.btnEn.setAttribute('aria-pressed', lang === 'en');
    
    // Apply staggered animation delays to skill tags
    const skillTags = dom.skillsList.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${(index + 1) * 0.08}s`; // Slightly faster stagger
    });
    
    // Update body classes for language-specific styling
    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

// --- 5. INITIALIZATION & EVENTS ---
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Detect Language: 1. Saved Preference -> 2. Browser Language -> 3. Default (EN)
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    
    let currentLang = savedLang || browserLang;

    // B. Initial Render
    renderResume(currentLang);

    // C. Event Listeners for Language Switching
    document.getElementById('btn-tr').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'tr');
        renderResume('tr');
    });

    document.getElementById('btn-en').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'en');
        renderResume('en');
    });
    // D. Print Functionality
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => window.print());
    }

    // E. Dark Mode Logic
    const btnTheme = document.getElementById('btn-theme');
    
    // 1. Check system preference immediately
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-theme', 'dark');
    }

    // 2. Toggle on click
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const body = document.body;
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
            } else {
                body.setAttribute('data-theme', 'dark');
            }
        });
    }

    // NEW: Email Copy-to-Clipboard Feature
const mailLink = document.getElementById('link-email');

if (mailLink) {
    mailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const emailText = resumeData.meta.email;
        const isTr = document.documentElement.lang === 'tr';
        
        navigator.clipboard.writeText(emailText).then(() => {
            // Set the message for the CSS to pick up
            mailLink.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
            
            // Add the class that triggers the CSS overlay
            mailLink.classList.add('copied');
            
            setTimeout(() => {
                mailLink.classList.remove('copied');
            }, 2000);
        });
    });
}
});
