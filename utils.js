// utils.js

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    // --- NEW: XSS PROTECTION ---
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return unsafe;
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // --- HELPER: GET SKILLS FOR A JOB ---
    function getRelevantSkills(id, skillCategories, lang) {
        const relevant = [];
        if (!id || !skillCategories) return relevant;

        skillCategories.forEach(cat => {
            if (cat.items) {
                cat.items.forEach(skill => {
                    if (skill.targets && skill.targets.includes(id)) {
                        relevant.push({
                            label: skill[lang],
                            targets: skill.targets
                        });
                    }
                });
            }
        });
        return relevant;
    }

    // --- SUB-RENDERERS ---

    function renderBlock(items, lang, skillCategories) {
        if (!items) return '';
        return items.map(item => {
            const relevantSkills = getRelevantSkills(item.id, skillCategories, lang);

            const tagsHTML = (relevantSkills.length > 0)
                ? `<div class="tags-wrapper branding-tags">
                    ${relevantSkills.map(s => `
                        <button class="skill-tag" 
                                data-targets="${s.targets.join(',')}" 
                                data-origin="${item.id}">
                            ${escapeHtml(s.label)}
                        </button>
                    `).join('')}
                  </div>`
                : '';

            const toggleText = lang === 'tr' ? 'Detayları Göster' : 'Show Details';

            // Determine display fields
            const role = item.role ? item.role[lang] : item.degree[lang];
            const company = item.company ? item.company[lang] : item.school[lang];

            // --- MODIFIED: Multi-Link Support ---
            let locationHTML = '';

            if (item.links) {
                // If 'links' array exists, render them separated by a dot
                locationHTML = item.links.map(link =>
                    `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label[lang])}</a>`
                ).join(' <span class="sep">·</span> ');
            } else {
                // Fallback: Standard location text (with optional single URL)
                locationHTML = escapeHtml(item.location[lang]);
                if (item.url) {
                    locationHTML = `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${locationHTML}</a>`;
                }
            }

            return `
            <div class="job-block" id="${item.id}">
                <div class="job-header">
                    <span class="job-title">${escapeHtml(role)}</span>
                    <span class="job-date">${escapeHtml(item.date[lang])}</span>
                </div>
                <div class="job-subheader">
                    <span class="company">${escapeHtml(company)}</span>
                    <span class="location">${locationHTML}</span>
                </div>
                
                <div class="job-content">
                    <button class="desc-toggle" aria-expanded="false" aria-label="${toggleText}">
                        <svg class="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div class="job-description collapsed">
                        <div class="desc-inner">
                            <p>${escapeHtml(item.desc[lang])}</p>
                        </div>
                    </div>

                    ${tagsHTML}
                </div>
            </div>`;
        }).join('');
    }

    function renderTags(skillCategories, lang) {
        if (!skillCategories) return '';

        const categoryBlocks = skillCategories.map(cat => {
            const categoryTitle = escapeHtml(cat.category[lang]);

            const skillsHTML = cat.items.map(skill =>
                `<button class="skill-tag" data-targets="${skill.targets.join(',')}" data-origin="summary">${escapeHtml(skill[lang])}</button>`
            ).join('');

            return `<div class="skill-category">` +
                `<h3 class="skill-category-title">${categoryTitle}</h3>` +
                `<div class="tags-wrapper">` +
                skillsHTML +
                `</div>` +
                `</div>`;
        });

        return `<div class="job-block skills-container">${categoryBlocks.join('\n')}</div>`;
    }

    function renderGrid(languages, lang) {
        if (!languages) return '';
        return `
        <div class="job-block">
            <div class="lang-grid">
                ${languages.map(l => `
                    <div class="lang-item">
                        <span class="lang-title">${escapeHtml(l.name[lang])}</span>
                        <span class="lang-level">${escapeHtml(l.level[lang])}</span>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }

    // --- MAIN RENDERER ---
    function renderLayout(data, lang) {
        if (!data.structure) return '<p>Error: No structure defined in data.js</p>';

        return data.structure.map(section => {
            const title = data.ui[section.titleKey] ? data.ui[section.titleKey][lang] : section.titleKey;
            let contentHTML = '';

            let contentData = data;
            if (section.dataKey) {
                const keys = section.dataKey.split('.');
                for (let k of keys) contentData = (contentData && contentData[k]) ? contentData[k] : null;
            }

            if (section.type === 'text') {
                contentHTML = contentData ? `<p>${escapeHtml(contentData[lang])}</p>` : '';
            } else if (section.type === 'list') {
                contentHTML = renderBlock(contentData, lang, data.skills);
            } else if (section.type === 'tags') {
                contentHTML = renderTags(contentData, lang);
            } else if (section.type === 'grid') {
                contentHTML = renderGrid(contentData, lang);
            }

            return `
            <section>
                <h2 id="ui-${section.titleKey}">${escapeHtml(title)}</h2>
                <div id="${section.titleKey}-list">
                    ${contentHTML}
                </div>
            </section>`;
        }).join('');
    }

    return { renderLayout };
}));
