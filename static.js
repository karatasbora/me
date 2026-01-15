/* Injects data.js content directly into index.html using JSDOM */

const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const data = require('./data.js');
const utils = require('./utils.js');

const LANG = 'en';

console.log(`⚙️  Generating Static Site for Default Lang: [${LANG.toUpperCase()}]...`);

try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    // --- 1. CORE SEO & METADATA ---
    document.title = data.ui.documentTitle[LANG];
    document.documentElement.lang = LANG;

    // Helper to set attribute
    const setMeta = (selector, attr, value) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
    };

    // Description & Keywords
    setMeta('meta[name="description"]', 'content', data.ui.seoDesc[LANG]);
    setMeta('meta[name="keywords"]', 'content', data.meta.keywords[LANG]);
    setMeta('link[rel="canonical"]', 'href', data.meta.baseUrl + '/');

    // --- 2. SOCIAL MEDIA TAGS (OPEN GRAPH & TWITTER) ---
    const absImgUrl = `${data.meta.baseUrl}/${data.meta.image}`;

    setMeta('meta[property="og:title"]', 'content', data.ui.documentTitle[LANG]);
    setMeta('meta[property="og:description"]', 'content', data.ui.seoDesc[LANG]);
    setMeta('meta[property="og:url"]', 'content', data.meta.baseUrl + '/');
    setMeta('meta[property="og:image"]', 'content', absImgUrl);

    setMeta('meta[name="twitter:title"]', 'content', data.ui.documentTitle[LANG]);
    setMeta('meta[name="twitter:description"]', 'content', data.ui.seoDesc[LANG]);
    setMeta('meta[name="twitter:image"]', 'content', absImgUrl);

    // --- 3. DYNAMIC JSON-LD (STRUCTURED DATA) ---
    const jsonLdScript = document.getElementById('json-ld');
    if (jsonLdScript) {
        const structuredData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "ProfilePage",
                    "name": data.ui.documentTitle[LANG],
                    "url": data.meta.baseUrl + "/",
                    "mainEntity": {
                        "@type": "Person",
                        "name": data.profile.name,
                        "jobTitle": data.ui.jobTitleShort[LANG],
                        "image": absImgUrl,
                        "description": data.profile.about[LANG],
                        "sameAs": [
                            data.meta.linkedin,
                            `mailto:${data.meta.email}`
                        ],
                        "worksFor": {
                            "@type": "Organization",
                            "name": data.experience[0].company[LANG].split('|')[1]?.trim() || "Anadolu University"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": data.meta.location[LANG]
                        }
                    }
                }
            ]
        };
        jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
    }

    // --- 4. CONTENT INJECTION ---
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    const setHref = (id, url) => { const el = document.getElementById(id); if (el) el.href = url; };

    setText('p-name', data.profile.name);
    setText('p-title', data.profile.title[LANG]);
    setText('p-location', data.meta.location[LANG]);
    setText('ui-print', data.ui.print[LANG]);

    setText('link-email', data.meta.email);
    setHref('link-email', `mailto:${data.meta.email}`);

    setText('link-linkedin', data.meta.linkedinLabel);
    setHref('link-linkedin', data.meta.linkedin);

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = utils.renderLayout(data, LANG);
    }

    // --- 5. WRITE FILE ---
    fs.writeFileSync('index.html', dom.serialize());
    console.log('✅ index.html generated with PERFECTION metadata.');

} catch (err) {
    console.error("❌ Error generating static site:", err);
    process.exit(1);
}