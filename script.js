// script.js

// --- 1. UI LABELS (Static Interface Text) ---
const UI_LABELS = {
    about: { tr: "Hakkında", en: "About" },
    experience: { tr: "Deneyim", en: "Experience" },
    education: { tr: "Eğitim", en: "Education" },
    skills: { tr: "Teknik Yetkinlikler & Uzmanlıklar", en: "Technical Skills & Specializations" },
    languages: { tr: "Diller", en: "Languages" },
    print: { tr: "PDF", en: "PDF" }
};

// --- 2. SEO & METADATA MANAGEMENT (Dynamic) ---
function updateSEO(lang) {
    // Construct dynamic strings using resumeData from data.js
    const suffix = lang === 'tr' ? "Özgeçmiş" : "Resume";
    const pageTitle = `${resumeData.profile.name} - ${suffix}`;
    
    // Use the profile Headline (Title) as the meta description
    const pageDesc = resumeData.profile.title[lang];
    
    // Extract the primary Job Title (everything before the first pipe '|')
    // Ex: "Content Editor | AI..." -> "Content Editor"
    const jobTitleSimple = pageDesc.split('|')[0].trim();

    // A. Update Document Title
    document.title = pageTitle;

    // B. Helper to safely update meta tags by name or property
    const setMeta = (selector, content) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('content', content);
    };

    // Update Standard Meta
    setMeta('meta[name="description"]', pageDesc);

    // Update Open Graph (Facebook/LinkedIn)
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', pageDesc);

    // Update Twitter Card
    setMeta('meta[name="twitter:title"]', pageTitle);
    setMeta('meta[name="twitter:description"]', pageDesc);

    // C. Update JSON-LD Structured Data (For Google Search Rich Snippets)
    try {
        const jsonLdScript = document.getElementById('json-ld');
        if (jsonLdScript) {
            const schema = JSON.parse(jsonLdScript.textContent);
            schema.name = resumeData.profile.name; // Ensure name syncs
            schema.jobTitle = jobTitleSimple;
            schema.description = pageDesc;
            jsonLdScript.textContent = JSON.stringify(schema, null, 2);
        }
    } catch (e) {
        console.warn("JSON-LD update failed", e);
    }
}

// --- 3. HTML GENERATORS ---

function createTagsHTML(tagsArray) {
    if (!tagsArray) return '';
    return tagsArray.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
}

function createLanguageHTML(languages, langKey) {
    return languages.map(langItem => `
        <div class="lang-item">
            <span class="lang-title">${langItem.name[langKey]}</span>
            <span class="lang-level">${langItem.level[langKey]}</span>
        </div>
    `).join('');
}

function createBlockHTML(item, langKey) {
    const title = item.role ? item.role[langKey] : item.degree[langKey];
    const subTitle = item.company ? item.company[langKey] : item.school[langKey];
    
    const tagsHTML = (item.tags && item.tags[langKey]) 
        ? `<div class="tags-wrapper">${createTagsHTML(item.tags[langKey])}</div>` 
        : '';

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

// --- 4. RENDER LOGIC ---

function applyAnimationDelays() {
    const skillTags = document.querySelectorAll('#skills-list .skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}

function updateButtonStates(lang) {
    document.getElementById('btn-tr').setAttribute('aria-pressed', lang === 'tr');
    document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
    
    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

// Full Render: Used when switching languages dynamically
function renderResume(lang) {
    // 1. Update SEO & HTML Lang Attribute
    updateSEO(lang);
    document.documentElement.lang = lang;

    // 2. Update Profile Info
    document.getElementById('p-name').textContent = resumeData.profile.name;
    document.getElementById('p-title').textContent = resumeData.profile.title[lang];
    document.getElementById('p-location').textContent = resumeData.meta.location[lang];
    
    const mailLink = document.getElementById('link-email');
    mailLink.textContent = resumeData.meta.email;
    mailLink.href = `mailto:${resumeData.meta.email}`;

    const linkedinLink = document.getElementById('link-linkedin');
    linkedinLink.textContent = resumeData.meta.linkedinLabel || "LinkedIn";
    linkedinLink.href = resumeData.meta.linkedin;

    // 3. Update Section Headers
    document.getElementById('head-about').textContent = UI_LABELS.about[lang];
    document.getElementById('head-experience').textContent = UI_LABELS.experience[lang];
    document.getElementById('head-education').textContent = UI_LABELS.education[lang];
    document.getElementById('head-skills').textContent = UI_LABELS.skills[lang];
    document.getElementById('head-skills-sub').textContent = UI_LABELS.skills[lang];
    document.getElementById('head-languages').textContent = UI_LABELS.languages[lang];
    
    const printBtnSpan = document.querySelector('#btn-print span');
    if (printBtnSpan) printBtnSpan.textContent = UI_LABELS.print[lang];

    // 4. Render Dynamic Content
    document.getElementById('p-about').textContent = resumeData.profile.about[lang];

    document.getElementById('experience-list').innerHTML = 
        resumeData.experience.map(job => createBlockHTML(job, lang)).join('');

    document.getElementById('education-list').innerHTML = 
        resumeData.education.map(school => createBlockHTML(school, lang)).join('');

    document.getElementById('skills-list').innerHTML = 
        createTagsHTML(resumeData.skills[lang]);

    document.getElementById('languages-list').innerHTML = 
        createLanguageHTML(resumeData.languages, lang);

    // 5. Update UI & Animations
    updateButtonStates(lang);
    applyAnimationDelays();
}

// --- 5. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // A. Detect Languages
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    const htmlLang = document.documentElement.lang; // Language of the pre-built HTML

    let targetLang = savedLang || browserLang;

    // B. Hydration Strategy
    if (targetLang !== htmlLang) {
        // Optimization: Only render if user pref differs from static HTML
        console.log(`⚡ Switching language to ${targetLang}...`);
        renderResume(targetLang);
    } else {
        // Optimization: Static HTML is already correct. Just hydrate UI.
        console.log('⚡ Hydrating static content...');
        updateButtonStates(targetLang);
        
        // Populate specific text fields that might not be in the template logic
        document.getElementById('head-about').textContent = UI_LABELS.about[targetLang];
        document.getElementById('head-experience').textContent = UI_LABELS.experience[targetLang];
        document.getElementById('head-education').textContent = UI_LABELS.education[targetLang];
        document.getElementById('head-skills').textContent = UI_LABELS.skills[targetLang];
        document.getElementById('head-skills-sub').textContent = UI_LABELS.skills[targetLang];
        document.getElementById('head-languages').textContent = UI_LABELS.languages[targetLang];
        
        document.getElementById('p-title').textContent = resumeData.profile.title[targetLang];
        document.getElementById('p-location').textContent = resumeData.meta.location[targetLang];
        
        const mailLink = document.getElementById('link-email');
        mailLink.textContent = resumeData.meta.email;
        mailLink.href = `mailto:${resumeData.meta.email}`;

        const linkedinLink = document.getElementById('link-linkedin');
        linkedinLink.textContent = resumeData.meta.linkedinLabel;
        linkedinLink.href = resumeData.meta.linkedin;

        applyAnimationDelays();
        
        // Also ensure SEO is correct (in case build.js defaulted to 'en' but user logic says 'tr' without a full render mismatch)
        updateSEO(targetLang); 
    }

    // C. Event Listeners
    
    // Language Toggle
    document.getElementById('btn-tr').addEventListener('click', () => {
        if (localStorage.getItem('preferredLang') !== 'tr') {
            localStorage.setItem('preferredLang', 'tr');
            renderResume('tr');
        }
    });

    document.getElementById('btn-en').addEventListener('click', () => {
        if (localStorage.getItem('preferredLang') !== 'en') {
            localStorage.setItem('preferredLang', 'en');
            renderResume('en');
        }
    });

    // Print
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => window.print());
    }

    // Dark Mode
    const btnTheme = document.getElementById('btn-theme');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (!localStorage.getItem('theme-preference')) {
             document.body.setAttribute('data-theme', 'dark');
        }
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const body = document.body;
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme-preference', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme-preference', 'dark');
            }
        });
    }

    // Email Copy-to-Clipboard
    const mailLink = document.getElementById('link-email');
    if (mailLink) {
        mailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const emailText = resumeData.meta.email;
            const isTr = document.documentElement.lang === 'tr';
            
            navigator.clipboard.writeText(emailText).then(() => {
                mailLink.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
                mailLink.classList.add('copied');
                setTimeout(() => {
                    mailLink.classList.remove('copied');
                }, 2000);
            });
        });
    }
});
