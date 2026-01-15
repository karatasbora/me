/* 
 * static.js
 * Generates the static index.html by injecting data into the template.
 * Usage: node static.js
 */

const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const data = require('./data.js');
const utils = require('./utils.js');

const CONFIG = {
    inputFile: 'index.html',
    outputFile: 'index.html',
    defaultLang: 'en',
    selectors: {
        mainContent: 'main-content',
        jsonLd: 'json-ld'
    }
};

console.log(`\n⚙️  Starting Static Site Generation...`);
console.log(`info Using Language: [${CONFIG.defaultLang.toUpperCase()}]`);

try {
    // 1. Read Template
    if (!fs.existsSync(CONFIG.inputFile)) {
        throw new Error(`Input file '${CONFIG.inputFile}' not found.`);
    }
    const htmlContent = fs.readFileSync(CONFIG.inputFile, 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    // 2. Validate Template
    const mainContent = document.getElementById(CONFIG.selectors.mainContent);
    if (!mainContent) {
        throw new Error(`Critical: Element '#${CONFIG.selectors.mainContent}' not found in template.`);
    }

    // 3. SEO & Metadata (Centralized)
    const LANG = CONFIG.defaultLang;
    document.documentElement.lang = LANG;

    // Calls the shared utility to handle Title, Meta Tags, and JSON-LD
    utils.updateMetadata(document, data, LANG);

    // 4. Content Injection
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };
    const setHref = (id, url) => {
        const el = document.getElementById(id);
        if (el) el.href = url;
    };

    setText('p-name', data.profile.name);
    setText('p-title', data.profile.title[LANG]);
    setText('p-location', data.meta.location[LANG]);
    setText('ui-print', data.ui.print[LANG]);

    setText('link-email', data.meta.email);
    setHref('link-email', `mailto:${data.meta.email}`);

    setText('link-linkedin', data.meta.linkedinLabel);
    setHref('link-linkedin', data.meta.linkedin);

    // Main Layout Render
    mainContent.innerHTML = utils.renderLayout(data, LANG);

    // 5. Write Output
    fs.writeFileSync(CONFIG.outputFile, dom.serialize());

    console.log(`✅ Success: '${CONFIG.outputFile}' generated.`);
    console.log(`   - SEO updated`);
    console.log(`   - JSON-LD injected`);
    console.log(`   - Content rendered`);

} catch (err) {
    console.error("\n❌ Error generating static site:");
    console.error(err.message);
    process.exit(1);
}