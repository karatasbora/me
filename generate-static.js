/* SSG BUILDER: generate-static.js
   - Reads 'template.html' (Clean Source)
   - Injects Data
   - Writes 'index.html' (Build Artifact)
   - Prevents duplication bugs by always starting fresh.
*/

const fs = require('fs');
const data = require('./data.js');

const LANG = 'en'; 

// --- 1. RENDERERS ---
const RENDERERS = {
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

    'tag-cloud': (container, lang) => {
        return container.data[lang].map(tag => `<span class="skill-tag">${tag}</span>`).join('');
    },

    'lang-grid': (container, lang) => {
        return container.items.map(item => `
        <div class="lang-item">
            <span class="lang-title">${item.name[lang]}</span>
            <span class="lang-level">${item.level[lang]}</span>
        </div>`).join('');
    },
    
    'text-content': (container, lang) => {
        return container.about[lang];
    }
};

// --- 2. INJECTION HELPER ---
function injectById(html, id, content) {
    // Regex matches: id="target" ... > (Match content) <
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

// --- 3. MAIN BUILD PROCESS ---
console.log(`⚙️  Reading 'template.html' and building for: [${LANG.toUpperCase()}]...`);

try {
    // READ FROM TEMPLATE (The Clean Source)
    let html = fs.readFileSync('template.html', 'utf8');

    // A. SEO & HEADER
    html = html.replace(/<title>.*?<\/title>/, `<title>${data.ui.documentTitle[LANG]}</title>`);
    html = html.replace(/(<meta name="description" content=")(.*?)(")/, `$1${data.ui.seoDesc[LANG]}$3`);
    html = html.replace(/<html lang=".*?">/, `<html lang="${LANG}">`);

    // B. STATIC HEADER INFO
    html = injectById(html, 'p-name', data.profile.name);
    html = injectById(html, 'p-title', data.profile.title[LANG]);
    html = injectById(html, 'p-location', data.meta.location[LANG]);
    
    html = injectById(html, 'link-email', data.meta.email);
    html = injectAttrById(html, 'link-email', 'href', `mailto:${data.meta.email}`);
    
    html = injectById(html, 'link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    html = injectAttrById(html, 'link-linkedin', 'href', data.meta.linkedin);

    // C. UI LABELS
    Object.keys(data.ui).forEach(key => {
        if (['documentTitle', 'seoDesc', 'jobTitleShort'].includes(key)) return;
        const val = data.ui[key][LANG] || data.ui[key];
        html = injectById(html, `ui-${key}`, val);
    });

    // D. DYNAMIC CONTENT
    Object.keys(data).forEach(key => {
        const section = data[key];
        if (section && section.id && section.type) {
            const renderer = RENDERERS[section.type];
            if (renderer) {
                console.log(`   -> Rendering [${key}] into #${section.id}`);
                const content = renderer(section, LANG);
                html = injectById(html, section.id, content);
            }
        }
    });

    // WRITE TO INDEX.HTML (The Build Artifact)
    fs.writeFileSync('index.html', html);
    console.log('✅ Build Complete: index.html has been generated from template.html');

} catch (err) {
    if (err.code === 'ENOENT') {
        console.error("❌ Error: 'template.html' not found. Please create it by duplicating index.html and clearing the content.");
    } else {
        console.error("❌ Build Failed:", err);
    }
    process.exit(1);
}
