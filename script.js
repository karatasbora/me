// script.js

// --- 1. CONFIGURATION & CACHE ---
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
    // Headers (Now mapped dynamically)
    headers: {
        about: document.getElementById('head-about'),
        experience: document.getElementById('head-experience'),
        education: document.getElementById('head-education'),
        skills: document.getElementById('head-skills'),
        skillsSub: document.getElementById('head-skills-sub'),
        languages: document.getElementById('head-languages'),
    },
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

const createTagsHTML = (tagsArray) => {
    if (!tagsArray?.length) return '';
    return tagsArray.map((tag, index) => 
        // Inline delay is performant here for small lists
        `<span class="skill-tag" style="animation-delay: ${(index + 1) * 0.05}s">${tag}</span>`
    ).join('');
};

const createLanguageHTML = (languages, langKey) => {
    return languages.map(langItem => `
        <div class="lang-item">
            <span class="lang-title">${langItem.name[langKey]}</span>
            <span class="lang-level">${langItem.level[langKey]}</span>
        </div>
    `).join('');
};

const createBlockHTML = (item, langKey) => {
    const title = item.role?.[langKey] || item.degree?.[langKey] || '';
    const subTitle = item.company?.[langKey] || item.school?.[langKey] || '';
    const date = item.date?.[langKey] || '';
    const location = item.location?.[langKey] || '';
    const desc = item.desc?.[langKey] || '';
    
    const tagsHTML = item.tags 
        ? `<div class="tags-wrapper">${createTagsHTML(item.tags[langKey])}</div>` 
        : '';

    return `
    <article class="job-block"> <header class="job-header">
            <h3 class="job-title">${title}</h3> <span class="job-date">${date}</span>
        </header>
        <div class="job-subheader">
            <span class="company">${subTitle}</span>
            <span class="location">${location}</span>
        </div>
        <div class="job-content">
            <p>${desc}</p>
            ${tagsHTML}
        </div>
    </article>`;
};

// --- 3. LOGIC & STATE MANAGEMENT ---

function updateSEO(lang) {
    const isTr = lang === 'tr';
    const seoTitle = isTr ? "Bora Karataş - Özgeçmiş" : "Bora Karataş - Resume";
    const seoDesc = isTr 
        ? "İçerik Editörü ve Eğitimci. Yapay Zeka destekli öğretim tasarımı." 
        : "Content Editor & Educator. AI-supported instructional design.";

    document.title = seoTitle;
    
    // Batch Meta Updates
    const metaUpdates = {
        'description': seoDesc,
        'og:title': seoTitle,
        'og:description': seoDesc,
        'twitter:title': seoTitle,
        'twitter:description': seoDesc
    };

    Object.entries(metaUpdates).forEach(([name, content]) => {
        const tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (tag) tag.setAttribute('content', content);
    });

    // Valid JSON-LD Generation (Safer than parsing DOM)
    if (dom.jsonLd) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": resumeData.profile.name,
            "jobTitle": resumeData.experience[0].role[lang], // Dynamic latest role
            "description": seoDesc,
            "url": "https://karatasbora.github.io/resume/",
            "sameAs": [resumeData.meta.linkedin]
        };
        dom.jsonLd.textContent = JSON.stringify(schema, null, 2);
    }
}

function renderResume(lang) {
    if (!resumeData) return;

    dom.html.lang = lang;
    updateSEO(lang);

    // 1. Static Text Updates
    dom.name.textContent = resumeData.profile.name;
    dom.title.textContent = resumeData.profile.title[lang];
    dom.location.textContent = resumeData.meta.location[lang];
    dom.email.textContent = resumeData.meta.email;
    dom.email.href = `mailto:${resumeData.meta.email}`;
    dom.linkedin.textContent = "LinkedIn"; 
    dom.linkedin.href = resumeData.meta.linkedin;
    dom.aboutPara.textContent = resumeData.profile.about[lang];

    // 2. Interface Labels (Dynamic from data.js)
    Object.keys(dom.headers).forEach(key => {
        if (dom.headers[key] && resumeData.interface[key]) {
            dom.headers[key].textContent = resumeData.interface[key][lang];
        }
    });
    if (dom.btnPrintLabel) dom.btnPrintLabel.textContent = resumeData.interface.print[lang];

    // 3. List Rendering
    // Helper to inject HTML
    const renderList = (element, dataArray, isExp = false) => {
        element.innerHTML = dataArray.map(item => createBlockHTML(item, lang)).join('');
    };

    renderList(dom.expList, resumeData.experience);
    renderList(dom.eduList, resumeData.education);
    
    dom.skillsList.innerHTML = createTagsHTML(resumeData.skills[lang]);
    dom.langsList.innerHTML = createLanguageHTML(resumeData.languages, lang);

    // 4. UI State
    dom.btnTr.setAttribute('aria-pressed', lang === 'tr');
    dom.btnEn.setAttribute('aria-pressed', lang === 'en');
    
    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

// --- 4. MODULES ---

function initTheme() {
    const btnTheme = document.getElementById('btn-theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const setTheme = (isDark) => {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Initialize
    const saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved === 'dark');
    } else {
        setTheme(mediaQuery.matches);
    }

    // Event Listeners
    mediaQuery.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) setTheme(e.matches);
    });

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            setTheme(!isDark);
        });
    }
}

function initClipboard() {
    const mailLink = dom.email;
    if (!mailLink) return;

    mailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!navigator.clipboard) {
            window.location.href = mailLink.href;
            return;
        }

        try {
            await navigator.clipboard.writeText(resumeData.meta.email);
            const lang = document.documentElement.lang;
            // Use centralized data label
            const msg = resumeData.interface?.copy?.[lang] || "Copied!";
            
            mailLink.setAttribute('data-copy-text', msg);
            mailLink.classList.add('copied');
            setTimeout(() => mailLink.classList.remove('copied'), 2000);
        } catch (err) {
            window.location.href = mailLink.href;
        }
    });
}

// --- 5. BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    
    renderResume(savedLang || browserLang);
    initTheme();
    initClipboard();

    // Event Delegation for Lang Switch
    document.getElementById('btn-tr').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'tr');
        renderResume('tr');
    });
    document.getElementById('btn-en').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'en');
        renderResume('en');
    });
    
    document.getElementById('btn-print')?.addEventListener('click', () => window.print());
});
