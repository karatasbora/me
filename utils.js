// utils.js

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
            // Fallback to "Other" if no category is defined
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
            
            const tagsHTML = (relevantSkills.length > 0) 
                ? `<div class="tags-wrapper">
                    ${relevantSkills.map(s => `
                        <button class="skill-tag" 
                                data-targets="${s.targets.join(',')}" 
                                data-origin="${item.id}">
                            ${s.label}
                        </button>
                    `).join('')}
                  </div>` 
                : '';

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

    // UPDATED: Renders skills in CATEGORIES
    function renderTags(skills, lang) {
        if (!skills) return '';
        
        // 1. Group them
        const groups = groupSkillsByCategory(skills, lang);
        
        // 2. Render each group
        let html = '<div class="job-block skills-container">'; // Single container for all skills
        
        for (const [category, categorySkills] of Object.entries(groups)) {
            html += `
            <div class="skill-category">
                <h3 class="skill-category-title">${category}</h3>
                <div class="tags-wrapper">
                    ${categorySkills.map(skill => `
                        <button class="skill-tag" 
                                data-targets="${skill.targets.join(',')}" 
                                data-origin="summary">
                            ${skill[lang]}
                        </button>
                    `).join('')}
                </div>
            </div>`;
        }
        
        html += '</div>';
        return html;
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
