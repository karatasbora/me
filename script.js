// script.js

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

// --- 3. SKILL NAVIGATION LOGIC (NEW) ---
function setupSkillNavigation() {
    // A. Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const existingDropdown = document.querySelector('.nav-dropdown');
        if (existingDropdown && !e.target.closest('.skill-tag')) {
            existingDropdown.remove();
        }
    });

    // B. Handle clicks on Skill Tags (Delegation)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('skill-tag')) {
            e.preventDefault();
            e.stopPropagation(); // Stop propagation to prevent immediate close
            
            // 1. Clean up old dropdowns
            const existing = document.querySelector('.nav-dropdown');
            if (existing) existing.remove();

            // 2. Get Targets
            const btn = e.target;
            const targetIds = btn.dataset.targets ? btn.dataset.targets.split(',') : [];
            const originId = btn.dataset.origin;

            // 3. Filter targets: Don't show the section we are currently in
            const validTargets = targetIds.filter(id => id !== originId);

            // If nowhere to go, do nothing (or you could show a tooltip)
            if (validTargets.length === 0) return;

            // 4. Create Dropdown HTML
            const dropdown = document.createElement('div');
            dropdown.className = 'nav-dropdown';
            
            const header = document.createElement('div');
            header.className = 'nav-dropdown-header';
            
            // Localize header text based on current lang
            const isTr = document.documentElement.lang === 'tr';
            header.innerText = isTr ? "Kullanıldığı Yerler:" : "Used In:";
            dropdown.appendChild(header);

            validTargets.forEach(id => {
                const targetEl = document.getElementById(id);
                if (targetEl) {
                    // Extract Titles from the DOM element we are jumping to
                    // We assume standard .job-title / .company classes exist inside the target
                    const role = targetEl.querySelector('.job-title')?.innerText || "Unknown Role";
                    const company = targetEl.querySelector('.company')?.innerText || "";

                    const item = document.createElement('button');
                    item.className = 'nav-item';
                    item.innerHTML = `
                        ${role}
                        <span class="nav-context">${company}</span>
                    `;
                    
                    // Click handling for the navigation item
                    item.onclick = () => {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Add a temporary highlight flash
                        const originalTransition = targetEl.style.transition;
                        const originalBg = targetEl.style.backgroundColor; // Capture computed style if needed, but here simple reset works
                        
                        targetEl.style.transition = "background-color 0.5s ease";
                        targetEl.style.backgroundColor = "rgba(108, 92, 231, 0.1)"; // Slight violet tint
                        
                        setTimeout(() => { 
                            targetEl.style.backgroundColor = "var(--card-bg)"; // Reset to theme card color
                            // Restore transition property after animation clears
                            setTimeout(() => { targetEl.style.transition = originalTransition; }, 500);
                        }, 800);
                        
                        dropdown.remove();
                    };
                    
                    dropdown.appendChild(item);
                }
            });

            // 5. Position Dropdown
            document.body.appendChild(dropdown);
            const rect = btn.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            // Simple positioning: Below the button, aligned left
            dropdown.style.top = `${rect.bottom + scrollTop + 6}px`;
            dropdown.style.left = `${rect.left + scrollLeft}px`;
            
            // Edge detection (optional): if it goes off-screen right, align right
            const dropdownRect = dropdown.getBoundingClientRect();
            if (dropdownRect.right > window.innerWidth) {
                dropdown.style.left = 'auto';
                dropdown.style.right = '20px'; // Safe margin from right edge
            }
        }
    });
}

// --- 4. EVENTS & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Detect language from storage or browser settings
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    let currentLang = savedLang || browserLang;

    // Initial Render
    renderResume(currentLang);
    
    // Initialize Navigation Logic
    setupSkillNavigation();

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
