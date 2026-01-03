// utils.js

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    // --- HELPER: GET SKILLS FOR A JOB (HIERARCHICAL FIX) ---
    // This now correctly drills down into categories -> items to find matches
    function getRelevantSkills(id, skillCategories, lang) {
        const relevant = [];
        if (!id || !skillCategories) return relevant;

        // Iterate through Categories
        skillCategories.forEach(cat => {
            if (cat.items) {
                // Iterate through Items inside Category
                cat.items.forEach(skill => {
                    // Check if the skill targets this job ID
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

    // --- HELPER: GROUP SKILLS BY CATEGORY ---
    // Not strictly needed for rendering since data is already grouped, 
    // but useful if we ever need to re-sort. 
    function groupSkillsByCategory(skills, lang) {
        // Since your data is ALREADY hierarchical, we might not need this,
        // but for safety/flexibility let's keep it simple or just use raw data in renderTags.
        return skills; 
    }

    // --- SUB-RENDERERS ---
    
    // Renders Experience & Education blocks (THE TIMELINE)
    function renderBlock(items, lang, skillCategories) {
        if (!items) return '';
        return items.map(item => {
            // FIXED: Now passes the hierarchical skillCategories correctly
            const relevantSkills = getRelevantSkills(item.id, skillCategories, lang);
            
            // Branding Tags (Footer)
            const tagsHTML = (relevantSkills.length > 0) 
                ? `<div class="tags-wrapper branding-tags">
                    ${relevantSkills.map(s => `
                        <button class="skill-tag" 
                                data-targets="${s.targets.join(',')}" 
                                data-origin="${item.id}">
                            ${s.label}
                        </button>
                    `).join('')}
                  </div>` 
                : '';

            const toggleText = lang === 'tr' ? 'Detayları Göster' : 'Show Details';

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
                    <button class="desc-toggle" aria-expanded="false" aria-label="${toggleText}">
                        <svg class="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div class="job-description collapsed">
                        <div class="desc-inner">
                            <p>${item.desc[lang]}</p>
                        </div>
                    </div>

                    ${tagsHTML}
                </div>
            </div>`;
        }).join('');
    }

    // Renders Skills Summary (From Hierarchical Data)
    function renderTags(skillCategories, lang) {
        if (!skillCategories) return '';
        
        // Map directly over the hierarchical structure from data.js
        const categoryBlocks = skillCategories.map(cat => {
            const categoryTitle = cat.category[lang];
            
            const skillsHTML = cat.items.map(skill => 
                `<button class="skill-tag" data-targets="${skill.targets.join(',')}" data-origin="summary">${skill[lang]}</button>`
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

    // Renders Language Grid
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

    // --- MAIN RENDERER ---
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
            
            // --- SECTION RENDERER SELECTION ---
            if (section.type === 'text') {
                // Pure text for About (No Box)
                contentHTML = contentData ? `<p>${contentData[lang]}</p>` : '';
            } else if (section.type === 'list') {
                // Pass hierarchical skills to block renderer
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
