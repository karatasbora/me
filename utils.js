// utils.js

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    // --- HELPER: GET SKILLS FOR A JOB ---
    // Veri yapısı değiştiği için iç içe döngü ile tarama yapıyoruz
    function getRelevantSkills(id, skillCategories, lang) {
        const relevant = [];
        if (!id || !skillCategories) return relevant;

        // Kategorileri gez
        skillCategories.forEach(cat => {
            if (cat.items) {
                // Kategori içindeki yetenekleri gez
                cat.items.forEach(skill => {
                    // Eğer yetenek hedefleri arasında bu ID varsa listeye ekle
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

    // --- RENDER SKILLS SUMMARY ---
    // Artık gruplama yapmaya gerek yok, veri zaten gruplanmış geliyor.
    function renderTags(skillCategories, lang) {
        if (!skillCategories) return '';
        
        // Doğrudan kategori dizisi üzerinden map yapıyoruz
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
                // Yeni hiyerarşik data.skills yapısını gönderiyoruz
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
