/* SSG BUILDER: static.js
   Injects data.js content directly into index.html
   Run: node static.js
*/

const fs = require('fs');
const data = require('./data.js');

// CONFIG: Choose the default language for the static HTML
const LANG = 'en'; 

// --- 1. HELPER FUNCTIONS (Mirrors logic from script.js) ---

// Generates the colorful skill tags HTML
function createTagsHTML(tagsArray) {
    if (!tagsArray) return '';
    return tagsArray.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
}

// Generates the Language cards HTML
function createLanguageHTML(languages, langKey) {
    return languages.map(langItem => `
        <div class="lang-item">
            <span class="lang-title">${langItem.name[langKey]}</span>
            <span class="lang-level">${langItem.level[langKey]}</span>
        </div>
    `).join('');
}

// Generates Job and Education blocks HTML
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

// --- 2. INJECTION HELPERS ---

// Helper to replace content inside a specific ID tag
// Matches: <tag id="targetID" ...> OLD CONTENT </tag>
function injectById(html, id, newContent) {
    // Regex explanation:
    // 1. (id="${id}"[^>]*>)  -> Matches the opening tag part including the specific ID
    // 2. (.*?)               -> Matches any content inside (non-greedy)
    // 3. (<\/[^>]+>)         -> Matches the closing tag
    const regex = new RegExp(`(id="${id}"[^>]*>)(.*?)(<\/[^>]+>)`, 's');
    
    if (!html.match(regex)) {
        console.warn(`⚠️ Warning: ID #${id} not found in HTML. Skipping injection.`);
        return html;
    }
    
    // Replace the middle group ($2) with newContent
    return html.replace(regex, `$1${newContent}$3`);
}

// Helper to update specific attributes (like href)
function injectAttrById(html, id, attr, newValue) {
    // 1. Find the tag with the ID
    const tagRegex = new RegExp(`(<[^>]+id="${id}"[^>]*>)`, 'g');
    
    return html.replace(tagRegex, (openTag) => {
        // 2. Check if the attribute already exists
        const attrRegex = new RegExp(`${attr}="([^"]*)"`);
        
        if (openTag.match(attrRegex)) {
            // Replace existing value
            return openTag.replace(attrRegex, `${attr}="${newValue}"`);
        } else {
            // Append attribute if missing (before the closing >)
            return openTag.replace('>', ` ${attr}="${newValue}">`);
        }
    });
}

// --- 3. EXECUTION ---

console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    // 1. Read the template
    let indexHtml = fs.readFileSync('index.html', 'utf8');

    // 2. SEO & METADATA (From data.ui and data.meta)
    // Note: We access data.ui for these now, ensuring Single Source of Truth
    const seoTitle = data.ui.documentTitle[LANG];
    const seoDesc = data.ui.seoDesc[LANG];

    // Replace <title>
    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);
    
    // Replace <meta name="description">
    indexHtml = indexHtml.replace(
        /(<meta name="description" content=")(.*?)(")/, 
        `$1${seoDesc}$3`
    );
    
    // Set HTML Lang Attribute
    indexHtml = indexHtml.replace(/<html lang=".*?">/, `<html lang="${LANG}">`);

    // 3. HEADER & PROFILE
    indexHtml = injectById(indexHtml, 'p-name', data.profile.name);
    indexHtml = injectById(indexHtml, 'p-title', data.profile.title[LANG]);
    indexHtml = injectById(indexHtml, 'p-location', data.meta.location[LANG]);
    
    // Contact Links
    indexHtml = injectById(indexHtml, 'link-email', data.meta.email);
    indexHtml = injectAttrById(indexHtml, 'link-email', 'href', `mailto:${data.meta.email}`);
    
    indexHtml = injectById(indexHtml, 'link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    indexHtml = injectAttrById(indexHtml, 'link-linkedin', 'href', data.meta.linkedin);

    // 4. UI LABELS (About, Experience, Skills, etc.)
    // We now pull these directly from data.ui
    const ui = data.ui; 

    indexHtml = injectById(indexHtml, 'head-about', ui.about[LANG]);
    indexHtml = injectById(indexHtml, 'head-experience', ui.experience[LANG]);
    indexHtml = injectById(indexHtml, 'head-education', ui.education[LANG]);
    indexHtml = injectById(indexHtml, 'head-skills', ui.skills[LANG]);
    indexHtml = injectById(indexHtml, 'head-languages', ui.languages[LANG]);
    
    // Attempt to inject PDF button text (requires stricter regex or ID match)
    // We assume the span inside #btn-print is the target.
    // This is a simple replace for the "PDF" text if it matches generic structure or you can add an ID like 'lbl-print' to the span.
    // For now, we'll try a safe replacement if the ID exists, otherwise skip.
    // indexHtml = injectById(indexHtml, 'lbl-print', ui.print[LANG]); 

    // 5. DYNAMIC CONTENT BLOCKS
    
    // A. About Text
    indexHtml = injectById(indexHtml, 'p-about', data.profile.about[LANG]);

    // B. Experience List
    const expHTML = data.experience.map(job => createBlockHTML(job, LANG)).join('');
    indexHtml = injectById(indexHtml, 'experience-list', expHTML);

    // C. Education List
    const eduHTML = data.education.map(school => createBlockHTML(school, LANG)).join('');
    indexHtml = injectById(indexHtml, 'education-list', eduHTML);

    // D. Skills List
    const skillHTML = createTagsHTML(data.skills[LANG]);
    indexHtml = injectById(indexHtml, 'skills-list', skillHTML);

    // E. Languages List
    const langHTML = createLanguageHTML(data.languages, LANG);
    indexHtml = injectById(indexHtml, 'languages-list', langHTML);

    // 6. WRITE FILE
    fs.writeFileSync('index.html', indexHtml);
    console.log('✅ index.html fully hydrated! Static Site Generation complete.');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}
