/**
 * Bora Karataş Resume Logic
 * Optimized for performance and maintainability
 */

// --- 1. CONFIGURATION & CONSTANTS ---
const UI_LABELS = {
    about: { tr: "Hakkında", en: "About" },
    experience: { tr: "Deneyim", en: "Experience" },
    education: { tr: "Eğitim", en: "Education" },
    skills: { tr: "Teknik Yetkinlikler & Uzmanlıklar", en: "Technical Skills & Specializations" },
    languages: { tr: "Diller", en: "Languages" },
    print: { tr: "PDF", en: "PDF" }
};

// Cache DOM elements once
const dom = {
    html: document.documentElement,
    body: document.body,
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
    btnPrint: document.getElementById('btn-print'),
    btnTr: document.getElementById('btn-tr'),
    btnEn: document.getElementById('btn-en'),
    btnTheme: document.getElementById('btn-theme')
};

// --- 2. SEO & METADATA ---
function updateSEO(lang) {
    const seoData = {
        tr: {
            title: "Bora Karataş - Özgeçmiş",
            desc: "İçerik Editörü ve Eğitimci. Yapay Zeka destekli, erişilebilir öğrenme deneyimleri tasarlıyor.",
            jobTitle: "İçerik Editörü"
        },
        en: {
            title: "Bora Karataş - Resume",
            desc: "Content Editor & Educator specializing in AI-Supported Learning Experiences.",
            jobTitle: "Content Editor"
        }
    };

    const { title, desc, jobTitle } = seoData[lang];

    // Bulk Update Metadata
    document.title = title;
    const metaTags = {
        'meta[name="description"]': desc,
        'meta[property="og:title"]': title,
        'meta[property="og:description"]': desc,
        'meta[name="twitter:title"]': title,
        'meta[name="twitter:description"]': desc
    };

    Object.entries(metaTags).forEach(([selector, value]) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('content', value);
    });

    // Update JSON-LD
    const jsonLdScript = document.getElementById('json-ld');
    if (jsonLdScript) {
        try {
            const schema = JSON.parse(jsonLdScript.textContent);
            schema.jobTitle = jobTitle;
            schema.description = desc;
            jsonLdScript.textContent = JSON.stringify(schema, null, 2);
        } catch (e) {
            console.error("JSON-LD parse error", e);
        }
    }
}

// --- 3. HTML GENERATORS ---
const createTagsHTML = (tags) => tags ? tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('') : '';

const createLanguageHTML = (languages, langKey) => languages.map(({ name, level }) => `
    <div class="lang-item">
        <span class="lang-title">${name[langKey]}</span>
        <span class="lang-level">${level[langKey]}</span>
    </div>
`).join('');

const createBlockHTML = (item, langKey) => {
    const title = item.role ? item.role[langKey] : item.degree[langKey];
    const subTitle = item.company ? item.company[langKey] : item.school[langKey];
    const tagsHTML = item.tags ? `<div class="tags-wrapper">${createTagsHTML(item.tags[langKey])}</div>` : '';

    return `
    <article class="job-block">
        <div class="job-header">
            <h4 class="job-title">${title}</h4>
            <time class="job-date">${item.date[langKey]}</time>
        </div>
        <div class="job-subheader">
            <span class="company">${subTitle}</span>
            <span class="location">${item.location[langKey]}</span>
        </div>
        <div class="job-content">
            <p>${item.desc[langKey]}</p>
            ${tagsHTML}
        </div>
    </article>`;
};

// --- 4. RENDER ENGINE ---
function renderResume(lang) {
    if (typeof resumeData === 'undefined') return console.error("Resume data not found.");

    updateSEO(lang);
    dom.html.lang = lang;

    // Profile Info
    dom.name.textContent = resumeData.profile.name;
    dom.title.textContent = resumeData.profile.title[lang];
    dom.location.textContent = resumeData.meta.location[lang];
    
    // Links
    dom.email.textContent = resumeData.meta.email;
    dom.email.href = `mailto:${resumeData.meta.email}`;
    dom.linkedin.href = resumeData.meta.linkedin;

    // UI Labels
    const labels = ['about', 'experience', 'education', 'skills', 'languages'];
    labels.forEach(key => {
        if (dom[`${key}Head`]) dom[`${key}Head`].textContent = UI_LABELS[key][lang];
    });
    if (dom.btnPrint) dom.btnPrint.querySelector('span').textContent = UI_LABELS.print[lang];

    // List Rendering
    dom.aboutPara.textContent = resumeData.profile.about[lang];
    dom.expList.innerHTML = resumeData.experience.map(job => createBlockHTML(job, lang)).join('');
    dom.eduList.innerHTML = resumeData.education.map(edu => createBlockHTML(edu, lang)).join('');
    dom.skillsList.innerHTML = createTagsHTML(resumeData.skills[lang]);
    dom.langsList.innerHTML = createLanguageHTML(resumeData.languages, lang);

    // Staggered Animations
    dom.skillsList.querySelectorAll('.skill-tag').forEach((tag, i) => {
        tag.style.animationDelay = `${(i + 1) * 0.05}s`;
    });

    // Body Classes
    dom.body.classList.remove('lang-tr', 'lang-en');
    dom.body.classList.add(`lang-${lang}`);
}

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const getLang = () => localStorage.getItem('preferredLang') || 
                         (navigator.language.startsWith('tr') ? 'tr' : 'en');
    
    renderResume(getLang());

    // Event Delegation for Buttons
    document.addEventListener('click', (e) => {
        const id = e.target.closest('[id]')?.id;
        
        if (id === 'btn-tr' || id === 'btn-en') {
            const lang = id.split('-')[1];
            localStorage.setItem('preferredLang', lang);
            renderResume(lang);
        }

        if (id === 'btn-print') window.print();

        if (id === 'btn-theme') {
            const isDark = dom.body.getAttribute('data-theme') === 'dark';
            isDark ? dom.body.removeAttribute('data-theme') : dom.body.setAttribute('data-theme', 'dark');
        }
    });

    // Clipboard Logic
    if (dom.email) {
        dom.email.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await navigator.clipboard.writeText(resumeData.meta.email);
                const isTr = dom.html.lang === 'tr';
                dom.email.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
                dom.email.classList.add('copied');
                setTimeout(() => dom.email.classList.remove('copied'), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        });
    }
});
