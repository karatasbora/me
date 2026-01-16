(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

    const SVG_NS = "http://www.w3.org/2000/svg";

    // --- 1. DATA HELPERS ---
    function getAvailableLanguages(node, collected = new Set()) {
        if (node === null || typeof node !== 'object') return Array.from(collected);

        const keys = Object.keys(node);
        const langKeys = keys.filter(k => k.length === 2 && k !== 'id' && k !== 'ui');

        if (langKeys.length > 0 && (langKeys.includes('en') || langKeys.includes('tr'))) {
            langKeys.forEach(k => collected.add(k));
            return Array.from(collected);
        }

        if (Array.isArray(node)) {
            node.forEach(item => getAvailableLanguages(item, collected));
        } else {
            Object.values(node).forEach(val => getAvailableLanguages(val, collected));
        }

        return Array.from(collected);
    }

    function scrapeData(node, lang) {
        if (node === null || typeof node !== 'object') return node;

        if (node[lang]) {
            return node[lang];
        }

        const keys = Object.keys(node);
        if (keys.includes('en') || keys.includes('tr')) {
            if (node['en']) return node['en'];
            return Object.values(node)[0];
        }

        if (Array.isArray(node)) {
            return node.map(item => scrapeData(item, lang));
        }

        const localized = {};
        for (const key in node) {
            localized[key] = scrapeData(node[key], lang);
        }
        return localized;
    }

    function buildSkillsMap(skillCategories) {
        const map = new Map();
        if (!skillCategories) return map;

        skillCategories.forEach(cat => {
            if (cat.items) {
                cat.items.forEach(skill => {
                    if (skill.targets) {
                        skill.targets.forEach(targetId => {
                            if (!map.has(targetId)) map.set(targetId, []);
                            map.get(targetId).push({ label: skill.name, targets: skill.targets });
                        });
                    }
                });
            }
        });
        return map;
    }

    function getRelevantSkills(id, skillsMap) {
        if (!id || !skillsMap) return [];
        return skillsMap.get(id) || [];
    }

    // --- 2. DOM BUILDERS (Safe & Granular) ---
    function clearElement(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function setAttributes(el, attrs) {
        for (const key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function createIcon(type) {
        if (type === 'chevron') {
            const svg = document.createElementNS(SVG_NS, "svg");
            setAttributes(svg, {
                "class": "chevron-icon",
                "width": "24",
                "height": "24",
                "viewBox": "0 0 24 24",
                "fill": "none",
                "stroke": "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });

            const polyline = document.createElementNS(SVG_NS, "polyline");
            polyline.setAttribute("points", "6 9 12 15 18 9");

            svg.appendChild(polyline);
            return svg;
        }
        return document.createElement('span');
    }

    function createSkillTag(label, targets, origin) {
        const btn = document.createElement('button');
        btn.className = 'skill-tag';
        if (targets) btn.dataset.targets = Array.isArray(targets) ? targets.join(',') : targets;
        if (origin) btn.dataset.origin = origin;
        btn.textContent = label;
        return btn;
    }

    function createBlockItem(item, skillsMap, lang, toggleText) {
        let title = item.jobTitle || item.name || item.award;

        let sub = "";
        if (item.worksFor) {
            sub = item.worksFor.name ? item.worksFor.name : item.worksFor;
        } else if (item.creator) {
            sub = item.creator.jobTitle ? item.creator.jobTitle : item.creator;
        } else if (item['@type'] === 'EducationalOrganization') {
            title = item.award;
            sub = item.name;
        }

        const date = item.startDate || item.dateCreated;
        const desc = item.description;

        const block = document.createElement('div');
        block.className = 'job-block';
        if (item.id) block.id = item.id;

        // Header
        const header = document.createElement('div');
        header.className = 'job-header';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'job-title';
        titleSpan.textContent = title;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'job-date';
        dateSpan.textContent = date;

        header.appendChild(titleSpan);
        header.appendChild(dateSpan);
        block.appendChild(header);

        // Subheader
        const subheader = document.createElement('div');
        subheader.className = 'job-subheader';

        const companySpan = document.createElement('span');
        companySpan.className = 'company';
        companySpan.textContent = sub;

        const locationSpan = document.createElement('span');
        locationSpan.className = 'location';

        // Location Logic
        if (item.links) {
            item.links.forEach((link, idx) => {
                if (idx > 0) {
                    const sep = document.createElement('span');
                    sep.className = 'sep';
                    sep.textContent = ' · ';
                    locationSpan.appendChild(sep);
                }
                const a = document.createElement('a');
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = link.label;
                locationSpan.appendChild(a);
            });
        } else {
            let loc = item.location;
            if (item.url) {
                const a = document.createElement('a');
                a.href = item.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = loc;
                locationSpan.appendChild(a);
            } else if (loc && loc.includes('.') && !loc.includes(' ')) {
                const a = document.createElement('a');
                a.href = 'https://' + loc;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = loc;
                locationSpan.appendChild(a);
            } else {
                locationSpan.textContent = loc;
            }
        }

        subheader.appendChild(companySpan);
        subheader.appendChild(locationSpan);
        block.appendChild(subheader);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'job-content';

        const btnText = toggleText || (lang === 'tr' ? 'Detayları Göster' : 'Show Details');

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'desc-toggle';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', btnText);
        toggleBtn.appendChild(createIcon('chevron'));
        contentDiv.appendChild(toggleBtn);

        const descDiv = document.createElement('div');
        descDiv.className = 'job-description collapsed';

        const descInner = document.createElement('div');
        descInner.className = 'desc-inner';
        const p = document.createElement('p');
        p.textContent = desc;
        descInner.appendChild(p);
        descDiv.appendChild(descInner);
        contentDiv.appendChild(descDiv);

        const relevantSkills = getRelevantSkills(item.id, skillsMap);
        if (relevantSkills.length > 0) {
            const tagsWrapper = document.createElement('div');
            tagsWrapper.className = 'tags-wrapper branding-tags';
            relevantSkills.forEach(s => {
                tagsWrapper.appendChild(createSkillTag(s.label, s.targets, item.id));
            });
            contentDiv.appendChild(tagsWrapper);
        }
        block.appendChild(contentDiv);
        return block;
    }

    function renderBlockList(container, items, skillCategories, lang, toggleText) {
        clearElement(container);
        if (!items) return;

        // Optimized: Build map once, pass to all items
        const skillsMap = buildSkillsMap(skillCategories);

        const fragment = document.createDocumentFragment();
        items.forEach(item => {
            fragment.appendChild(createBlockItem(item, skillsMap, lang, toggleText));
        });
        container.appendChild(fragment);
    }

    function renderTags(container, skillCategories) {
        clearElement(container);
        if (!skillCategories) return;

        const block = document.createElement('div');
        block.className = 'job-block skills-container';

        skillCategories.forEach(cat => {
            const wrapper = document.createElement('div');
            wrapper.className = 'skill-category';

            const h3 = document.createElement('h3');
            h3.className = 'skill-category-title';
            h3.textContent = cat.category;
            wrapper.appendChild(h3);

            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'tags-wrapper';

            cat.items.forEach(skill => {
                tagsDiv.appendChild(createSkillTag(skill.name, skill.targets, 'summary'));
            });
            wrapper.appendChild(tagsDiv);
            block.appendChild(wrapper);
        });
        container.appendChild(block);
    }

    function renderGrid(container, languages) {
        clearElement(container);
        if (!languages) return;

        const block = document.createElement('div');
        block.className = 'job-block';

        const grid = document.createElement('div');
        grid.className = 'lang-grid';

        languages.forEach(l => {
            const item = document.createElement('div');
            item.className = 'lang-item';

            const title = document.createElement('span');
            title.className = 'lang-title';
            title.textContent = l.name;

            const level = document.createElement('span');
            level.className = 'lang-level';
            level.textContent = l.proficiencyLevel;

            item.appendChild(title);
            item.appendChild(level);
            grid.appendChild(item);
        });

        block.appendChild(grid);
        container.appendChild(block);
    }

    // --- 3. PAGE UPDATER ---
    function updatePageContent(doc, cleanData, lang) {
        if (!cleanData.structure) return;

        const skillData = cleanData.person.knowsAbout;

        cleanData.structure.forEach(section => {
            // 1. Update Section Title
            const titleEl = doc.getElementById(`ui-${section.titleKey}`);
            if (titleEl) {
                titleEl.textContent = cleanData.ui[section.titleKey];
            }

            // 2. Update Section Content
            const listContainer = doc.getElementById(`${section.titleKey}-list`);
            if (listContainer) {
                // Navigate data path
                let contentData = cleanData;
                if (section.dataKey) {
                    section.dataKey.split('.').forEach(k => {
                        contentData = (contentData && contentData[k]) ? contentData[k] : null;
                    });
                }

                if (section.type === 'text') {
                    clearElement(listContainer);
                    if (contentData) {
                        const p = document.createElement('p');
                        p.textContent = contentData;
                        listContainer.appendChild(p);
                    }
                } else if (section.type === 'list') {
                    renderBlockList(listContainer, contentData, skillData, lang, cleanData.ui.showDetails);
                } else if (section.type === 'tags') {
                    renderTags(listContainer, contentData);
                } else if (section.type === 'grid') {
                    renderGrid(listContainer, contentData);
                }
            }
        });
    }

    // --- 4. METADATA & JSON-LD INJECTOR ---
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

        if (cleanData.meta && cleanData.meta.verificationCodes) {
            const { google } = cleanData.meta.verificationCodes;
            if (google) {
                let gVerify = doc.querySelector('meta[name="google-site-verification"]');
                if (!gVerify) {
                    gVerify = doc.createElement('meta');
                    gVerify.setAttribute('name', 'google-site-verification');
                    doc.head.appendChild(gVerify);
                }
                gVerify.setAttribute('content', google);
            }
        }

        // 2. JSON-LD Injection
        const jsonLdScript = doc.getElementById('json-ld');
        if (jsonLdScript && cleanData.jsonLd) {
            jsonLdScript.textContent = JSON.stringify(cleanData.jsonLd, null, 2);
        }
    }

    // --- 5. LAYOUT BUILDER (Skeleton Only) ---
    function renderLayout(cleanData, docOverride) {
        const doc = docOverride || document;
        const fragment = doc.createDocumentFragment();

        if (!cleanData.structure) return fragment;

        cleanData.structure.forEach(section => {
            const sectionEl = doc.createElement('section');

            const h2 = doc.createElement('h2');
            h2.id = `ui-${section.titleKey}`;
            // Pre-fill title if available
            if (cleanData.ui && cleanData.ui[section.titleKey]) {
                h2.textContent = cleanData.ui[section.titleKey];
            }
            sectionEl.appendChild(h2);

            const div = doc.createElement('div');
            div.id = `${section.titleKey}-list`;
            sectionEl.appendChild(div);

            fragment.appendChild(sectionEl);
        });

        return fragment;
    }

    return { updatePageContent, updateMetadata, scrapeData, getAvailableLanguages, renderLayout };
}));