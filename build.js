const fs = require('fs');

// 1. Load Data
const dataContent = fs.readFileSync('./data.js', 'utf8');
const resumeData = eval(dataContent + '; resumeData;'); 

// 2. Load the CLEAN Template (Not the finished index.html)
// We use template.html so we always start fresh.
let html = fs.readFileSync('./template.html', 'utf8');

const lang = 'en'; // Default language for SEO/Bots

// 3. Helper Function (Generates the HTML Block)
function generateList(items) {
    return items.map(item => {
        const title = item.role ? item.role[lang] : item.degree[lang];
        const sub = item.company ? item.company[lang] : item.school[lang];
        const desc = item.desc[lang];
        const date = item.date[lang];
        const loc = item.location[lang];
        
        return `
        <div class="job-block">
            <div class="job-header">
                <span class="job-title">${title}</span>
                <span class="job-date">${date}</span>
            </div>
            <div class="job-subheader">
                <span class="company">${sub}</span>
                <span class="location">${loc}</span>
            </div>
            <div class="job-content"><p>${desc}</p></div>
        </div>`;
    }).join('');
}

// 4. Inject Content into the Template
// We replace the empty tags with the filled content
html = html.replace('<div id="experience-list"></div>', `<div id="experience-list">${generateList(resumeData.experience)}</div>`);
html = html.replace('<div id="education-list"></div>', `<div id="education-list">${generateList(resumeData.education)}</div>`);
html = html.replace('<p id="p-about"></p>', `<p id="p-about">${resumeData.profile.about[lang]}</p>`);

// 5. Save as index.html (This overwrites the old one with the new version)
fs.writeFileSync('./index.html', html);

console.log('🚀 Build Complete! index.html has been regenerated.');
