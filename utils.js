// utils.js - Shared rendering logic for Node (SSG) and Browser (CSR)

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    // --- HELPER: GET SKILLS FOR A JOB ---
    function getRelevantSkills(id, allSkills, lang) {
        if (!id || !allSkills) return [];
        return allSkills
            .filter(skill => skill.targets && skill.targets.includes(id))
            .map(skill => ({
                label: skill[lang],
                targets: skill.targets
            }));
    }

    // --- HELPER: GROUP SKILLS BY CATEGORY ---
    function groupSkillsByCategory(skills, lang) {
        const groups = {};
        skills.forEach(skill => {
            const cat = (skill.category && skill.category[lang]) ? skill.category[lang] : (lang === 'tr' ? 'Diğer' : 'Other');
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(skill);
        });
        return groups;
    }

    // --- SUB-RENDERERS ---
    
    function renderBlock(items, lang, allSkills) {
        if (!items) return '';
        return items.map(item => {
            const relevantSkills = getRelevantSkills(item.id, allSkills, lang);
            
            // Render Skills (Branding)
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
                        <svg class="chevron-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

    // --- RENDER TAGS (For the Summary Section) ---
    function renderTags(skills, lang) {
        if (!skills) return '';
        const groups = groupSkillsByCategory(skills, lang);
        
        const categoryBlocks = Object.entries(groups).map(([category, categorySkills]) => {
            return `<div class="skill-category">` + 
                        `<h3 class="skill-category-title">${category}</h3>` + 
                        `<div class="tags-wrapper">` + 
                            categorySkills.map(skill => 
                                `<button class="skill-tag" data-targets="${skill.targets.join(',')}" data-origin="summary">${skill[lang]}</button>`
                            ).join('') + 
                        `</div>` + 
                    `</div>`;
        });
        
        return `<div class="job-block skills-container">${categoryBlocks.join('\n')}</div>`;
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
            
            if (section.type === 'text') {
                contentHTML = contentData ? `<p>${contentData[lang]}</p>` : '';
            } else if (section.type === 'list') {
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
