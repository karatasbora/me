# 📄 Universal Resume

> **A "Hybrid" Single Page Application (SPA) built with Vanilla JavaScript.** > Features a custom Static Site Generation (SSG) pipeline, dynamic internationalization (i18n), and zero build-time dependencies.

**Live Demo:** [https://karatasbora.github.io/resume/](https://karatasbora.github.io/resume/)

---

## 💡 Overview

This project is more than just a resume template; it is a technical demonstration of a **"Universal JavaScript"** architecture without frameworks.

It bridges the gap between static sites and dynamic apps by using the same logic layer (`utils.js`) in two environments:

1. **Build Time (Node.js):** Generates a fully rendered `index.html` for SEO and instant first-paint performance.
2. **Run Time (Browser):** Hydrates the page to handle instant language switching and theme toggling without reloads.

## ✨ Key Features

### 🏗 Architecture & Performance

* **Hybrid SSG + CSR:** Pre-rendered HTML for search engines (SEO), client-side rendering for interactivity.
* **Zero Dependencies:** Built entirely with Vanilla JS, HTML5, and CSS3. No Webpack, React, or npm hell.
* **Universal Module Definition (UMD):** The core rendering logic works natively in both Node.js and the browser.

### 🎨 UX & Accessibility

* **Dynamic i18n:** Instant toggle between **Turkish (TR)** and **English (EN)**. Updates content, document title, meta descriptions, and JSON-LD schema on the fly.
* **Smart Theming:** CSS Variable-based Dark/Light mode that respects system preferences (`prefers-color-scheme`) and persists user choice via `localStorage`.
* **Print Optimized:** A dedicated `@media print` stylesheet ensures the CV looks perfect on A4 paper (removes UI, forces high-contrast typography, handles page breaks).

### 🤖 Automation

* **CI/CD Pipeline:** A GitHub Actions workflow (`update.yml`) automatically triggers the static build script whenever `data.js` is modified, committing the updated `index.html` back to the repository.

---

## 📂 Project Structure

The project strictly separates data, view, and logic:

```bash
├── data.js       # SINGLE SOURCE OF TRUTH. Contains all resume content (JSON).
├── utils.js      # UNIVERSAL LOGIC. Rendering functions shared by Node & Browser.
├── static.js     # BUILD SCRIPT. Node.js script for Static Site Generation (SSG).
├── script.js     # CLIENT SCRIPT. Handles DOM events, state, and browser rendering.
├── style.css     # STYLES. CSS Variables, Animations, and Print rules.
├── index.html    # TEMPLATE. The semantic skeleton injected by the build script.
└── .github/      # CI/CD. Workflows for auto-building on push.

```

---

## 🚀 Getting Started

### 1. Clone & Run Locally

Since there are no build tools or dependencies, you can run this immediately.

```bash
git clone https://github.com/karatasbora/resume.git
cd resume
# Open index.html in your browser

```

*(Optional)* To test the Static Site Generator locally:

```bash
# Requires Node.js installed
node static.js

```

### 2. Customization

You never need to touch the HTML.

1. Open `data.js`.
2. Modify the `resumeData` object.
3. To change the section order, rearrange the `structure` array at the top of the file:
```javascript
structure: [
    { type: 'text', titleKey: 'about', dataKey: 'profile.about' },
    { type: 'list', titleKey: 'experience', dataKey: 'experience' },
    // ... reorder as needed
]

```



### 3. Deployment

Simply push your changes to the `main` branch.

* **GitHub Pages** will serve the content.
* **GitHub Actions** will detect changes to `data.js` and automatically run `node static.js` to update the HTML structure if you haven't done so locally.

---

## 🛠 Technical Deep Dive: The "Universal" Pattern

Most static site generators (Next.js, Hugo) require complex toolchains. This project achieves similar results with simple code:

**The Shared Renderer (`utils.js`):**

```javascript
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(); // Export for Node.js
    } else {
        root.resumeUtils = factory(); // Export for Browser
    }
}(this, function() {
    return { renderLayout: (data, lang) => { ... } };
}));

```

* **On GitHub Push:** `static.js` requires this file to build the HTML string and write it to disk.
* **In Browser:** `script.js` uses the global `resumeUtils` to re-render the `<main>` content when you click the "TR/EN" toggle.

---

## © License

**Copyright © 2025 Bora Karataş.**

This project is licensed under the **GNU General Public License v3.0**.

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved.

See the [LICENSE](https://www.google.com/search?q=LICENSE) file for the full text of the license.
