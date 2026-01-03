/* SSG BUILDER: static.js
   Injects data.js content directly into index.html
   Run: node static.js
*/

const fs = require('fs');
const data = require('./data.js');
const utils = require('./utils.js'); // Import shared utils

// CONFIG: Choose the default language for the static HTML
const LANG = 'en'; 

// --- 1. ROBUST INJECTION HELPER ---

function injectById(html, id, newContent) {
    // Regex to match: id="my-id" > content </tag>
    const regex = new RegExp(`(id="${id}"[^>]*>\\s*)([\\s\\S]*?)(\\s*<\\/[^>]+>)`, 'i');
    
    // Fallback for tags that might not have newlines or complex structure
    if (!html.match(regex)) {
        const simpleRegex = new RegExp(`(id="${id}"[^>]*>)(.*?)(<\/[^>]+>)`, 's');
        return html.replace(simpleRegex, `$1${newContent}$3`);
    }
    
    return html.replace(regex, `$1${newContent}$3`);
}

function injectAttrById(html, id, attr, newValue) {
    const tagRegex = new RegExp(`(<[^>]+id="${id}"[^>]*>)`, 'g');
    return html.replace(tagRegex, (openTag) => {
        const attrRegex = new RegExp(`${attr}="([^"]*)"`);
        if (openTag.match(attrRegex)) {
            return openTag.replace(attrRegex, `${attr}="${newValue}"`);
        } else {
            // Add attribute if missing
            return openTag.replace('>', ` ${attr}="${newValue}">`);
        }
    });
}

// --- 2. EXECUTION ---

console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    // 1. Read the template
    let indexHtml = fs.readFileSync('index.html', 'utf8');

    // 2. SEO & METADATA
    const seoTitle = data.ui.documentTitle[LANG];
    const seoDesc = data.ui.seoDesc[LANG];

    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);
    indexHtml = indexHtml.replace(
        /(<meta name="description" content=")(.*?)(")/, 
        `$1${seoDesc}$3`
    );
    indexHtml = indexHtml.replace(/<html lang=".*?">/, `<html lang="${LANG}">`);

    // 3. HEADER & PROFILE
    // These remain manual as they map to specific profile data points, not generic UI labels
    indexHtml = injectById(indexHtml, 'p-name', data.profile.name);
    indexHtml = injectById(indexHtml, 'p-title', data.profile.title[LANG]);
    indexHtml = injectById(indexHtml, 'p-location', data.meta.location[LANG]);
    
    indexHtml = injectById(indexHtml, 'link-email', data.meta.email);
    indexHtml = injectAttrById(indexHtml, 'link-email', 'href', `mailto:${data.meta.email}`);
    
    indexHtml = injectById(indexHtml, 'link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    indexHtml = injectAttrById(indexHtml, 'link-linkedin', 'href', data.meta.linkedin);

    // 4. UI LABELS - DYNAMIC INJECTION
    // Automatically finds keys in data.ui (e.g. 'about', 'print') and injects into id="ui-about", id="ui-print"
    const ui = data.ui; 
    Object.keys(ui).forEach(key => {
        // If the ID (e.g. ui-documentTitle) doesn't exist in HTML, the helper returns HTML unchanged.
        indexHtml = injectById(indexHtml, `ui-${key}`, ui[key][LANG]);
    });

    // 5. DYNAMIC CONTENT BLOCKS - USING SHARED UTILS
    
    // A. About Text
    indexHtml = injectById(indexHtml, 'p-about', data.profile.about[LANG]);

    // B. Experience List
    const expHTML = data.experience.map(job => utils.createBlockHTML(job, LANG)).join('');
    indexHtml = injectById(indexHtml, 'experience-list', expHTML);

    // C. Education List
    const eduHTML = data.education.map(school => utils.createBlockHTML(school, LANG)).join('');
    indexHtml = injectById(indexHtml, 'education-list', eduHTML);

    // D. Skills List
    const skillHTML = utils.createTagsHTML(data.skills[LANG]);
    indexHtml = injectById(indexHtml, 'skills-list', skillHTML);

    // E. Languages List
    const langHTML = utils.createLanguageHTML(data.languages, LANG);
    indexHtml = injectById(indexHtml, 'languages-list', langHTML);

    // 6. WRITE FILE
    fs.writeFileSync('index.html', indexHtml);
    console.log('✅ index.html fully hydrated! Static Site Generation complete.');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}
