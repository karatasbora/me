/* Run this script with Node.js to update index.html 
   with static content for SEO/No-Script users.
   Usage: node generate-static.js
*/

const fs = require('fs');
const data = require('./data.js'); // Your existing data file

// 1. Generate the HTML content from data.js (Defaulting to English or Turkish)
const lang = 'en'; // Choose your default SEO language
const profile = data.profile;

let htmlContent = `
    <article style="max-width: 900px; margin: 40px auto; font-family: sans-serif; line-height: 1.6;">
        <header style="border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-family: serif; font-size: 2.5rem; color: #2C3E50;">${profile.name}</h1>
            <p style="font-size: 1.1rem; color: #6C5CE7; font-weight: bold;">${profile.title[lang]}</p>
            <p>${data.meta.location[lang]} | <a href="mailto:${data.meta.email}">${data.meta.email}</a></p>
        </header>

        <section>
            <h2 style="color: #2C3E50; border-left: 4px solid #6C5CE7; padding-left: 10px;">About</h2>
            <p>${profile.about[lang]}</p>
        </section>

        <section>
            <h2 style="color: #2C3E50; border-left: 4px solid #6C5CE7; padding-left: 10px;">Experience</h2>
            ${data.experience.map(job => `
                <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #333;">${job.role[lang]}</h3>
                    <div style="color: #666; font-size: 0.9em;">${job.company[lang]} | ${job.date[lang]}</div>
                    <p>${job.desc[lang]}</p>
                </div>
            `).join('')}
        </section>
        
        <section>
            <h2 style="color: #2C3E50; border-left: 4px solid #6C5CE7; padding-left: 10px;">Skills</h2>
            <p>${data.skills[lang].join(', ')}</p>
        </section>
    </article>
`;

// 2. Read index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// 3. Regex to replace content inside <noscript id="static-content">...</noscript>
const regex = /(<noscript id="static-content">)([\s\S]*?)(<\/noscript>)/;

if (indexHtml.match(regex)) {
    const newHtml = indexHtml.replace(regex, `$1${htmlContent}$3`);
    fs.writeFileSync('index.html', newHtml);
    console.log('✅ index.html <noscript> content updated successfully!');
} else {
    console.error('❌ Could not find <noscript id="static-content"> in index.html');
}
