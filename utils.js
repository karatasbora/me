// utils.js - Shared rendering logic for Node (SSG) and Browser (CSR)

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Browser Global
        root.resumeUtils = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

    // --- SUB-RENDERERS ---
    
    function renderBlock(items, lang) {
        if (!items) return '';
        return items.map(item => {
            // Robust check: ensure tags exist before mapping
            const tagsHTML = (item.tags && item.tags[lang]) 
                ? `<div class="tags-wrapper">${item.tags[lang].map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>` 
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

    function renderTags(tags, lang) {
        if (!tags) return '';
        // Handle both simple array (data.skills) and object with lang keys if needed
        const list = Array.isArray(tags) ? tags : tags[lang];
        if (!list) return '';
        
        return `
        <div class="job-block">
            <div class="tags-wrapper" style="padding-left:0; margin-top: 5px;">
                ${list.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
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
    // Reads data.structure and builds the whole <main> content
    function renderLayout(data, lang) {
        if (!data.structure) return '<p>Error: No structure defined in data.js</p>';

        return data.structure.map(section => {
            const title = data.ui[section.titleKey] ? data.ui[section.titleKey][lang] : section.titleKey;
            let contentHTML = '';

            // Resolve Deep Data Key (e.g. "profile.about")
            let contentData = data;
            if (section.dataKey) {
                const keys = section.dataKey.split('.');
                for (let k of keys) {
                    contentData = (contentData && contentData[k]) ? contentData[k] : null;
                }
            }
            
            // Resolve Content Type
            if (!contentData) {
                contentHTML = '';
            } else if (section.type === 'text') {
                contentHTML = `<p>${contentData[lang]}</p>`;
            } else if (section.type === 'list') {
                contentHTML = renderBlock(contentData, lang);
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

    // Expose only main render function and specific helpers if needed
    return { 
        renderLayout,
        createTagsHTML: renderTags // Backward compatibility if needed
    };
}));
