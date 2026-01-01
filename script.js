/**
 * Resume Logic Optimization
 * - Reduced DOM reflows by calculating styles during string generation.
 * - Added reactive system theme listener.
 * - Improved clipboard safety.
 */

// --- 1. CONFIGURATION & CACHE ---
const UI_LABELS = {
    about: { tr: "Hakkında", en: "About" },
    experience: { tr: "Deneyim", en: "Experience" },
    education: { tr: "Eğitim", en: "Education" },
    skills: { tr: "Teknik Yetkinlikler & Uzmanlıklar", en: "Technical Skills & Specializations" },
    languages: { tr: "Diller", en: "Languages" },
    print: { tr: "PDF", en: "PDF" }
};

// Cache DOM elements once to avoid repetitive lookups
const dom = {
    html: document.documentElement,
    // Text Elements
    name: document.getElementById('p-name'),
    title: document.getElementById('p-title'),
    location: document.getElementById('p-location'),
    aboutPara: document.getElementById('p-about'),
    // Links
    email: document.getElementById('link-email'),
    linkedin: document.getElementById('link-linkedin'),
    // Headers
    aboutHead: document.getElementById('head-about'),
    expHead: document.getElementById('head-experience'),
    eduHead: document.getElementById('head-education'),
    skillsHead: document.getElementById('head-skills'),
    langsHead: document.getElementById('head-languages'),
    // Containers
    expList: document.getElementById('experience-list'),
    eduList: document.getElementById('education-list'),
    skillsList: document.getElementById('skills-list'),
    langsList: document.getElementById('languages-list'),
    // Interactive
    btnPrintLabel: document.querySelector('#btn-print span'),
    btnTr: document.getElementById('btn-tr'),
    btnEn: document.getElementById('btn-en'),
    jsonLd: document.getElementById('json-ld')
};

// --- 2. HTML GENERATORS (Pure Functions) ---

/**
 * Creates skill tags with pre-calculated animation delays to avoid DOM reflows.
 */
function createTagsHTML(tagsArray) {
    if (!tagsArray || !tagsArray.length) return '';
    
    return tagsArray.map((tag, index) => {
        // Optimization: Inline the delay here instead of querying DOM later
        const delay = (index + 1) * 0.08;
        return `<span class="skill-tag" style="animation-delay: ${delay}s">${tag}</span>`;
    }).join('');
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
    // Fallback logic in case properties are missing
    const title = item.role?.[langKey] || item.degree?.[langKey] || '';
    const subTitle = item.company?.[langKey] || item.school?.[langKey] || '';
    const date = item.date?.[langKey] || '';
    const location = item.location?.[langKey] || '';
    const desc = item.desc?.[langKey] || '';
    
    // Only render tags wrapper if tags exist
    const tagsHTML = item.tags 
        ? `<div class="tags-wrapper">${createTagsHTML(item.tags[langKey])}</div>` 
        : '';

    return `
    <div class="job-block">
        <div class="job-header">
            <span class="job-title">${title}</span>
            <span class="job-date">${date}</span>
        </div>
        <div class="job-subheader">
            <span class="company">${subTitle}</span>
            <span class="location">${location}</span>
        </div>
        <div class="job-content">
            <p>${desc}</p>
            ${tagsHTML}
        </div>
    </div>`;
}

// --- 3. LOGIC & STATE MANAGEMENT ---

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

    document.title = currentSEO.title;
    
    // Efficiently update meta tags using a helper mapping
    const metaUpdates = {
        'description': currentSEO.desc,
        'og:title': currentSEO.title,
        'og:description': currentSEO.desc,
        'twitter:title': currentSEO.title,
        'twitter:description': currentSEO.desc
    };

    for (const [name, content] of Object.entries(metaUpdates)) {
        // Select by name OR property (covers standard meta and og tags)
        const tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (tag) tag.setAttribute('content', content);
    }

    // Update JSON-LD
    if (dom.jsonLd) {
        try {
            const schema = JSON.parse(dom.jsonLd.textContent);
            schema.jobTitle = currentSEO.jobTitle;
            schema.description = currentSEO.desc;
            dom.jsonLd.textContent = JSON.stringify(schema, null, 2);
        } catch (e) {
            console.warn("JSON-LD update skipped:", e);
        }
    }
}

function renderResume(lang) {
    if (!resumeData) return; // Safety check

    // 1. Update Document State
    dom.html.lang = lang;
    updateSEO(lang);

    // 2. Profile & Contact
    dom.name.textContent = resumeData.profile.name;
    dom.title.textContent = resumeData.profile.title[lang];
    dom.location.textContent = resumeData.meta.location[lang];
    dom.email.textContent = resumeData.meta.email;
    dom.email.href = `mailto:${resumeData.meta.email}`;
    dom.linkedin.textContent = resumeData.meta.linkedinLabel || "LinkedIn";
    dom.linkedin.href = resumeData.meta.linkedin;

    // 3. UI Labels
    dom.aboutHead.textContent = UI_LABELS.about[lang];
    dom.expHead.textContent = UI_LABELS.experience[lang];
    dom.eduHead.textContent = UI_LABELS.education[lang];
    dom.skillsHead.textContent = UI_LABELS.skills[lang];
    dom.langsHead.textContent = UI_LABELS.languages[lang];
    if (dom.btnPrintLabel) dom.btnPrintLabel.textContent = UI_LABELS.print[lang];

    // 4. Content Content
    dom.aboutPara.textContent = resumeData.profile.about[lang];

    // 5. Lists (Batch Updates)
    dom.expList.innerHTML = resumeData.experience.map(job => createBlockHTML(job, lang)).join('');
    dom.eduList.innerHTML = resumeData.education.map(school => createBlockHTML(school, lang)).join('');
    
    // Note: Styles for animation are now embedded in the HTML string, removing the need for a post-render loop
    dom.skillsList.innerHTML = createTagsHTML(resumeData.skills[lang]);
    
    dom.langsList.innerHTML = createLanguageHTML(resumeData.languages, lang);

    // 6. Button States
    dom.btnTr.setAttribute('aria-pressed', lang === 'tr');
    dom.btnEn.setAttribute('aria-pressed', lang === 'en');
    
    // 7. Update Body Class
    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

// --- 4. THEME & INTERACTION HANDLERS ---

function initTheme() {
    const btnTheme = document.getElementById('btn-theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Helper to apply theme
    const applyTheme = (isDark) => {
        if (isDark) document.body.setAttribute('data-theme', 'dark');
        else document.body.removeAttribute('data-theme');
    };

    // 1. Check saved preference or system default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        applyTheme(mediaQuery.matches);
    }

    // 2. Listen for System Changes (Reactive)
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });

    // 3. Manual Toggle
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const isDarkNow = document.body.getAttribute('data-theme') === 'dark';
            applyTheme(!isDarkNow);
            localStorage.setItem('theme', !isDarkNow ? 'dark' : 'light');
        });
    }
}

function initClipboard() {
    const mailLink = dom.email;
    if (!mailLink) return;

    mailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Guard clause for Clipboard API
        if (!navigator.clipboard) {
            window.location.href = mailLink.href; // Fallback to default mailto behavior
            return;
        }

        try {
            await navigator.clipboard.writeText(resumeData.meta.email);
            const isTr = document.documentElement.lang === 'tr';
            
            mailLink.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
            mailLink.classList.add('copied');
            
            setTimeout(() => mailLink.classList.remove('copied'), 2000);
        } catch (err) {
            console.error('Copy failed', err);
            window.location.href = mailLink.href; // Fallback
        }
    });
}

// --- 5. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Setup
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    const currentLang = savedLang || browserLang;

    // 2. Initial Render
    if (typeof resumeData !== 'undefined') {
        renderResume(currentLang);
    } else {
        console.error("Critical: resumeData is not loaded.");
    }

    // 3. Event Listeners
    dom.btnTr.addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'tr');
        renderResume('tr');
    });

    dom.btnEn.addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'en');
        renderResume('en');
    });

    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    // 4. Init Modules
    initTheme();
    initClipboard();
});
