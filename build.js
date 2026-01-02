const fs = require('fs');
const path = require('path');

// 1. Load your Resume Data
// We use 'eval' here simply because data.js is a client-side file with 'const'.
// In a larger app, you'd use JSON, but this works for your current setup.
const dataContent = fs.readFileSync('./data.js', 'utf8');
const resumeData = eval(dataContent + '; resumeData;'); // Extract the object

// 2. Load your HTML Template
let html = fs.readFileSync('./index.html', 'utf8');

// 3. Define the "Default" Language (e.g., English)
const lang = 'en'; 

// 4. Helper function to generate HTML (Mirrors your script.js logic)
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

// 5. INJECT CONTENT (Replacements)
// This replaces empty divs with actual content
html = html.replace('<div id="experience-list"></div>', `<div id="experience-list">${generateList(resumeData.experience)}</div>`);
html = html.replace('<div id="education-list"></div>', `<div id="education-list">${generateList(resumeData.education)}</div>`);
html = html.replace('<p id="p-about"></p>', `<p id="p-about">${resumeData.profile.about[lang]}</p>`);

// 6. Write the final file
fs.writeFileSync('./index.html', html);
console.log('✅ index.html has been pre-rendered with English content!');
