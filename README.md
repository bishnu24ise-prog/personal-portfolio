# Bishnu Kumar Sardar — Personal Portfolio Website 🚀

> **"I build AI-powered products that solve real problems, from accessibility to agriculture."**

A high-performance personal portfolio built for **Bishnu Kumar Sardar** (Full-Stack MERN Developer, AI-Powered Web App Builder & UI/UX Designer). Designed with a modern dark "developer-futuristic" aesthetic featuring electric cyan & violet neon accents, editorial typography, and an interactive 3D WebGL hero scene echoing **TopoForge** and **DevMap**.

### 🔗 Profiles & Contact
- 💻 **LeetCode**: [https://leetcode.com/u/Bishnu2005/](https://leetcode.com/u/Bishnu2005/)
- 🐙 **GitHub**: [https://github.com/bishnu24ise-prog](https://github.com/bishnu24ise-prog)
- 💼 **LinkedIn**: [https://www.linkedin.com/in/bishnu-kumar-sardar-767a57329](https://www.linkedin.com/in/bishnu-kumar-sardar-767a57329)
- 📄 **Resume**: [Google Drive Resume](https://drive.google.com/file/d/1XJmG_bwk02UN70vSVqcmqECkYnIwqhch/view?usp=sharing)
- ✉️ **Email**: [bishnusardar235@gmail.com](mailto:bishnusardar235@gmail.com)

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | **Next.js 16** (App Router, Turbopack, Partial Prerendering) |
| **Language** | **TypeScript 5** (Strictly Typed Data Contracts) |
| **Styling** | **Tailwind CSS v4** + Custom Glassmorphic Utilities & Cyber Grids |
| **3D Graphics** | **Three.js** (Interactive 60 FPS Procedural Terrain & Codebase City Blocks) |
| **Icons** | **Lucide React** + Pixel-Perfect Brand SVG Primitives |
| **SEO & Meta** | JSON-LD Person Schema, Open Graph Cards, Semantic HTML5, Dynamic Sitemap & Robots.txt |
| **Deployment** | **Vercel** Ready |

---

## 📂 Project Architecture

```
MY protofolio/
├── public/
│   ├── images/
│   │   ├── profile.jpg             # High-res authentic profile photo of Bishnu
│   │   └── projects/
│   │       ├── unifytalk-1.png     # Project screenshots (slug-1.png)
│   │       ├── cropiq-1.png
│   │       └── devmap-1.png
│   ├── gallery/                    # 14 authentic hackathon & builder moments
│   │   ├── aideastorm-unifytalk-code-lanyard.jpg
│   │   ├── pitching-to-judges-poiema.jpg
│   │   ├── geotagged-live-demo-cit.jpg
│   │   ├── receiving-award-envelope.jpg
│   │   ├── award-ceremony-stage.jpg
│   │   ├── hackarena-grand-finale-venue.jpg
│   │   └── ...
│   ├── certificates/               # 25 verified certificates & awards (.jpeg, .png, .pdf)
│   │   ├── luminix-runner-up.jpeg
│   │   ├── aideastorm-hackathon.png
│   │   ├── devstack-outstanding-intern.jpg
│   │   ├── devstack-internship-completion.jpg
│   │   └── ...
│   ├── resume-bishnu-kumar-sardar.pdf # Authentic 1-page updated PDF resume
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, Google Fonts (Space Grotesk + Inter), SEO JSON-LD
│   │   ├── page.tsx                # Homepage assembling all sections
│   │   ├── globals.css             # Design tokens, theme variables, glassmorphism, glows
│   │   ├── sitemap.ts              # Dynamic search engine sitemap
│   │   └── robots.ts               # Robots.txt rules
│   ├── components/
│   │   ├── 3d/
│   │   │   └── Hero3DScene.tsx     # Three.js 3D terrain mesh & city blocks (mouse reactive)
│   │   ├── ui/
│   │   │   ├── Navbar.tsx          # Sticky blur navbar with active section spy & theme toggle
│   │   │   ├── Footer.tsx          # Institutional footer with back-to-top
│   │   │   ├── SectionHeader.tsx   # Consistent section titles, badges, and subtitles
│   │   │   ├── CountUp.tsx         # Animated scroll-triggered number counter
│   │   │   ├── Icons.tsx           # GitHub and LinkedIn SVG primitives
│   │   │   ├── VoiceAgent.tsx      # Interactive AI Voice Guide with audio equalizer & speech synthesis
│   │   │   ├── Tilt3DCard.tsx      # Hardware-accelerated 3D mouse tilt with holographic sheen
│   │   │   └── ProjectImageFallback.tsx # High-tech cyber mesh fallback for images
│   │   └── sections/
│   │       ├── HeroSection.tsx     # Dynamic role typewriter, CTAs, real profile photo
│   │       ├── AchievementsStrip.tsx # 5 headline distinction cards with count-up
│   │       ├── AboutSection.tsx    # Story, CIT college context, 4 technical pillars
│   │       ├── ProjectsSection.tsx # Filter chips, 6 featured case studies, expandable grid
│   │       ├── ProjectModal.tsx    # Deep-dive Problem -> Solution -> Impact dialog
│   │       ├── ExperienceSection.tsx # Vertical timeline with cert triggers
│   │       ├── CertificateModal.tsx  # Lightbox preview modal for credentials & PDFs
│   │       ├── SkillsSection.tsx   # 5 grouped capability domains + "Currently Exploring"
│   │       ├── CertificatesGallery.tsx # Filterable 25 certificates grid
│   │       ├── PersonalGallerySection.tsx # Authentic hackathon moments & live demos grid
│   │       ├── GalleryModal.tsx    # Fullscreen lightbox modal with keyboard navigation
│   │       ├── EducationSection.tsx # Academic record (CIT CGPA 8.80, Arniko, Janak Memorial)
│   │       └── ContactSection.tsx  # Interactive contact dispatcher, copy-email toast
│   ├── data/
│   │   └── portfolio.ts            # SINGLE SOURCE OF TRUTH (All typed data)
│   └── types/
│       └── portfolio.ts            # TypeScript data interfaces
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18.17+` or `v20+` (Tested on Node `v24`)
- npm, pnpm, or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally in Development Mode
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Edit Content & Add New Items

**All portfolio content is centralized in ONE typed file:**  
👉 **[`src/data/portfolio.ts`](src/data/portfolio.ts)**

Adding or editing items requires **no component modifications**:

### To Add a New Project:
1. (Optional) Place screenshot in `public/images/projects/<slug>-1.png`.
2. Open `src/data/portfolio.ts` and append an entry to `FEATURED_PROJECTS` or `MORE_PROJECTS`:
```ts
{
  id: "new-app",
  slug: "new-app",
  title: "New AI App",
  subtitle: "One-line summary",
  category: ["AI", "Full-Stack"],
  tagline: "Product elevator pitch",
  problem: "What problem does this solve?",
  solution: "How does the architecture solve it?",
  impact: "Verifiable metrics or awards",
  role: "Lead Full-Stack Developer",
  stack: ["Next.js", "Python", "Tailwind CSS"],
  links: {
    live: "https://example.com",
    github: "https://github.com/bishnu24ise-prog/example",
  },
  featured: true,
  accentColor: "#00F5D4",
}
```

### To Add a New Certificate or Award:
1. Place image in `public/certificates/<filename>.jpg`.
2. Open `src/data/portfolio.ts` and add an entry to `CERTIFICATES_GALLERY`:
```ts
{
  id: "cert-new",
  title: "Hackathon Name Award",
  issuer: "Organizing Body",
  issueDate: "2026",
  badgeText: "Winner",
  category: "Hackathon",
  imagePath: "/certificates/filename.jpg",
  caption: "Award details and verification note.",
}
```

### To Update Experience or Internship:
Open `src/data/portfolio.ts` and edit the `EXPERIENCES` array.

---

## 🎨 Design System

- **Dark Theme (Default)**: Deep Obsidian (`#090B10`) background, Charcoal cards (`#121828`), Electric Cyan (`#00F5D4`) and Deep Violet (`#8B5CF6`) gradients.
- **Light Theme**: Crisp off-white (`#F8FAFC`) with deep indigo accents, persisted automatically via `localStorage`.
- **Typography**:
  - Headings: `Space Grotesk` (Geometric display with technical character)
  - Body: `Inter` (Legible, modern, editorial)
  - Monospace: `JetBrains Mono` (Terminal logs, tags, code metrics)
- **Accessibility**:
  - Fully semantic HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
  - Accessible dialogs with `role="dialog"`, `aria-modal="true"`, Escape key dismissal, and backdrop click handlers.
  - Reduced-motion compliance (`prefers-reduced-motion: reduce`) which automatically disables continuous 3D WebGL rotation and animations.

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Bishnu Kumar Sardar portfolio"
   git branch -M main
   git remote add origin https://github.com/bishnu24ise-prog/<repo-name>.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)**, click **Add New Project**, and import your repository.
3. Vercel will automatically detect Next.js with zero configuration needed.
4. Click **Deploy**. Your portfolio will be live in under 60 seconds!
