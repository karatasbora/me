/* SSG BUILDER: static.js
   Injects data.js content directly into index.html using JSDOM
   Run: node static.js
*/

const fs = require('fs');
const jsdom = require("jsdom"); // Requires: npm install jsdom
const { JSDOM } = jsdom;
const data = require('./data.js');
const utils = require('./utils.js');

const LANG = 'en'; 

console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    // 1. SEO & METADATA
    document.title = data.ui.documentTitle[LANG];
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.ui.seoDesc[LANG]);
    
    document.documentElement.lang = LANG;

    // 2. HEADER & PROFILE
    // Helper to safely set text content
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };
    
    // Helper to safely set href
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
    
    setText('link-linkedin', data.meta.linkedinLabel || "LinkedIn");
    setHref('link-linkedin', data.meta.linkedin);

    // 3. DYNAMIC CONTENT INJECTION
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        // We use utils.renderLayout to generate the inner HTML structure
        mainContent.innerHTML = utils.renderLayout(data, LANG);
    }

    // 4. WRITE FILE
    fs.writeFileSync('index.html', dom.serialize());
    console.log('✅ index.html generated securely with JSDOM.');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}
