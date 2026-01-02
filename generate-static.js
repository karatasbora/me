/* SSG BUILDER: generate-static.js
   - Runs in Node.js (Server Side)
   - Reads data.js and "bakes" it into index.html
   - NO browser code (document/window) allowed here!
*/

const fs = require('fs');
const data = require('./data.js');

const LANG = 'en'; // Default language for bots/SEO

// --- 1. RENDERERS (Node.js Version) ---
// These functions return pure HTML strings.
const RENDERERS = {
    // Renders "Experience" and "Education" blocks
    'std-block': (container, lang) => {
        return container.items.map(item => {
            const title = item.role ? item.role[lang] : item.degree[lang];
            const subTitle = item.company ? item.company[lang] : item.school[lang];
            
            const tagsHTML = item.tags 
                ? `<div class="tags-wrapper">${item.tags[lang].map(t => `<span class="skill-tag">${t}</span>`).join('')}</div>` 
                : '';

            return `
            <div class="job-block">
                <div class="job-header">
                    <span class="job-title">${title}</span>
                    <span class="job-date">${item.date[lang]}</span>
                </div>
                <div class="job-subheader">
                    <span class="company">${subTitle}</span>
                    <span class="location">${item.location[lang]}</span>
                </div>
                <div class="job-content">
                    <p>${item.desc[lang]}</p>
                    ${tagsHTML}
                </div>
            </div>`;
        }).join('');
    },

    // Renders "Skills" tag cloud
    'tag-cloud': (container, lang) => {
        return container.data[lang].map(tag => `<span class="skill-tag">${tag}</span>`).join('');
    },

    // Renders "Languages" grid
    'lang-grid': (container, lang) => {
        return container.items.map(item => `
        <div class="lang-item">
            <span class="lang-title">${item.name[lang]}</span>
            <span class="lang-level">${item.level[lang]}</span>
        </div>`).join('');
    },
    
    // Renders simple text (like the Profile About section)
    'text-content': (container, lang) => {
        return container.about[lang];
    }
};

// --- 2. INJECTION HELPERS ---
// Replaces content inside specific IDs in the HTML string
function injectById(html, id, content) {
    const regex = new RegExp(`(id="${id}"[^>]*>)(.*?)(<\/[^>]+>)`, 's');
    return html.match(regex) ? html.replace(regex, `$1${content}$3`) : html;
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

// --- 3. MAIN BUILD SCRIPT ---
console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');

    // A. SEO & METADATA (From data.ui)
    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${data.ui.documentTitle[LANG]}</title>`);
    indexHtml = indexHtml.replace(
        /(<meta name="description" content=")(.*?)(")/, 
        `$1${data.ui.seoDesc[LANG]}$3`
    );
    indexHtml = indexHtml.replace(/<html lang=".*?">/, `<html lang="${LANG}">`);

    // B. STATIC HEADER INFO (Direct Injection)
    indexHtml = injectById(indexHtml, 'p-name', data.profile.name);
    indexHtml = injectById(indexHtml, 'p-title', data.profile.title[LANG]);
    indexHtml = injectById(indexHtml, 'p-location', data.meta.location[LANG]);
    
    // Links
    indexHtml = injectById(indexHtml, 'link-email', data.meta.email);
    indexHtml = injectAttrById(indexHtml, 'link-email', 'href', `mailto:${data.meta.email}`);
    
    indexHtml = injectById(indexHtml, 'link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    indexHtml = injectAttrById(indexHtml, 'link-linkedin', 'href', data.meta.linkedin);

    // C. AUTO-WIRE UI LABELS (Headings)
    // Injects "About", "Experience", etc. into <h2 id="ui-about"> or <h2 id="head-about">
    Object.keys(data.ui).forEach(key => {
        if (['documentTitle', 'seoDesc', 'jobTitleShort'].includes(key)) return;

        // Try both ID naming conventions
        const val = data.ui[key][LANG] || data.ui[key];
        indexHtml = injectById(indexHtml, `ui-${key}`, val);
        indexHtml = injectById(indexHtml, `head-${key}`, val);
    });

    // D. DYNAMIC CONTENT LOOP (Container Pattern)
    // Loops through experience, education, skills, etc.
    Object.keys(data).forEach(key => {
        const section = data[key];

        // Check if this data block has config for rendering
        if (section && section.id && section.type) {
            const renderer = RENDERERS[section.type];
            
            if (renderer) {
                console.log(`   -> Rendering [${key}] into #${section.id}`);
                const htmlContent = renderer(section, LANG);
                indexHtml = injectById(indexHtml, section.id, htmlContent);
            }
        }
    });

    // E. SAVE FILE
    fs.writeFileSync('index.html', indexHtml);
    console.log('✅ index.html fully hydrated! Build complete.');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}
