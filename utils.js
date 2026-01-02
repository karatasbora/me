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

    // Helper: Generate Skill Tags
    function createTagsHTML(tagsArray) {
        if (!tagsArray) return '';
        return tagsArray.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
    }

    // Helper: Generate Language List
    function createLanguageHTML(languages, langKey) {
        return languages.map(langItem => `
            <div class="lang-item">
                <span class="lang-title">${langItem.name[langKey]}</span>
                <span class="lang-level">${langItem.level[langKey]}</span>
            </div>
        `).join('');
    }

    // Helper: Generate Job/Edu Block
    function createBlockHTML(item, langKey) {
        const title = item.role ? item.role[langKey] : item.degree[langKey];
        const subTitle = item.company ? item.company[langKey] : item.school[langKey];
        const tagsHTML = item.tags ? `<div class="tags-wrapper">${createTagsHTML(item.tags[langKey])}</div>` : '';

        return `
        <div class="job-block">
            <div class="job-header">
                <span class="job-title">${title}</span>
                <span class="job-date">${item.date[langKey]}</span>
            </div>
            <div class="job-subheader">
                <span class="company">${subTitle}</span>
                <span class="location">${item.location[langKey]}</span>
            </div>
            <div class="job-content">
                <p>${item.desc[langKey]}</p>
                ${tagsHTML}
            </div>
        </div>`;
    }

    return {
        createTagsHTML,
        createLanguageHTML,
        createBlockHTML
    };
}));
