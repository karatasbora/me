# 📄 Interactive Resume / CV

A modern, data-driven personal resume website built with **Vanilla JavaScript**, **CSS Variables**, and **Semantic HTML5**.

This project functions as a Single Page Application (SPA) where content is strictly decoupled from the presentation layer. It features dynamic localization (i18n), accessible design patterns, and an automated SEO strategy.

🔗 **Live Demo:** [https://karatasbora.github.io/resume/](https://karatasbora.github.io/resume/)

## ✨ Key Features

* **⚡ Data-Driven Architecture:** All content (experience, education, skills) is stored in a structured JSON object (`data.js`), making updates instant without touching HTML.
* **🌍 Bilingual Support (i18n):** Toggles between **Turkish (TR)** and **English (EN)** instantly. This changes not just text, but also:
* `document.lang` attributes for screen readers.
* SEO Metadata (`<title>`, `<meta description>`).
* JSON-LD Structured Data for search engines.


* **wm/🌙 Dark & Light Mode:** * Uses CSS Variables for efficient theming.
* Automatically detects system preference (`prefers-color-scheme`).
* Persists state during the session.


* **🖨️ Print Optimized:** Includes a tailored `@media print` stylesheet that removes UI elements, forces high-contrast black/white typography, and scales the layout to fit perfectly on A4 paper.
* **🛡️ Robust Fallbacks:** Includes a `<noscript>` version that renders a raw HTML view for users/bots with JavaScript disabled.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, ES6+ JavaScript.
* **Styling:** CSS Custom Properties (Variables), Flexbox, Mobile-First Design.
* **No Dependencies:** Zero frameworks, zero build steps, lightweight performance.

## 📂 Project Structure

```bash
├── data.js       # The "Database" - Contains all resume content (JSON format)
├── index.html    # The "View" - Semantic skeleton and SEO meta tags
├── script.js     # The "Controller" - Handles rendering, state, and DOM manipulation
├── style.css     # The Styling - Includes animations and print media queries
└── profil.png    # Profile image assets

```

## 🚀 How to Use / Customize

Since this project separates data from the view, you can easily adapt it for your own use.

1. **Clone the repository:**
```bash
git clone https://github.com/karatasbora/resume.git

```


2. **Edit Content:**
Open `data.js`. You will see the `resumeData` object. simply edit the strings for `tr` and `en` keys.
```javascript
// Example: data.js
profile: {
    name: "Your Name",
    title: {
        tr: "Unvanınız",
        en: "Your Job Title"
    },
    // ...
}

```


3. **Change Images:**
Replace `profil.png` with your own photo. Ensure the aspect ratio is roughly square (1:1).
4. **Run Locally:**
No build server is required. simply open `index.html` in your browser, or use an extension like **Live Server** in VS Code.

## 🔍 SEO & Metadata

The application dynamically updates Open Graph (Facebook/LinkedIn) and Twitter Card tags when the language changes, ensuring that shared links display the correct language context.

* **Google Verification:** Integrated via meta tag.
* **JSON-LD:** Structured `Person` schema included for rich search results.

## 📄 License

This project is open source. Feel free to use it as a template for your own resume.

---

**Author:** [Bora Karataş](https://www.linkedin.com/in/borakaratas)
