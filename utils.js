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

    // --- CENTRALIZED METADATA LOGIC ---
    function generateSchema(data, lang) {
        if (!data) return {};

        // Helper to get text based on lang
        const getText = (obj) => (obj && obj[lang]) ? obj[lang] : obj;
        const absImgUrl = `${data.meta.baseUrl}/${data.meta.image}`;

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "name": data.profile.name,
                    "url": data.meta.baseUrl + "/"
                },
                {
                    "@type": "ProfilePage",
                    "name": data.ui.documentTitle[lang],
                    "url": data.meta.baseUrl + "/",
                    "mainEntity": {
                        "@type": "Person",
                        "name": data.profile.name,
                        "jobTitle": data.ui.jobTitleShort[lang],
                        "description": data.ui.seoDesc[lang],
                        "image": absImgUrl,
                        "url": data.meta.baseUrl + "/",
                        "sameAs": [
                            data.meta.linkedin,
                            `mailto:${data.meta.email}`
                        ],
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": data.meta.location[lang]
                        },
                        "worksFor": data.experience.map(job => ({
                            "@type": "Organization",
                            "name": getText(job.company).split('|')[1]?.trim() || getText(job.company)
                        })),
                        "alumniOf": data.education.map(edu => ({
                            "@type": "EducationalOrganization",
                            "name": getText(edu.school)
                        })),
                        // Limit skills to top 10 for neatness
                        "knowsAbout": data.skills ? data.skills.flatMap(cat => cat.items.map(item => getText(item))).slice(0, 10) : [],
                        "knowsLanguage": data.languages ? data.languages.map(l => ({
                            "@type": "Language",
                            "name": getText(l.name),
                            "additionalType": getText(l.level)
                        })) : []
                    }
                }
            ]
        };
    }

    function updateMetadata(doc, data, lang) {
        if (!doc || !data) return;

        const { documentTitle, seoDesc } = data.ui;
        const title = documentTitle[lang];
        const desc = seoDesc[lang];
        const absImgUrl = `${data.meta.baseUrl}/${data.meta.image}`;

        // 1. Update Title
        doc.title = title;

        // 2. Helper for meta tags
        const setMeta = (selector, attr, val) => {
            const el = doc.querySelector(selector);
            if (el) el.setAttribute(attr, val);
        };

        // 3. Standard Meta
        setMeta('meta[name="description"]', 'content', desc);
        setMeta('meta[name="keywords"]', 'content', data.meta.keywords[lang]);
        setMeta('link[rel="canonical"]', 'href', data.meta.baseUrl + '/');

        // 4. Open Graph
        setMeta('meta[property="og:title"]', 'content', title);
        setMeta('meta[property="og:description"]', 'content', desc);
        setMeta('meta[property="og:image"]', 'content', absImgUrl);
        setMeta('meta[property="og:url"]', 'content', data.meta.baseUrl + '/');

        // 5. Twitter
        setMeta('meta[name="twitter:title"]', 'content', title);
        setMeta('meta[name="twitter:description"]', 'content', desc);
        setMeta('meta[name="twitter:image"]', 'content', absImgUrl);

        // 6. JSON-LD
        const jsonLdScript = doc.getElementById('json-ld');
        if (jsonLdScript) {
            try {
                const schema = generateSchema(data, lang);
                jsonLdScript.textContent = JSON.stringify(schema, null, 2);
            } catch (e) {
                console.warn("JSON-LD update failed in utils:", e);
            }
        }
    }

    return { renderLayout, updateMetadata, generateSchema };
}));
