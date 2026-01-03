/* SSG BUILDER: static.js
   Injects data.js content directly into index.html
   Run: node static.js
*/

const fs = require('fs');
const data = require('./data.js');
const utils = require('./utils.js');

const LANG = 'en'; 

// Helper: Simple attribute injection for the header
function injectById(html, id, newContent) {
    const regex = new RegExp(`(id="${id}"[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, 'i');
    return html.replace(regex, `$1${newContent}$3`);
}

function injectAttrById(html, id, attr, newValue) {
    const tagRegex = new RegExp(`(<[^>]+id="${id}"[^>]*>)`, 'g');
    return html.replace(tagRegex, (openTag) => {
        const attrRegex = new RegExp(`${attr}="([^"]*)"`);
        if (openTag.match(attrRegex)) {
            return openTag.replace(attrRegex, `${attr}="${newValue}"`);
        } else {
            return openTag.replace('>', ` ${attr}="${newValue}">`);
        }
    });
}

console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');

    // 1. SEO & METADATA
    const seoTitle = data.ui.documentTitle[LANG];
    const seoDesc = data.ui.seoDesc[LANG];

    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);
    indexHtml = indexHtml.replace(
        /(<meta name="description" content=")(.*?)(")/, 
        `$1${seoDesc}$3`
    );
    indexHtml = indexHtml.replace(/<html lang=".*?">/, `<html lang="${LANG}">`);

    // 2. HEADER & PROFILE
    indexHtml = injectById(indexHtml, 'p-name', data.profile.name);
    indexHtml = injectById(indexHtml, 'p-title', data.profile.title[LANG]);
    indexHtml = injectById(indexHtml, 'p-location', data.meta.location[LANG]);
    indexHtml = injectById(indexHtml, 'ui-print', data.ui.print[LANG]);
    
    indexHtml = injectById(indexHtml, 'link-email', data.meta.email);
    indexHtml = injectAttrById(indexHtml, 'link-email', 'href', `mailto:${data.meta.email}`);
    
    indexHtml = injectById(indexHtml, 'link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    indexHtml = injectAttrById(indexHtml, 'link-linkedin', 'href', data.meta.linkedin);

    // 3. DYNAMIC CONTENT INJECTION
    // This is the key: We render the layout using utils and push it into <main>
    const mainContent = utils.renderLayout(data, LANG);
    
    // Replace content inside <main id="main-content"> ... </main>
    indexHtml = indexHtml.replace(
        /(<main id="main-content"[^>]*>)([\s\S]*?)(<\/main>)/,
        `$1${mainContent}$3`
    );

    fs.writeFileSync('index.html', indexHtml);
    console.log('✅ index.html generated with Dynamic Layout Structure.');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}
