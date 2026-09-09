# Taim Baklouti | Portfolio

Personal portfolio website built with Next.js 15, featuring fullpage scrolling, Framer Motion animations, and Tailwind CSS. The site showcases projects from a JSON data source and includes structured SEO.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Features

- **Fullpage Scrolling** — Section-based navigation on the home page with sidebar active indicator
- **Smooth Page Transitions** — Fade + scale animation between routes via Framer Motion
- **Scroll Animations** — Staggered entrance animations on skills, experience, and project sections
- **Dynamic Project Data** — Projects loaded from a JSON file with category filtering and detail pages
- **Interactive Photo Stack** — 3-image stack with organic scattered positions, subtle floating animation (7–9s cycles), and random rotation offsets on each page load
- **Animated Quote Section** — Word-by-word blur-in animation with decorative quote marks, Socrates quote, and author attribution
- **Project Cards** — Hover-reveal info panels with backdrop blur, gradient overlays, and zoom effects
- **Minimalist Theme Toggle** — Elegant sun/moon icon with smooth rotation animation, integrated seamlessly into the navbar
- **Focus Glow** — Contact form inputs glow red on focus with subtle scale animation
- **Button Micro-Interactions** — Spring-based hover/tap animations with red glow shadows
- **Social Icon Glow** — Red shadow glow on social media icon hover
- **Back Button Animation** — Rotation + scale on the back navigation button
- **Skeleton Loaders** — Full-page skeleton placeholders with shimmer animation on every route (hero, about, projects, archive, project detail) — GPU-composé via `transform: translateX()`
- **Lazy Loading Images** — `priority` on hero images (LCP optimization), `loading="lazy"` on all below-fold images
- **Dynamic Imports** — Heavy sections (About, Skills, Experience, Education, Quote) loaded on-demand via `next/dynamic`, reducing initial bundle ~40%
- **Cursor-based Pagination** — Archive page loads 5 projects at a time with Load More and Show All controls
- **Responsive Timeline** — Alternating experience cards with animated timeline dots and gradient line
- **Interactive Skills Grid** — Clickable skill categories with staggered tag animations
- **Animated Quote Section** — Word-by-word blur-in animation with decorative quote marks
- **Accessible Contrast** — WCAG AA compliant text colors (8.7:1 contrast ratio)
- **SEO** — Per-page metadata, OpenGraph tags, and JSON-LD Person structured data
- **Responsive** — Scales smoothly across browser zoom levels (100%–150%)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Scrolling:** @taim/react-fullpage-snap
- **Fonts:** Poppins, Jost (self-hosted via next/font, optimized weights)
- **Icons:** FontAwesome
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel

## UI Improvements

### Sidebar

- Thinner design (`w-12`) with gradient background `from-red-500 to-red-700`
- Smooth hover transitions with icon scale-up effect
- Subtle dot decoration and magic indicator with backdrop blur
- Spaced from screen edge (`left-2`)

### Theme Toggle

- Minimalist sun/moon icon replacing the previous 3D button
- Smooth rotation animation via Framer Motion `AnimatePresence`
- Moon icon colored to match the red palette (`text-red-300/70`)

### Typography

- Improved readability with `leading-relaxed` and `tracking-wide` across all pages
- Clear visual hierarchy between headings and body text
- Consistent text colors using `text-neutral-700` (WCAG AA compliant)

### Footer

- Gradient divider `from-transparent via-red-300/50 to-transparent`
- Tech stack attribution line
- Smooth scroll-reveal animations

### Project Cards

- Rounded corners with hover border glow
- Gradient year badge with `rounded-br-xl` shape
- Image zoom on hover (`scale-110`)
- Mobile: backdrop blur overlay for text readability
- Desktop: sliding info panel with gradient overlay on hover
- Unified `rounded-md` tech tags

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)

### Installation

```bash
git clone https://github.com/taimbaklouti/taim-portfolio.git
cd taim-portfolio
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the Formspree ID:

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
```

### Development

```bash
pnpm dev
```

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
app/
├── layout.jsx          # Root layout (Navbar, Analytics, JSON-LD)
├── globals.css         # Global styles and Tailwind
├── (root)/             # Home page with fullpage sections
│   ├── layout.jsx      # FullPageProvider + Sidebar
│   └── page.jsx        # Hero, About, Projects, Contact sections
├── about/              # About page
│   └── components/     # Skills, Experience, Education, Quote
├── projects/           # Projects listing with filtering
│   ├── [slug]/         # Dynamic project detail pages
│   └── archive/        # Full project archive
├── not-found.jsx       # Custom 404 page with animations
components/             # Shared UI (Navbar, Sidebar, Footer, Button, etc.)
json/data.json          # Project data source
public/image/           # Static images
```

## Développement

### Prérequis

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (ou npm)

### Installation

```bash
git clone https://github.com/taimbaklouti/taim-portfolio.git
cd taim-portfolio
pnpm install
```

### Scripts disponibles

| Commande            | Description                                   |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Lance le serveur de développement (Turbopack) |
| `pnpm build`        | Build de production                           |
| `pnpm start`        | Démarre le serveur de production              |
| `pnpm lint`         | Vérifie le code avec ESLint                   |
| `pnpm format`       | Formate le code avec Prettier                 |
| `pnpm format:check` | Vérifie le formatage sans modifier            |
| `pnpm analyze`      | Build avec analyse du bundle                  |
| `pnpm postbuild`    | Génère le sitemap après le build              |

### Variables d'environnement

Copiez `.env.example` vers `.env.local` et remplissez les valeurs.

```
NEXT_PUBLIC_FORMSPREE_ID=ton_formspree_id
```

### Contribution

Les contributions sont les bienvenues ! Si vous trouvez un bug ou avez une suggestion, ouvrez une _issue_ ou soumettez une _pull request_.

### Licence

Ce projet est sous licence GPL-3.0 — voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Pages

### Home

Introduction with fullpage scroll sections — Hero, About preview, Projects preview, and Contact with social links. Includes a scroll indicator on first load.

### About

Detailed bio with backdrop blur container, skills with interactive category filtering, animated work experience timeline with alternating cards, education & achievements section, and animated quote with decorative marks.

### Projects

Filterable project grid (Web, AI/ML, Other) with gradient category buttons. Each project links to a detail page with full description, tech stack, links, and image gallery. Full archive table with tech tags.

### 404

Animated 404 page with floating numbers, gradient orb, glow buttons, and decorative line animation.

### Contact

Contact form with real-time validation, focus glow effects, success/error banners, and social links (GitHub, Instagram, LinkedIn).

## Customization

### Project Data

Edit `json/data.json` to add or modify projects. See [CLAUDE.md](CLAUDE.md) for the data schema.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## Inspiration

- [frans.my.id](https://www.frans.my.id/)
- [kuon-yagi-portfolio](https://kuon-yagi-portfolio.netlify.app/)

## License

This project is licensed under the GPL-3.0 License — see the [LICENSE](LICENSE) file for details.

Copyright (C) 2025 Taim Baklouti
