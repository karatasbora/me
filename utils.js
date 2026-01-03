// utils.js - Shared rendering logic for Node (SSG) and Browser (CSR)

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    // --- HELPER: GET SKILL OBJECTS FOR A JOB ID ---
    function getRelevantSkills(id, allSkills, lang) {
        if (!id || !allSkills) return [];
        return allSkills
            .filter(skill => skill.targets && skill.targets.includes(id))
            .map(skill => ({
                label: skill[lang],
                targets: skill.targets // Pass the full array of targets
            }));
    }

    // --- SUB-RENDERERS ---
    
    function renderBlock(items, lang, allSkills) {
        if (!items) return '';
        return items.map(item => {
            
            // 1. Fetch full skill objects (with target lists)
            const relevantSkills = getRelevantSkills(item.id, allSkills, lang);
            
            // 2. Render clickable buttons with data attributes
            const tagsHTML = (relevantSkills.length > 0) 
                ? `<div class="tags-wrapper">
                    ${relevantSkills.map(s => `
                        <button class="skill-tag" 
                                data-targets="${s.targets.join(',')}" 
                                data-origin="${item.id}"
                                aria-label="See where ${s.label} is used">
                            ${s.label}
                        </button>
                    `).join('')}
                  </div>` 
                : '';

            // 3. Inject ID into the main block wrapper
            return `
            <div class="job-block" id="${item.id}">
                <div class="job-header">
                    <span class="job-title">${item.role ? item.role[lang] : item.degree[lang]}</span>
                    <span class="job-date">${item.date[lang]}</span>
                </div>
                <div class="job-subheader">
                    <span class="company">${item.company ? item.company[lang] : item.school[lang]}</span>
                    <span class="location">${item.location[lang]}</span>
                </div>
                <div class="job-content">
                    <p>${item.desc[lang]}</p>
                    ${tagsHTML}
                </div>
            </div>`;
        }).join('');
    }

    function renderTags(skills, lang) {
        if (!skills) return '';
        // Render the Master List as clickable buttons too
        return `
        <div class="job-block">
            <div class="tags-wrapper" style="padding-left:0; margin-top: 5px;">
                ${skills.map(skill => `
                    <button class="skill-tag" 
                            data-targets="${skill.targets.join(',')}" 
                            data-origin="summary">
                        ${skill[lang]}
                    </button>
                `).join('')}
            </div>
        </div>`;
    }

    function renderGrid(languages, lang) {
        if (!languages) return '';
        return `
        <div class="job-block" style="margin-top: 30px; border:none;">
            <div class="lang-grid">
                ${languages.map(l => `
                    <div class="lang-item">
                        <span class="lang-title">${l.name[lang]}</span>
                        <span class="lang-level">${l.level[lang]}</span>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }

    // --- MAIN LAYOUT ENGINE ---
    function renderLayout(data, lang) {
        if (!data.structure) return '<p>Error: No structure defined in data.js</p>';

        return data.structure.map(section => {
            const title = data.ui[section.titleKey] ? data.ui[section.titleKey][lang] : section.titleKey;
            let contentHTML = '';

            let contentData = data;
            if (section.dataKey) {
                const keys = section.dataKey.split('.');
                for (let k of keys) {
                    contentData = (contentData && contentData[k]) ? contentData[k] : null;
                }
            }
            
            if (section.type === 'text') {
                contentHTML = contentData ? `<p>${contentData[lang]}</p>` : '';
            } else if (section.type === 'list') {
                // Pass Master Skills to render tags inside blocks
                contentHTML = renderBlock(contentData, lang, data.skills);
            } else if (section.type === 'tags') {
                contentHTML = renderTags(contentData, lang);
            } else if (section.type === 'grid') {
                contentHTML = renderGrid(contentData, lang);
            }

            return `
            <section>
                <h2 id="ui-${section.titleKey}">${title}</h2>
                <div id="${section.titleKey}-list">
                    ${contentHTML}
                </div>
            </section>`;
        }).join('');
    }

    return { renderLayout };
}));
