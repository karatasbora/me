# Custom Static Resume Generator

A lightweight, custom-built Static Site Generator (SSG) designed for high-performance personal resume websites. This project demonstrates a "Hybrid Rendering" architecture using Vanilla JavaScript and Node.js, eliminating the need for heavy frontend frameworks while maximizing SEO and interactivity.

## 🚀 Key Features

* **Hybrid Architecture**: Combines **Static Site Generation (SSG)** for immediate SEO/performance with **Client-Side Rendering (CSR)** for instant language switching.
* **Zero-Dependency Client**: The client-side runtime is 100% Vanilla JavaScript, ensuring a near-zero bundle size and perfect Lighthouse scores.
* **Built-in Internationalization (i18n)**: Dual-language support (TR/EN) managed via a single data source. Language toggling is instantaneous and stateful.
* **Automated SEO & Schema**: Automatically generates `sitemap.xml` and injects **JSON-LD** structured data (Schema.org/Person) during the build process.
* **Smart Print Styles**: Includes a dedicated `print.css` that transforms the interactive web layout into a professional, one-page printable PDF format.
* **Dark Mode**: System-aware dark mode with a manual toggle and local storage persistence.
* **Contextual Navigation**: Interactive "Skill Tags" that highlight relevant job experience across the timeline when clicked.

## 📂 Project Structure

* **`data.js`**: The single source of truth. Contains all resume content, metadata, and translations.
* **`static.js`**: The build script. Runs in Node.js to pre-render `index.html` using JSDOM.
* **`utils.js`**: Shared utility library used by both the build script (SSG) and the browser (CSR) for scraping and rendering data.
* **`script.js`**: Client-side logic for hydration, interactions, and theme management.
* **`style.css`**: CSS variables-based design system supporting light/dark modes.
* **`.github/workflows/update.yml`**: CI/CD pipeline that auto-builds and commits the HTML whenever data changes.

## 🛠️ Installation & Usage

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/me.git](https://github.com/yourusername/me.git)
    cd me
    ```

2.  **Install Dependencies**
    The project only requires `jsdom` for the build process.
    ```bash
    npm install jsdom
    ```

3.  **Local Development**
    To modify content, edit `data.js`. The structure separates content from presentation:
    ```javascript
    // Example in data.js
    const person = {
        name: "Your Name",
        jobTitle: { tr: "Geliştirici", en: "Developer" },
        // ...
    };
    ```

4.  **Build the Site**
    Run the generator script to compile your data into `index.html`:
    ```bash
    node static.js
    ```

## 🤖 CI/CD Automation

This repository includes a GitHub Actions workflow (`.github/workflows/update.yml`) that acts as a self-healing mechanism.

* **Trigger**: Pushes to `main` involving `data.js`, `static.js`, or the workflow file.
* **Action**:
    1.  Sets up Node.js.
    2.  Runs `node static.js` to regenerate the HTML and Sitemap.
    3.  Commits the updated `index.html` and `sitemap.xml` back to the repository.
* **Benefit**: You never need to manually edit `index.html`. Just update your JSON data and push.
