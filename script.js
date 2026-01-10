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
    updateJSONLD(lang);
}

function updateJSONLD(lang) {
    try {
        const jsonLdScript = document.getElementById('json-ld');
        if (!jsonLdScript) return;

        const isTr = lang === 'tr';

        // Helper to get text based on lang
        const getText = (obj) => obj[lang] || obj;

        const schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "name": "Bora Karataş",
                    "url": "https://karatasbora.github.io/me/"
                },
                {
                    "@type": "ProfilePage",
                    "name": resumeData.ui.documentTitle[lang],
                    "url": "https://karatasbora.github.io/me/",
                    "mainEntity": {
                        "@type": "Person",
                        "name": resumeData.profile.name,
                        "jobTitle": resumeData.ui.jobTitleShort[lang],
                        "description": resumeData.ui.seoDesc[lang],
                        "image": resumeData.meta.image,
                        "url": "https://karatasbora.github.io/me/",
                        "sameAs": [
                            resumeData.meta.linkedin,
                            `mailto:${resumeData.meta.email}`
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": resumeData.meta.location[lang]
                        },
                        "worksFor": resumeData.experience.map(job => ({
                            "@type": "Organization",
                            "name": getText(job.company).split('|')[1]?.trim() || getText(job.company) // Extract Company Name if formatted
                        })),
                        "alumniOf": resumeData.education.map(edu => ({
                            "@type": "EducationalOrganization",
                            "name": getText(edu.school)
                        })),
                        "knowsAbout": resumeData.skills.flatMap(cat => cat.items.map(item => getText(item))).slice(0, 10), // Limit to top 10 for neatness
                        "knowsLanguage": resumeData.languages.map(l => ({
                            "@type": "Language",
                            "name": getText(l.name),
                            "additionalType": getText(l.level)
                        }))
                    }
                }
            ]
        };

        jsonLdScript.textContent = JSON.stringify(schema, null, 2);
    } catch (e) { console.warn("JSON-LD update failed", e); }
}



// --- 2. MAIN RENDER FUNCTION (Improved UX) ---
function renderResume(lang) {
    // 1. CAPTURE SCROLL STATE to prevent jumping
    const scrollPos = window.scrollY;

    updateSEO(lang);
    document.documentElement.lang = lang;

    // 2. HEADER UPDATES (Static IDs)
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
    if (printBtn) printBtn.textContent = resumeData.ui.print[lang];

    // 3. MAIN CONTENT (Dynamic Generation)
    const mainHTML = resumeUtils.renderLayout(resumeData, lang);
    const mainContent = document.getElementById('main-content');

    // Only update DOM if content actually changed (Performance + State Safety)
    if (mainContent.innerHTML !== mainHTML) {
        mainContent.innerHTML = mainHTML;

        // 4. SMART ANIMATIONS
        // If user is near the top (fresh load), play the slide-up animation.
        // If user is scrolled down (reading), skip animation to prevent jarring UI shifts.
        if (scrollPos < 100) {
            const sections = mainContent.querySelectorAll('section');
            sections.forEach((section, index) => {
                section.style.opacity = "0";
                section.style.animation = `slideUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
            });
        } else {
            // Force visibility immediately if scrolled down
            const sections = mainContent.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = "1";
                section.style.animation = "none";
                section.style.transform = "translateY(0)";
            });
        }
    }

    // 5. RESTORE SCROLL STATE
    window.scrollTo(0, scrollPos);

    // 6. STATES & UI UPDATES
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

// --- 3. SKILL NAVIGATION LOGIC ---
function setupSkillNavigation() {
    // A. Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        const existingDropdown = document.querySelector('.nav-dropdown');
        if (existingDropdown && !e.target.closest('.skill-tag')) {
            existingDropdown.remove();
        }
    });

    // B. Handle clicks on Skill Tags
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.skill-tag');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();

            const existing = document.querySelector('.nav-dropdown');

            // 1. CHECK FOR TOGGLE / CLEANUP
            if (existing) {
                // If clicking the SAME button that opened the current dropdown, close it (Toggle Off)
                if (existing._triggerBtn === btn) {
                    existing.remove();
                    return;
                }
                // Otherwise, close the old one and proceed to open the new one
                existing.remove();
            }

            // 2. Get Data
            const targetIds = btn.dataset.targets ? btn.dataset.targets.split(',') : [];
            const originId = btn.dataset.origin;

            // 3. Filter targets
            let validTargets = targetIds.filter(id => id !== originId);

            // Back to Hub Logic
            const summaryId = 'skills-list';
            if (originId !== 'summary' && originId !== summaryId) {
                validTargets.push(summaryId);
            }

            if (validTargets.length === 0) return;

            // 4. Create Dropdown HTML
            const dropdown = document.createElement('div');
            dropdown.className = 'nav-dropdown';
            dropdown._triggerBtn = btn; // Store reference to allow toggling later

            const header = document.createElement('div');
            header.className = 'nav-dropdown-header';

            const isTr = document.documentElement.lang === 'tr';
            header.innerText = isTr ? "Bağlantılar:" : "Connections:";
            dropdown.appendChild(header);

            validTargets.forEach(id => {
                const targetEl = document.getElementById(id);
                if (targetEl) {
                    let role, context;

                    if (id === summaryId) {
                        role = isTr ? "Yetkinlik Özeti" : "Skills Summary";
                        context = isTr ? "Kategoriyi Görüntüle" : "View Category";
                    } else {
                        role = targetEl.querySelector('.job-title')?.innerText || "Unknown Role";
                        context = targetEl.querySelector('.company')?.innerText || "";
                    }

                    const item = document.createElement('button');
                    item.className = 'nav-item';
                    item.innerHTML = `
                        ${role}
                        <span class="nav-context">${context}</span>
                    `;

                    item.onclick = () => {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        const originalTransition = targetEl.style.transition;
                        targetEl.style.transition = "background-color 0.5s ease";
                        targetEl.style.backgroundColor = "rgba(108, 92, 231, 0.1)";

                        setTimeout(() => {
                            targetEl.style.backgroundColor = "var(--card-bg)";
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

            dropdown.style.top = `${rect.bottom + scrollTop + 6}px`;
            dropdown.style.left = `${rect.left + scrollLeft}px`;

            const dropdownRect = dropdown.getBoundingClientRect();
            if (dropdownRect.right > window.innerWidth) {
                dropdown.style.left = 'auto';
                dropdown.style.right = '20px';
            }
        }
    });
}

// --- 4. DESCRIPTION ACCORDION LOGIC ---
function setupDescriptionToggles() {
    document.body.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.desc-toggle');
        if (!toggleBtn) return;

        const contentDiv = toggleBtn.parentElement;
        const descriptionDiv = contentDiv.querySelector('.job-description');

        if (descriptionDiv) {
            const isExpanded = descriptionDiv.classList.contains('expanded');

            if (isExpanded) {
                descriptionDiv.classList.remove('expanded');
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                descriptionDiv.classList.add('expanded');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        }
    });
}

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('tr') ? 'tr' : 'en';
    let currentLang = savedLang || browserLang;

    renderResume(currentLang);
    setupSkillNavigation();
    setupDescriptionToggles();

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
