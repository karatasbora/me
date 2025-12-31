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
    // 1. Update SEO & HTML Lang Attribute
    updateSEO(lang);
    document.documentElement.lang = lang;

    // 2. Update Header Profile Info
    document.getElementById('p-name').textContent = resumeData.profile.name;
    document.getElementById('p-title').textContent = resumeData.profile.title[lang];
    document.getElementById('p-location').textContent = resumeData.meta.location[lang];
    
    // Update Contact Links
    const mailLink = document.getElementById('link-email');
    mailLink.textContent = resumeData.meta.email;
    mailLink.href = `mailto:${resumeData.meta.email}`;

    const linkedinLink = document.getElementById('link-linkedin');
    linkedinLink.textContent = resumeData.meta.linkedinLabel || "LinkedIn";
    linkedinLink.href = resumeData.meta.linkedin;

    // 3. Update Section Headers (using UI_LABELS)
    document.getElementById('head-about').textContent = UI_LABELS.about[lang];
    document.getElementById('head-experience').textContent = UI_LABELS.experience[lang];
    document.getElementById('head-education').textContent = UI_LABELS.education[lang];
    document.getElementById('head-skills').textContent = UI_LABELS.skills[lang];
    document.getElementById('head-languages').textContent = UI_LABELS.languages[lang];
    
    // Update Print Button Text
    const printBtnSpan = document.querySelector('#btn-print span');
    if (printBtnSpan) printBtnSpan.textContent = UI_LABELS.print[lang];

    // 4. Render Dynamic Content
    // A. About Text
    document.getElementById('p-about').textContent = resumeData.profile.about[lang];

    // B. Experience List
    document.getElementById('experience-list').innerHTML = 
        resumeData.experience.map(job => createBlockHTML(job, lang)).join('');

    // C. Education List
    document.getElementById('education-list').innerHTML = 
        resumeData.education.map(school => createBlockHTML(school, lang)).join('');

    // D. Skills List
    document.getElementById('skills-list').innerHTML = 
        createTagsHTML(resumeData.skills[lang]);

    // E. Languages List
    document.getElementById('languages-list').innerHTML = 
        createLanguageHTML(resumeData.languages, lang);

    // 5. Update UI Button States (Visual Feedback)
    document.getElementById('btn-tr').setAttribute('aria-pressed', lang === 'tr');
    document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
    
    // Toggle body class for generic CSS styling
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

// 1. Initial State Check
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Prioritize saved preference, then system preference
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.setAttribute('data-theme', 'dark');
}

// 2. Toggle and Persist on click
if (btnTheme) {
    btnTheme.addEventListener('click', () => {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light'); // Persist light mode
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');  // Persist dark mode
        }
    });
}
