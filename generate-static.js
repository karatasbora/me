/* CONTROLLER: script.js
   Handles Client-Side Interactivity, Language Switching, and Dynamic Rendering.
   Reads strictly from data.js (Single Source of Truth).
*/

// --- 1. HELPER FUNCTIONS (HTML Generators) ---

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
    
    const tagsHTML = item.tags 
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

// --- 2. RENDERERS CONFIGURATION (Client-Side) ---
// Maps 'type' string from data.js to the generator functions above.
const RENDERERS = {
    'std-block': (container, lang) => {
        return container.items.map(item => createBlockHTML(item, lang)).join('');
    },
    'tag-cloud': (container, lang) => {
        return createTagsHTML(container.data[lang]);
    },
    'lang-grid': (container, lang) => {
        return createLanguageHTML(container.items, lang);
    },
    'text-content': (container, lang) => {
        // Specifically for the profile/about text
        return container.about[lang];
    }
};

// --- 3. SEO MANAGER (The Automation You Asked For) ---
function updateSEO(lang) {
    const ui = resumeData.ui;

    // 1. Browser Title
    document.title = ui.documentTitle[lang];

    // 2. Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', ui.seoDesc[lang]);

    // 3. Open Graph (Facebook/LinkedIn)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', ui.documentTitle[lang]);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', ui.seoDesc[lang]);

    // 4. Twitter Card
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', ui.documentTitle[lang]);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', ui.seoDesc[lang]);

    // 5. JSON-LD Structured Data (Google Rich Results)
    try {
        const jsonLdScript = document.getElementById('json-ld');
        if (jsonLdScript) {
            const schema = JSON.parse(jsonLdScript.textContent);
            
            // Dynamically update schema based on data.js
            schema.jobTitle = ui.jobTitleShort[lang];
            schema.description = ui.seoDesc[lang];
            
            jsonLdScript.textContent = JSON.stringify(schema, null, 2);
        }
    } catch (e) {
        console.warn("JSON-LD update failed", e);
    }
}


// --- 4. MAIN RENDER FUNCTION ---
function renderResume(lang) {
    // A. Update HTML Lang & SEO
    document.documentElement.lang = lang;
    updateSEO(lang);

    // B. Static Header Elements (Profile)
    // These are unique, so we keep manual binding for safety/layout reasons
    document.getElementById('p-name').textContent = resumeData.profile.name;
    document.getElementById('p-title').textContent = resumeData.profile.title[lang];
    document.getElementById('p-location').textContent = resumeData.meta.location[lang];
    
    // Links
    const mailLink = document.getElementById('link-email');
    mailLink.textContent = resumeData.meta.email;
    mailLink.href = `mailto:${resumeData.meta.email}`;

    const linkedinLink = document.getElementById('link-linkedin');
    linkedinLink.textContent = resumeData.meta.linkedinLabel;
    linkedinLink.href = resumeData.meta.linkedin;

    // C. Automated UI Labels (Headings)
    // Looks for IDs like 'head-about', 'head-experience' matching keys in data.ui
    Object.keys(resumeData.ui).forEach(key => {
        // Skip SEO keys
        if (['documentTitle', 'seoDesc', 'jobTitleShort'].includes(key)) return;

        // Try 'ui-{key}' (New Standard) or 'head-{key}' (Legacy Support)
        const el = document.getElementById(`ui-${key}`) || document.getElementById(`head-${key}`);
        
        if (el) {
            // Check if it's a simple string or an object {tr, en}
            const val = resumeData.ui[key];
            el.textContent = val[lang] || val;
        }
    });

    // D. Container Loop (The "Container Pattern")
    // Iterates over profile, experience, education, etc.
    Object.keys(resumeData).forEach(key => {
        const section = resumeData[key];

        // We only process objects that have an 'id' and 'type'
        if (section && section.id && section.type) {
            const renderer = RENDERERS[section.type];
            const targetEl = document.getElementById(section.id);

            if (renderer && targetEl) {
                targetEl.innerHTML = renderer(section, lang);
            }
        }
    });

    // E. State & Animations
    document.getElementById('btn-tr').setAttribute('aria-pressed', lang === 'tr');
    document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
    
    // Staggered animation for skills
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${(index + 1) * 0.05}s`;
    });

    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}


// --- 5. EVENTS & INIT ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Detection
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    const currentLang = savedLang || browserLang;

    // 2. Initial Render
    renderResume(currentLang);

    // 3. Language Buttons
    document.getElementById('btn-tr').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'tr');
        renderResume('tr');
    });

    document.getElementById('btn-en').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'en');
        renderResume('en');
    });

    // 4. Print Button
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    // 5. Dark Mode Toggle
    const btnTheme = document.getElementById('btn-theme');
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            const html = document.documentElement;
            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme-preference', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme-preference', 'dark');
            }
        });
    }

    // 6. Email Copy Feature
    const mailLink = document.getElementById('link-email');
    if (mailLink) {
        mailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const isTr = document.documentElement.lang === 'tr';
            
            navigator.clipboard.writeText(resumeData.meta.email).then(() => {
                mailLink.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
                mailLink.classList.add('copied');
                setTimeout(() => mailLink.classList.remove('copied'), 2000);
            });
        });
    }
});
