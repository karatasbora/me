/* SSG BUILDER: static.js
   Injects data.js content directly into index.html
   Run: node static.js
*/

const fs = require('fs');
const data = require('./data.js');
const utils = require('./utils.js');

const LANG = 'en'; 

// 1. IMPROVED injectById
// Matches id='...', id="...", or id=... (no quotes)
// Handles whitespace around '='
function injectById(html, id, newContent) {
    // Explanation:
    // 1. Match opening tag containing the ID: (<[^>]+id\s*=\s*["']?${id}["']?[^>]*>)
    // 2. Match content lazily: ([\s\S]*?)
    // 3. Match the SPECIFIC closing tag corresponding to the ID is hard with regex, 
    //    but strictly matching the very next closing tag is the safest assumption for "leaf" nodes.
    //    For better safety, we simply replace the content between the opening tag and the *next* closing tag.
    
    // Improved Regex: Allows whitespace and single/double quotes
    const regex = new RegExp(`(<[^>]+id\\s*=\\s*["']?${id}["']?[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`, 'i');
    
    return html.replace(regex, (match, openTag, oldContent, closeTag) => {
        return `${openTag}${newContent}${closeTag}`;
    });
}

// 2. IMPROVED injectAttrById
function injectAttrById(html, id, attr, newValue) {
    // Find the tag containing the ID
    const tagRegex = new RegExp(`(<[^>]+id\\s*=\\s*["']?${id}["']?[^>]*>)`, 'gi');

    return html.replace(tagRegex, (openTag) => {
        // Regex to find the specific attribute (href, src, etc.)
        // Handles attr="val", attr='val', or attr=val
        const attrRegex = new RegExp(`(${attr}\\s*=\\s*)(["'])([^"']*)\\2`, 'i');

        if (attrRegex.test(openTag)) {
            // Attribute exists, replace value
            return openTag.replace(attrRegex, `$1$2${newValue}$2`);
        } else {
            // Attribute doesn't exist, append it before the closing '>'
            return openTag.replace(/\/?>$/, ` ${attr}="${newValue}">`);
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
