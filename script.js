// --- 1. SEO & METADATA MANAGEMENT ---
function updateSEO(lang) {
    const title = resumeData.ui.documentTitle[lang];
    const desc = resumeData.ui.seoDesc[lang];
    const jobTitle = resumeData.ui.jobTitleShort[lang];

    // Update Title & Meta
    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute('content', desc);
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', desc);
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', desc);

    // Update JSON-LD
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
    updateSEO(lang);
    document.documentElement.lang = lang;

    // 1. HEADER (Static IDs)
    document.getElementById('p-name').textContent = resumeData.profile.name;
    document.getElementById('p-title').textContent = resumeData.profile.title[lang];
    document.getElementById('p-location').textContent = resumeData.meta.location[lang];
    
    const mailLink = document.getElementById('link-email');
    mailLink.textContent = resumeData.meta.email;
    mailLink.href = `mailto:${resumeData.meta.email}`;

    const linkedinLink = document.getElementById('link-linkedin');
    linkedinLink.textContent = resumeData.meta.linkedinLabel;
    linkedinLink.href = resumeData.meta.linkedin;
    
    // PDF Button
    const printBtn = document.getElementById('ui-print');
    if(printBtn) printBtn.textContent = resumeData.ui.print[lang];

    // 2. MAIN CONTENT (Dynamic Generation)
    // Uses utils.js to rebuild the <main> tag content
    const mainHTML = resumeUtils.renderLayout(resumeData, lang);
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = mainHTML;

    // 3. AUTOMATED SECTION ANIMATIONS
    // Finds all sections and applies a staggered delay automatically
    const sections = mainContent.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = "0"; // Initial state for animation
        section.style.animation = `slideUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
    });

    // 4. STATES & UI ANIMATION
    document.getElementById('btn-tr').setAttribute('aria-pressed', lang === 'tr');
    document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
    
    // Staggered animation for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => { 
        tag.style.animationDelay = `${(index + 1) * 0.05}s`; 
    });
    
    document.body.classList.remove('lang-tr', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
}

// --- 3. EVENTS ---
document.addEventListener('DOMContentLoaded', () => {
    // Detect language from storage or browser settings
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    let currentLang = savedLang || browserLang;

    renderResume(currentLang);

    // Language Toggles
    document.getElementById('btn-tr').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'tr');
        renderResume('tr');
    });

    document.getElementById('btn-en').addEventListener('click', () => {
        localStorage.setItem('preferredLang', 'en');
        renderResume('en');
    });

    // Print functionality
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    // Theme Toggle (Dark/Light Mode)
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

    // Email Copy to Clipboard Logic
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
