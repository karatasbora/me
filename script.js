// script.js

(function () {
    "use strict";

    // Dependencies
    const data = window.resumeData;
    const utils = window.resumeUtils;

    if (!data || !utils) {
        console.error("Critical Dependency Missing: resumeData or resumeUtils not found.");
        return;
    }

    // --- DOM CACHE ---
    const DOM = {
        docTitle: document.title,
        html: document.documentElement,
        body: document.body,
        head: document.head,
        mainContent: document.getElementById('main-content'),

        // Header Elements
        header: {
            name: document.getElementById('p-name'),
            title: document.getElementById('p-title'),
            location: document.getElementById('p-location'),
            email: document.getElementById('link-email'),
            linkedin: document.getElementById('link-linkedin'),
            printBtn: document.getElementById('ui-print'),
        },

        // Controls
        btns: {
            tr: document.getElementById('btn-tr'),
            en: document.getElementById('btn-en'),
            print: document.getElementById('btn-print'),
            theme: document.getElementById('btn-theme'),
            jsonLd: document.getElementById('json-ld')
        }
    };

    // --- STATE ---
    const State = {
        lang: localStorage.getItem('preferredLang') || (navigator.language.startsWith('tr') ? 'tr' : 'en'),
    };

    // --- 1. MAIN RENDER ---
    function renderResume(lang) {
        const scrollPos = window.scrollY;

        // Centralized Metadata Update
        utils.updateMetadata(document, data, lang);

        DOM.html.lang = lang;

        // Header Updates
        if (DOM.header.name) DOM.header.name.textContent = data.profile.name;
        if (DOM.header.title) DOM.header.title.textContent = data.profile.title[lang];
        if (DOM.header.location) DOM.header.location.textContent = data.meta.location[lang];

        if (DOM.header.email) {
            DOM.header.email.textContent = data.meta.email;
            DOM.header.email.href = `mailto:${data.meta.email}`;
        }

        if (DOM.header.linkedin) {
            DOM.header.linkedin.textContent = data.meta.linkedinLabel;
            DOM.header.linkedin.href = data.meta.linkedin;
        }

        if (DOM.header.printBtn) DOM.header.printBtn.textContent = data.ui.print[lang];

        // Content Rendering
        const mainHTML = utils.renderLayout(data, lang);

        // Update DOM only if changed
        if (DOM.mainContent.innerHTML !== mainHTML) {
            DOM.mainContent.innerHTML = mainHTML;
            handleContentAnimations(scrollPos);
        }

        // Restore State
        window.scrollTo(0, scrollPos);

        if (DOM.btns.tr) DOM.btns.tr.setAttribute('aria-pressed', lang === 'tr');
        if (DOM.btns.en) DOM.btns.en.setAttribute('aria-pressed', lang === 'en');

        // Skill Tag Staggering
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            tag.style.animationDelay = `${(index + 1) * 0.05}s`;
        });

        DOM.body.classList.remove('lang-tr', 'lang-en');
        DOM.body.classList.add(`lang-${lang}`);
    }

    function handleContentAnimations(scrollPos) {
        const sections = DOM.mainContent.querySelectorAll('section');

        if (scrollPos < 100) {
            // Fresh load animation
            sections.forEach((section, index) => {
                section.style.opacity = "0";
                section.style.animation = `slideUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
            });
        } else {
            // Instant visibility
            sections.forEach(section => {
                section.style.opacity = "1";
                section.style.animation = "none";
                section.style.transform = "translateY(0)";
            });
        }
    }

    // --- 2. INTERACTIVITY ---

    // Skill Popover Logic
    function createPopover(btn, targets, summaryId) {
        const isTr = DOM.html.lang === 'tr';
        const dropdown = document.createElement('div');
        dropdown.className = 'nav-dropdown';
        dropdown._triggerBtn = btn;

        // Header
        const header = document.createElement('div');
        header.className = 'nav-dropdown-header';
        header.innerText = isTr ? "Bağlantılar:" : "Connections:";
        dropdown.appendChild(header);

        // Items
        targets.forEach(id => {
            const targetEl = document.getElementById(id);
            if (!targetEl) return;

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
            item.innerHTML = `${role}<span class="nav-context">${context}</span>`;
            item.onclick = () => {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                highlightElement(targetEl);
                dropdown.remove();
            };
            dropdown.appendChild(item);
        });

        DOM.body.appendChild(dropdown);
        positionPopover(dropdown, btn);
    }

    function positionPopover(dropdown, btn) {
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

    function highlightElement(el) {
        const originalTransition = el.style.transition;
        el.style.transition = "background-color 0.5s ease";
        el.style.backgroundColor = "rgba(108, 92, 231, 0.1)";

        setTimeout(() => {
            el.style.backgroundColor = "var(--card-bg)";
            setTimeout(() => { el.style.transition = originalTransition; }, 500);
        }, 800);
    }

    function handleSkillClick(e) {
        const btn = e.target.closest('.skill-tag');
        if (!btn) return;

        e.preventDefault();
        e.stopPropagation();

        const existing = document.querySelector('.nav-dropdown');
        if (existing) {
            if (existing._triggerBtn === btn) {
                existing.remove(); // Toggle off
                return;
            }
            existing.remove();
        }

        const targetIds = btn.dataset.targets ? btn.dataset.targets.split(',') : [];
        const originId = btn.dataset.origin;
        const validTargets = targetIds.filter(id => id !== originId);

        // Add "Back to hub" link if not already on it
        const summaryId = 'skills-list';
        if (originId !== 'summary' && originId !== summaryId) {
            validTargets.push(summaryId);
        }

        if (validTargets.length > 0) {
            createPopover(btn, validTargets, summaryId);
        }
    }

    function handleDescriptionToggle(e) {
        const toggleBtn = e.target.closest('.desc-toggle');
        if (!toggleBtn) return;

        const contentDiv = toggleBtn.parentElement;
        const descriptionDiv = contentDiv.querySelector('.job-description');

        if (descriptionDiv) {
            const isExpanded = descriptionDiv.classList.toggle('expanded');
            toggleBtn.setAttribute('aria-expanded', isExpanded);
        }
    }

    // Popover Close Listener
    function handleOutsideClick(e) {
        const existingDropdown = document.querySelector('.nav-dropdown');
        if (existingDropdown && !e.target.closest('.skill-tag')) {
            existingDropdown.remove();
        }
    }

    // --- 3. INIT ---
    function init() {
        renderResume(State.lang);

        // Event Delegation
        DOM.body.addEventListener('click', (e) => {
            handleSkillClick(e);
            handleDescriptionToggle(e);
        });
        document.addEventListener('click', handleOutsideClick);

        // Language Switch
        const setLang = (lang) => {
            localStorage.setItem('preferredLang', lang);
            State.lang = lang;
            renderResume(lang);
        };
        if (DOM.btns.tr) DOM.btns.tr.addEventListener('click', () => setLang('tr'));
        if (DOM.btns.en) DOM.btns.en.addEventListener('click', () => setLang('en'));

        // Print
        if (DOM.btns.print) DOM.btns.print.addEventListener('click', () => window.print());

        // Theme Toggle
        if (DOM.btns.theme) {
            DOM.btns.theme.addEventListener('click', () => {
                const isDark = DOM.html.getAttribute('data-theme') === 'dark';
                if (isDark) {
                    DOM.html.removeAttribute('data-theme');
                    localStorage.setItem('theme-preference', 'light');
                } else {
                    DOM.html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme-preference', 'dark');
                }
            });
        }

        // Copy Email
        if (DOM.header.email) {
            DOM.header.email.addEventListener('click', (e) => {
                e.preventDefault();
                const emailText = data.meta.email;
                const isTr = DOM.html.lang === 'tr';

                navigator.clipboard.writeText(emailText).then(() => {
                    DOM.header.email.setAttribute('data-copy-text', isTr ? "Kopyalandı!" : "Copied!");
                    DOM.header.email.classList.add('copied');
                    setTimeout(() => DOM.header.email.classList.remove('copied'), 2000);
                }).catch(err => console.error('Failed to copy', err));
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);

})();
