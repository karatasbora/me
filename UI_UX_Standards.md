# UI/UX Standards Report

## 1. Design System Philosophy
**Name:** The Modern Sage / Modern AI Design System
**Core Principle:** A clean, accessible, and human-centered design that mimics the precision of modern AI aesthetics while maintaining organic readability.

## 2. Color System
The project uses a semantic color system mapped to primitive Zinc (Neutral) and Indigo (Brand) scales.

### Palette Primitives
*   **Zinc (Neutral):** #fafafa (50) to #09090b (950)
*   **Indigo (Brand):** #eef2ff (50) to #1e1b4b (950)

### Semantic Mapping (Light/Dark Support)
| Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-color` | Zinc-50 (#fafafa) | Zinc-950 | Main Background |
| `--bg-alt` | #ffffff | Zinc-900 | Card Backgrounds |
| `--primary-text` | Zinc-950 | Zinc-50 | Body Text |
| `--secondary-text` | Zinc-500 | Zinc-400 | Subtitles, Descriptions |
| `--meta-color` | Zinc-500 | Zinc-400 | Dates, Metadata |
| `--accent-color` | Indigo-500 | Indigo-400 | Key highlights, Links |
| `--card-bg` | #ffffff | Zinc-900 | Job Cards |

## 3. Typography
Three distinct typefaces are used to create hierarchy and character.

| Role | Font Family | Styles / Weights | Features |
| :--- | :--- | :--- | :--- |
| **Headings** | `Inter` | 600, 700 | Tight tracking (`-0.02em` to `-0.04em`) |
| **Body Copy** | `IBM Plex Sans` | 400 | High legibility for long form text |
| **UI Elements** | `Outfit` | 500, 600, 700 | Friendly, geometric for buttons, tags, metadata |

## 4. Layout & Spacing
*   **Container Width:** Max 900px, horizontally centered.
*   **Padding:** 60px global padding.
*   **Card Design:**
    *   `border-radius: 12px` (Cards)
    *   `border-radius: 6px` (Buttons/Tags)
    *   **Shadows:** Subtle ambient shadow (`shadow-sm`) that deepens on hover.

## 5. Interactive Elements
*   **Hover States:**
    *   **Cards:** Lift effect (`translateY(-1px)`) + intensified shadow.
    *   **Links:** Color shift to brand accent + underline color match.
    *   **Buttons:** Background brightness shift / opacity change.
*   **Focus States:** Double-ring focus indicator (`indigo-100` ring + `indigo-500` ring) for accessibility (`focus-visible`).
*   **Transitions:** Global `0.2s` - `0.3s` ease for backgrounds, colors, and transforms.

## 6. Motion & Animation
*   `simpleFade`: Smooth entry for headers (0.8s).
*   `slideUp`: Section entry animation (0.6s).
*   `tagFadeIn`: Staggered entry for skill tags.

## 7. Accessibility (a11y)
*   **Contrast:** High contrast ratios ensured in both light and dark modes (e.g., Zinc-950 on Zinc-50).
*   **Semantic HTML:** Proper use of `<header>`, `<main>`, `<section>`, `<h1>`–`<h3>`.
*   **Keyboard Nav:** Custom focus outlines.
*   **ARIA:** `aria-label` used on icon-only buttons (Theme toggle, Print).
