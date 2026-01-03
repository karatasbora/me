// utils.js

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    // --- HELPER: GET TAGS FOR A SPECIFIC JOB ID ---
    // Searches the Master Skills list for any skill targeting this ID
    function getTagsForId(id, allSkills, lang) {
        if (!id || !allSkills) return [];
        
        // Filter skills that include this ID in their 'targets' array
        return allSkills
            .filter(skill => skill.targets && skill.targets.includes(id))
            .map(skill => skill[lang]); // Return the localized string
    }

    // --- SUB-RENDERERS ---
    
    // Now accepts 'allSkills' to perform the lookup
    function renderBlock(items, lang, allSkills) {
        if (!items) return '';
        return items.map(item => {
            
            // REVERSE LOGIC: We fetch tags from the master list, not the item itself
            const relevantTags = getTagsForId(item.id, allSkills, lang);
            
            const tagsHTML = (relevantTags.length > 0)
                ? `<div class="tags-wrapper">${relevantTags.map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>`
                : '';

            return `
            <div class="job-block">
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
        // 'skills' is now the Master List of objects, so we map directly
        return `
        <div class="job-block">
            <div class="tags-wrapper" style="padding-left:0; margin-top: 5px;">
                ${skills.map(skill => `<span class="skill-tag">${skill[lang]}</span>`).join('')}
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

            // Resolve Data Key
            let contentData = data;
            if (section.dataKey) {
                const keys = section.dataKey.split('.');
                for (let k of keys) {
                    contentData = (contentData && contentData[k]) ? contentData[k] : null;
                }
            }
            
            // Render based on type
            if (section.type === 'text') {
                contentHTML = contentData ? `<p>${contentData[lang]}</p>` : '';
            } 
            else if (section.type === 'list') {
                // Pass the MASTER SKILLS list to the block renderer
                contentHTML = renderBlock(contentData, lang, data.skills);
            } 
            else if (section.type === 'tags') {
                // Render the Master Skills list directly
                contentHTML = renderTags(contentData, lang);
            } 
            else if (section.type === 'grid') {
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
