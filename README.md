# 📄 Interactive Hybrid Resume (SSG + SPA)

A high-performance, accessible, and bilingual personal resume website built with **Vanilla JavaScript**, **Node.js**, and **CSS Variables**. This project implements a unique "Hybrid" architecture that combines the SEO benefits of Static Site Generation (SSG) with the interactivity of a Single Page Application (SPA).

## 🚀 Key Features

* **Hybrid Rendering Architecture:**
* **Static Generation (SSG):** Uses `static.js` and `JSDOM` to pre-render content into `index.html` at build time for perfect SEO and performance.
* **Client-Side Hydration (CSR):** Uses `script.js` to handle dynamic updates (language switching, themes) without page reloads.


* **headless Data Management:** All content resides in `data.js`, acting as a lightweight "Headless CMS." Updating this single file propagates changes to both the static build and the live app.
* **Advanced Interactivity:**
* **Bi-directional Skill Graph:** Clicking a skill tag (e.g., "Instructional Design") dynamically highlights related job experiences via a popup menu.
* **Theme Toggle:** System-aware Dark/Light mode with CSS variable overrides.
* **Language Toggle:** Instant switching between Turkish (TR) and English (EN).


* **SEO & Accessibility:**
* Automatic **JSON-LD Schema.org** generation.
* Semantic HTML5 and ARIA attributes for screen readers.


* **Print Optimization:** Dedicated `print.css` ensures the resume prints as a clean, minimalist PDF, hiding interactive buttons and navigation.

## 🛠️ Technical Architecture

This project uses an **Isomorphic Utility Pattern**. The core rendering logic in `utils.js` is written in a Universal Module Definition (UMD) format, allowing it to be used in two environments:

1. **Node.js (Build Time):** Required by `static.js` to generate the initial HTML.
2. **Browser (Runtime):** Loaded via `<script>` tag to allow `script.js` to re-render sections dynamically when the user changes languages.

## 📂 Project Structure

* **`data.js`**: The single source of truth for all resume content (Experience, Skills, Meta tags).
* **`utils.js`**: The rendering engine. Contains `renderLayout`, `renderBlock`, and XSS protection logic.
* **`static.js`**: A Node.js script that uses `JSDOM` to inject data into `index.html` for the static build.
* **`script.js`**: Client-side logic for event listeners, animations, and state management.
* **`style.css`**: Main stylesheet using a custom Tailwind-inspired color palette.
* **`.github/workflows/update.yml`**: CI pipeline that detects changes in `data.js` and auto-commits the updated `index.html`.

## 🚦 Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/karatasbora/resume.git
cd resume

```


2. Install dependencies (Required for the SSG builder):
```bash
npm install jsdom

```



### Local Development

To view the site, simply open `index.html` in your browser. Since it is a static file, no server is strictly required for viewing, though a live server (like VS Code Live Server) is recommended for development.

### Generating the Static Site

If you modify `data.js` and want to update the static HTML (for SEO purposes), run:

```bash
node static.js

```

*This will read `data.js`, render the content using `utils.js`, and overwrite `index.html` with the new markup.*

## 🤖 Automation

This repository uses **GitHub Actions** to keep the static HTML in sync with the data.

* **Trigger:** Pushes to the `main` branch involving `data.js`, `static.js`, or the workflow file.
* **Action:** Runs `node static.js` to regenerate `index.html`.
* **Result:** Automatically commits and pushes the updated `index.html` back to the repository if changes are detected.

## 🎨 Customization

1. **Edit Content:** Modify `data.js` to update your profile, experience, or skills.
2. **Change Colors:** Edit the `:root` variables in `style.css` to change the color scheme (Slate, Cyan, Amber primitives).
3. **Add Sections:** Update the `structure` array in `data.js` to reorder or add new sections.

---

*Created by [Bora Karataş*](https://karatasbora.github.io/)
