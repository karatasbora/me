const fs = require('fs');
const path = require('path');

// 1. Load Data Securely
// We now use require() instead of eval(), which is safer and cleaner.
const resumeData = require('./data.js'); 

// 2. Load the CLEAN Template
// We use template.html so we always start fresh.
let html = fs.readFileSync('./template.html', 'utf8');

const lang = 'en'; // Default language for SEO/Bots (static HTML generation)

// 3. Helper Function (Generates the HTML Block)
function generateList(items) {
    if (!items) return '';
    
    return items.map(item => {
        const title = item.role ? item.role[lang] : item.degree[lang];
        const sub = item.company ? item.company[lang] : item.school[lang];
        const desc = item.desc[lang];
        const date = item.date[lang];
        const loc = item.location[lang];
        
        // Handle optional tags if they exist
        let tagsHTML = '';
        if (item.tags && item.tags[lang]) {
            const tagsList = item.tags[lang].map(tag => `<span class="skill-tag">${tag}</span>`).join('');
            tagsHTML = `<div class="tags-wrapper">${tagsList}</div>`;
        }
        
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
            <div class="job-content">
                <p>${desc}</p>
                ${tagsHTML}
            </div>
        </div>`;
    }).join('');
}

// 4. Inject Content into the Template
// We replace the empty tags with the filled content
console.log('⚙️  Generating static HTML...');

// Inject Experience
if (resumeData.experience) {
    html = html.replace(
        '<div id="experience-list"></div>', 
        `<div id="experience-list">${generateList(resumeData.experience)}</div>`
    );
}

// Inject Education
if (resumeData.education) {
    html = html.replace(
        '<div id="education-list"></div>', 
        `<div id="education-list">${generateList(resumeData.education)}</div>`
    );
}

// Inject About Text
if (resumeData.profile && resumeData.profile.about) {
    html = html.replace(
        '<p id="p-about"></p>', 
        `<p id="p-about">${resumeData.profile.about[lang]}</p>`
    );
}

// 5. Save as index.html
fs.writeFileSync('./index.html', html);

console.log('✅ Build Complete! index.html has been regenerated successfully.');
