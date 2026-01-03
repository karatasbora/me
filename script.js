// --- 1. SEO & METADATA MANAGEMENT ---
function updateSEO(lang) {
    const title = resumeData.ui.documentTitle[lang];
    const desc = resumeData.ui.seoDesc[lang];
    const jobTitle = resumeData.ui.jobTitleShort[lang];

    // A. Update Title & Meta
    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute('content', desc);

    // B. Update Open Graph
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', desc);

    // C. Update Twitter
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', desc);

    // D. Update JSON-LD
    try {
        const jsonLdScript = document.getElementById('json-ld');
        if (jsonLdScript) {
            const schema = JSON.parse(jsonLdScript.textContent);
            schema.jobTitle = jobTitle;
            schema.description = desc;
            jsonLdScript.textContent = JSON.stringify(schema, null, 2);
        }
    } catch (e) { console.warn("JSON-LD update failed", e); }
}

// --- 2. MAIN RENDER FUNCTION ---
function renderResume(lang) {
    // --- AUTOMATED UI WIRING ---
    // Single Source of Truth: Driven entirely by data.ui keys
    // This replaces manual assignments like: element.textContent = resumeData.ui.about[lang]
    Object.keys(resumeData.ui).forEach(key => {
        const elementId = `ui-${key}`;
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = resumeData.ui[key][lang];
        }
    });
    
    updateSEO(lang);
    document.documentElement.lang = lang;

    // --- DYNAMIC PROFILE CONTENT ---
    // These remain specific because they don't map 1:1 to the 'ui' object structure
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

    // --- MAIN CONTENT BLOCKS (Using resumeUtils) ---
    document.getElementById('p-about').textContent = resumeData.profile.about[lang];
    
    document.getElementById('experience-list').innerHTML = 
        resumeData.experience.map(job => resumeUtils.createBlockHTML(job, lang)).join('');
        
    document.getElementById('education-list').innerHTML = 
        resumeData.education.map(school => resumeUtils.createBlockHTML(school, lang)).join('');
        
    document.getElementById('skills-list').innerHTML = 
        resumeUtils.createTagsHTML(resumeData.skills[lang]);
        
    document.getElementById('languages-list').innerHTML = 
        resumeUtils.createLanguageHTML(resumeData.languages, lang);

    // --- STATES & ANIMATION ---
    document.getElementById('btn-tr').setAttribute('aria-pressed', lang === 'tr');
    document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
    
    // Re-trigger animations for skills
    const skillTags = document.querySelectorAll('#skills-list .skill-tag');
    skillTags.forEach((tag, index) => { tag.style.animationDelay = `${(index + 1) * 0.1}s`; });
    
    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

// --- 3. EVENTS ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    let currentLang = savedLang || browserLang;

    renderResume(currentLang);

    document.getElementById('btn-tr').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'tr');
        renderResume('tr');
    });

    document.getElementById('btn-en').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'en');
        renderResume('en');
    });

    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    const btnTheme = document.getElementById('btn-theme');
    const htmlElement = document.documentElement;
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-theme') === 'dark') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme-preference', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme-preference', 'dark');
            }
        });
    }

    const mailLink = document.getElementById('link-email');
    if (mailLink) {
        mailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const emailText = resumeData.meta.email;
            const isTr = document.documentElement.lang === 'tr';
            navigator.clipboard.writeText(emailText).then(() => {
                mailLink.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
                mailLink.classList.add('copied');
                setTimeout(() => { mailLink.classList.remove('copied'); }, 2000);
            });
        });
    }
});
