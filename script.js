(function () {
    "use strict";

    const data = window.resumeData;
    const utils = window.resumeUtils;

    if (!data || !utils) {
        console.error("Critical Dependency Missing: resumeData or resumeUtils not found.");
        return;
    }

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

    const State = {
        lang: localStorage.getItem('preferredLang') || (navigator.language.startsWith('tr') ? 'tr' : 'en'),
    };

    // --- 1. MAIN RENDER ---
    function renderResume(lang) {
        const scrollPos = window.scrollY;

        // A. UNIVERSAL SCRAPE

        const localizedData = utils.scrapeData(data, lang);

        // B. UPDATE METADATA (Title, Meta Tags, JSON-LD)
        utils.updateMetadata(document, localizedData);

        // C. SET LANGUAGE ATTRIBUTE
        DOM.html.lang = lang;

        // D. UPDATE HEADER (Using clean localizedData)
        if (DOM.header.name) DOM.header.name.textContent = localizedData.person.name;
        if (DOM.header.title) DOM.header.title.textContent = localizedData.person.jobTitle;
        if (DOM.header.location) DOM.header.location.textContent = localizedData.meta.location;
        if (DOM.header.printBtn) DOM.header.printBtn.textContent = localizedData.ui.print;

        if (DOM.header.email) {
            DOM.header.email.textContent = localizedData.meta.email;
            DOM.header.email.href = `mailto:${localizedData.meta.email}`;
        }

        if (DOM.header.linkedin) {
            DOM.header.linkedin.textContent = localizedData.meta.linkedinLabel;
            DOM.header.linkedin.href = localizedData.meta.linkedin;
        }

        // E. RENDER CONTENT LAYOUT
        const mainHTML = utils.renderLayout(localizedData, lang);

        // Update DOM only if changed to prevent unnecessary repaints
        if (DOM.mainContent.innerHTML !== mainHTML) {
            DOM.mainContent.innerHTML = mainHTML;
            handleContentAnimations(scrollPos);
        }

        // F. RESTORE STATE & STYLE
        window.scrollTo(0, scrollPos);

        if (DOM.btns.tr) DOM.btns.tr.setAttribute('aria-pressed', lang === 'tr');
        if (DOM.btns.en) DOM.btns.en.setAttribute('aria-pressed', lang === 'en');

        // Skill Tag Staggering Animation
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            tag.style.animationDelay = `${(index + 1) * 0.05}s`;
        });

        DOM.body.classList.remove('lang-tr', 'lang-en');
        DOM.body.classList.add(`lang-${lang}`);
    }

    function handleContentAnimations(scrollPos) {
        const sections = DOM.mainContent.querySelectorAll('section');
        if (scrollPos < 100) {
            sections.forEach((section, index) => {
                section.style.opacity = "0";
                section.style.animation = `slideUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
            });
        } else {
            sections.forEach(section => {
                section.style.opacity = "1";
                section.style.animation = "none";
                section.style.transform = "translateY(0)";
            });
        }
    }

    // --- 2. INTERACTIVITY ---
    function createPopover(btn, targets, summaryId) {
        const isTr = DOM.html.lang === 'tr';
        const dropdown = document.createElement('div');
        dropdown.className = 'nav-dropdown';
        dropdown._triggerBtn = btn;

        const header = document.createElement('div');
        header.className = 'nav-dropdown-header';
        header.innerText = isTr ? "Bağlantılar:" : "Connections:";
        dropdown.appendChild(header);

        targets.forEach(id => {
            const targetEl = document.getElementById(id);
            if (!targetEl) return;

            let role, context;
            if (id === summaryId) {
                role = isTr ? "Yetkinlik Özeti" : "Skills Summary";
                context = isTr ? "Kategoriyi Görüntüle" : "View Category";
            } else {
                // Scrape text directly from the rendered DOM
                // This works because the DOM is already localized
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
                existing.remove();
                return;
            }
            existing.remove();
        }

        const targetIds = btn.dataset.targets ? btn.dataset.targets.split(',') : [];
        const originId = btn.dataset.origin;
        const validTargets = targetIds.filter(id => id !== originId);

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

    function handleOutsideClick(e) {
        const existingDropdown = document.querySelector('.nav-dropdown');
        if (existingDropdown && !e.target.closest('.skill-tag')) {
            existingDropdown.remove();
        }
    }

    // --- 3. INIT ---
    function init() {
        renderResume(State.lang);

        DOM.body.addEventListener('click', (e) => {
            handleSkillClick(e);
            handleDescriptionToggle(e);
        });
        document.addEventListener('click', handleOutsideClick);

        const setLang = (lang) => {
            localStorage.setItem('preferredLang', lang);
            State.lang = lang;
            renderResume(lang);
        };
        if (DOM.btns.tr) DOM.btns.tr.addEventListener('click', () => setLang('tr'));
        if (DOM.btns.en) DOM.btns.en.addEventListener('click', () => setLang('en'));


        if (DOM.btns.print) DOM.btns.print.addEventListener('click', () => window.print());

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