(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    // --- 1. XSS PROTECTION ---
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return unsafe;
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // --- 2. UNIVERSAL SCRAPER ---
    function scrapeData(node, lang) {
        if (node === null || typeof node !== 'object') return node;
        if (Array.isArray(node)) {
            return node.map(item => scrapeData(item, lang));
        }
        if (node.tr && node.en) {
            return node[lang];
        }
        const localized = {};
        for (const key in node) {
            localized[key] = scrapeData(node[key], lang);
        }
        return localized;
    }

    // --- 3. SUB-RENDERERS (Dumb & Clean) ---
    function getRelevantSkills(id, skillCategories) {
        const relevant = [];
        if (!id || !skillCategories) return relevant;

        skillCategories.forEach(cat => {
            if (cat.items) {
                cat.items.forEach(skill => {
                    // Data is already localized: skill.name is a string
                    if (skill.targets && skill.targets.includes(id)) {
                        relevant.push({ label: skill.name, targets: skill.targets });
                    }
                });
            }
        });
        return relevant;
    }

    function renderBlock(items, skillCategories, lang) {
        if (!items) return '';

        return items.map(item => {
            let title = item.jobTitle || item.name || item.award;

            let sub = "";
            if (item.worksFor) {
                sub = item.worksFor.name ? item.worksFor.name : item.worksFor;
            } else if (item.creator) {
                sub = item.creator.jobTitle ? item.creator.jobTitle : item.creator;
            } else if (item['@type'] === 'EducationalOrganization') {
                // For Education: Title = Degree (Award), Sub = School (Name)
                title = item.award;
                sub = item.name;
            }

            const date = item.startDate || item.dateCreated;
            const desc = item.description;

            let locationHTML = '';
            if (item.links) {
                locationHTML = item.links.map(link =>
                    `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
                ).join(' <span class="sep">·</span> ');
            } else {
                let loc = item.location;
                if (item.url) {
                    locationHTML = `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(loc)}</a>`;
                } else if (loc && loc.includes('.') && !loc.includes(' ')) {
                    locationHTML = `<a href="https://${escapeHtml(loc)}" target="_blank" rel="noopener noreferrer">${escapeHtml(loc)}</a>`;
                } else {
                    locationHTML = escapeHtml(loc);
                }
            }

            const relevantSkills = getRelevantSkills(item.id, skillCategories);
            const tagsHTML = relevantSkills.length > 0 ?
                `<div class="tags-wrapper branding-tags">
                    ${relevantSkills.map(s =>
                    `<button class="skill-tag" 
                                data-targets="${s.targets.join(',')}" 
                                data-origin="${item.id}">
                            ${escapeHtml(s.label)}
                        </button>`
                ).join('')}
                </div>` : '';

            const toggleText = lang === 'tr' ? 'Detayları Göster' : 'Show Details';

            return `
            <div class="job-block" id="${item.id}">
                <div class="job-header">
                    <span class="job-title">${escapeHtml(title)}</span>
                    <span class="job-date">${escapeHtml(date)}</span>
                </div>
                <div class="job-subheader">
                    <span class="company">${escapeHtml(sub)}</span>
                    <span class="location">${locationHTML}</span>
                </div>
                <div class="job-content">
                    <button class="desc-toggle" aria-expanded="false" aria-label="${toggleText}">
                        <svg class="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="job-description collapsed">
                        <div class="desc-inner"><p>${escapeHtml(desc)}</p></div>
                    </div>
                    ${tagsHTML}
                </div>
            </div>`;
        }).join('');
    }

    function renderTags(skillCategories) {
        if (!skillCategories) return '';
        return `<div class="job-block skills-container">
            ${skillCategories.map(cat => `
                <div class="skill-category">
                    <h3 class="skill-category-title">${escapeHtml(cat.category)}</h3>
                    <div class="tags-wrapper">
                        ${cat.items.map(skill =>
            `<button class="skill-tag" 
                                     data-targets="${skill.targets ? skill.targets.join(',') : ''}" 
                                     data-origin="summary">
                                ${escapeHtml(skill.name)}
                            </button>`
        ).join('')}
                    </div>
                </div>`
        ).join('')}
        </div>`;
    }

    function renderGrid(languages) {
        if (!languages) return '';
        return `
        <div class="job-block">
            <div class="lang-grid">
                ${languages.map(l => `
                    <div class="lang-item">
                        <span class="lang-title">${escapeHtml(l.name)}</span>
                        <span class="lang-level">${escapeHtml(l.proficiencyLevel)}</span>
                    </div>`
        ).join('')}
            </div>
        </div>`;
    }

    // --- 4. MAIN LAYOUT RENDERER ---
    function renderLayout(cleanData, lang) {
        if (!cleanData.structure) return '<p>Error: Structure missing</p>';

        const skillData = cleanData.person.knowsAbout;

        return cleanData.structure.map(section => {
            const title = cleanData.ui[section.titleKey];

            // Navigate data path (e.g., "person.hasOccupation")
            let contentData = cleanData;
            if (section.dataKey) {
                section.dataKey.split('.').forEach(k => {
                    contentData = (contentData && contentData[k]) ? contentData[k] : null;
                });
            }

            let contentHTML = '';
            if (section.type === 'text') {
                contentHTML = contentData ? `<p>${escapeHtml(contentData)}</p>` : '';
            } else if (section.type === 'list') {
                contentHTML = renderBlock(contentData, skillData, lang);
            } else if (section.type === 'tags') {
                contentHTML = renderTags(contentData);
            } else if (section.type === 'grid') {
                contentHTML = renderGrid(contentData);
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

    // --- 5. METADATA & JSON-LD INJECTOR ---
    function updateMetadata(doc, cleanData) {
        if (!doc || !cleanData) return;

        // 1. Meta Tags
        const title = cleanData.ui.documentTitle;
        const desc = cleanData.ui.seoDesc;
        const absImgUrl = `${cleanData.meta.baseUrl}/${cleanData.meta.image}`;

        doc.title = title;

        const setMeta = (sel, attr, val) => {
            const el = doc.querySelector(sel);
            if (el) el.setAttribute(attr, val);
        };

        setMeta('meta[name="description"]', 'content', desc);
        setMeta('link[rel="canonical"]', 'href', cleanData.meta.baseUrl + '/');
        setMeta('meta[property="og:title"]', 'content', title);
        setMeta('meta[property="og:description"]', 'content', desc);
        setMeta('meta[property="og:image"]', 'content', absImgUrl);
        setMeta('meta[name="twitter:title"]', 'content', title);
        setMeta('meta[name="twitter:description"]', 'content', desc);
        setMeta('meta[name="twitter:image"]', 'content', absImgUrl);

        // 2. JSON-LD Injection
        const jsonLdScript = doc.getElementById('json-ld');
        if (jsonLdScript && cleanData.jsonLd) {
            jsonLdScript.textContent = JSON.stringify(cleanData.jsonLd, null, 2);
        }
    }

    return { renderLayout, updateMetadata, scrapeData };
}));