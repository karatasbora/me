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

    // 3. UNIVERSAL SCRAPE
    const LANG = CONFIG.defaultLang;
    const localizedData = utils.scrapeData(data, LANG);

    // 4. METADATA & SEO
    document.documentElement.lang = LANG;

    utils.updateMetadata(document, localizedData);

    // 5. STATIC CONTENT INJECTION
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };
    const setHref = (id, url) => {
        const el = document.getElementById(id);
        if (el) el.href = url;
    };

    setText('p-name', localizedData.person.name);
    setText('p-title', localizedData.person.jobTitle);
    setText('p-location', localizedData.meta.location);
    setText('ui-print', localizedData.ui.print);

    setText('link-email', localizedData.meta.email);
    setHref('link-email', `mailto:${localizedData.meta.email}`);

    setText('link-linkedin', localizedData.meta.linkedinLabel);
    setHref('link-linkedin', localizedData.meta.linkedin);

    // 6. MAIN LAYOUT RENDER
    mainContent.innerHTML = utils.renderLayout(localizedData, LANG);

    // 7. WRITE OUTPUT
    fs.writeFileSync(CONFIG.outputFile, dom.serialize());

    console.log(`✅ Success: '${CONFIG.outputFile}' generated.`);
    console.log(`   - Language resolved to: ${LANG}`);
    console.log(`   - JSON-LD injected`);
    console.log(`   - Layout rendered`);

} catch (err) {
    console.error("\n❌ Error generating static site:");
    console.error(err.message);
    process.exit(1);
}