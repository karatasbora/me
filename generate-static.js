/* SSG BUILDER: generate-static.js
   Injects data.js content directly into index.html tags.
   Features "Auto-Wiring" for UI labels to reduce manual code updates.
   
   Run: node generate-static.js
*/

const fs = require('fs');
const data = require('./data.js');

// CONFIG: Choose the default language for the static HTML (SEO)
const LANG = 'en'; 

// --- 1. HELPER FUNCTIONS (HTML Generators) ---

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
    // 1. (id="${id}"[^>]*>)  -> Matches opening tag with specific ID
    // 2. (.*?)               -> Matches inner content (non-greedy)
    // 3. (<\/[^>]+>)         -> Matches closing tag
    const regex = new RegExp(`(id="${id}"[^>]*>)(.*?)(<\/[^>]+>)`, 's');
    
    if (!html.match(regex)) {
        // Quiet fail: handy if you haven't added the HTML tag yet
        // console.warn(`⚠️  ID #${id} not found. Skipping.`); 
        return html;
    }
    
    return html.replace(regex, `$1${newContent}$3`);
}

// Helper to update specific attributes (like href)
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

console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');

    // A. SEO & METADATA
    // Pulling strictly from data.ui and data.meta
    const seoTitle = data.ui.documentTitle[LANG];
    const seoDesc = data.ui.seoDesc[LANG];

    // Inject Title
    indexHtml = indexHtml.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);
    
    // Inject Meta Description
    indexHtml = indexHtml.replace(
        /(<meta name="description" content=")(.*?)(")/, 
        `$1${seoDesc}$3`
    );
    
    // Set HTML Lang Attribute
    indexHtml = indexHtml.replace(/<html lang=".*?">/, `<html lang="${LANG}">`);


    // B. STATIC HEADER & PROFILE INFO
    indexHtml = injectById(indexHtml, 'p-name', data.profile.name);
    indexHtml = injectById(indexHtml, 'p-title', data.profile.title[LANG]);
    indexHtml = injectById(indexHtml, 'p-location', data.meta.location[LANG]);
    
    // Links
    indexHtml = injectById(indexHtml, 'link-email', data.meta.email);
    indexHtml = injectAttrById(indexHtml, 'link-email', 'href', `mailto:${data.meta.email}`);
    
    indexHtml = injectById(indexHtml, 'link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    indexHtml = injectAttrById(indexHtml, 'link-linkedin', 'href', data.meta.linkedin);


    // C. AUTO-WIRED UI LABELS
    // Loop through keys in data.ui (about, experience, projects, etc.)
    // and inject into matching #ui-{key} IDs.
    const ui = data.ui;
    
    Object.keys(ui).forEach(key => {
        // We skip special keys used for SEO/Metadata
        if (['documentTitle', 'seoDesc', 'jobTitleShort'].includes(key)) return;

        const targetId = `ui-${key}`;
        // If content is an object (tr/en), grab the lang. If string, use as is.
        const content = ui[key][LANG] || ui[key]; 
        
        indexHtml = injectById(indexHtml, targetId, content);
    });


    // --- D. DYNAMIC CONTENT LISTS (CONFIGURATION) ---
   // Define how to handle each list type
   const LIST_CONFIG = [
       { key: 'experience', id: 'experience-list', generator: createBlockHTML },
       { key: 'education',  id: 'education-list',  generator: createBlockHTML },
       { key: 'skills',     id: 'skills-list',     generator: createTagsHTML },
       { key: 'languages',  id: 'languages-list',  generator: createLanguageHTML },
       // If you add projects later, you just uncomment this:
       // { key: 'projects',   id: 'projects-list',   generator: createBlockHTML }
   ];
   
   // --- EXECUTION LOOP ---
   console.log(`⚙️  Hydrating Dynamic Lists...`);
   
   LIST_CONFIG.forEach(config => {
       // 1. Get the data array from data.js (e.g., data.experience)
       const dataList = data[config.key];
       
       if (!dataList) {
           console.warn(`⚠️  Data key '${config.key}' not found in data.js. Skipping.`);
           return;
       }
   
       // 2. Check if the HTML element exists (fail quietly if not found)
       // We use a regex check similar to injectById to see if the ID exists in the string
       const idExists = new RegExp(`id="${config.id}"`).test(indexHtml);
       
       if (idExists) {
           // 3. Generate HTML
           // Note: Some generators (createBlockHTML, createLanguageHTML) need the 'LANG' arg.
           // createTagsHTML only needs the array. We pass LANG to all just in case.
           let generatedHTML = '';
           
           if (config.generator === createTagsHTML) {
               // Skills are a special case: data.skills is an object {tr:[], en:[]}, not an array of objects
               generatedHTML = config.generator(dataList[LANG]); 
           } else {
               // Standard Arrays (Experience, Education)
               generatedHTML = dataList.map(item => config.generator(item, LANG)).join('');
           }
   
           // 4. Inject
           indexHtml = injectById(indexHtml, config.id, generatedHTML);
           console.log(`   -> Wired '${config.key}' to '#${config.id}'`);
       } else {
           console.log(`   -> Skipped '${config.key}' (ID #${config.id} missing in HTML)`);
       }
   });

    // E. WRITE TO FILE
    fs.writeFileSync('index.html', indexHtml);
    console.log('✅ index.html successfully hydrated!');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}
