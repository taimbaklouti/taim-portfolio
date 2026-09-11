// lib/chatbotFaq.js
// Offline FAQ knowledge base — instant answers when /api/chat isn't needed.
// Covers every page/section of the site + dynamic project-aware answers.

// ─── Lightweight projects index (mirrors json/data.json — no JSON import needed) ─
const PROJECTS_INDEX = [
  {
    slug: "edutounes",
    title: "EduTounes",
    tech: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Electron",
      "Ollama (local AI)",
      "OpenAI / Anthropic (cloud)",
      "KaTeX",
      "FSRS Spaced Repetition",
      "TypeScript",
    ],
    desc: [
      "An open-source, local-first study app that turns any lecture, PDF, or video into study notes, flashcards, quizzes, and a study chat — free, and private by default. Point it at a document, a website, a YouTube link, or an audio file and it generates clean notes (with math), spaced-repetition flashcards, quizzes, and a chat that knows your material.",
      "Born from my own struggle with learning difficulties, EduTounes was designed to democratize access to quality educational support in Tunisia. The project won 2nd place at the National AI SHIFT 2025 Hackathon, and the prize money was reinvested into learning backend development to take the platform from prototype to a fully functional desktop application.",
      "Two ways to run the AI: fully local (Ollama, no key, no cloud, no cost — auto-downloads a ~2GB model) or bring your own key (OpenAI/Anthropic) for top-tier quality. Notes and generated content live only on your machine. Tech: React 19, Vite, Tailwind, Electron shell, Ollama, KaTeX, FSRS spaced repetition. No backend, no telemetry, no account.",
    ],
    preview: "https://github.com/Blueturboguy07/EduTounes/releases/latest",
    code: "https://github.com/Blueturboguy07/EduTounes",
  },
  {
    slug: "calendar",
    title: "Calendar",
    tech: ["JavaScript Vanilla (IIFE)", "HTML5", "CSS3", "Drag & Drop API", "localStorage"],
    desc: [
      "An interactive calendar application with month and year views, drag-and-drop event management, dark/light themes, and smooth transition animations — a full-featured desktop-style app built entirely with vanilla JavaScript.",
      "The technical challenge was designing a multi-view system (month/year) with fluid grid animations while integrating the native HTML5 Drag & Drop API to move events between dates, with centralized state and dynamic badges limited to +N.",
      'Highlights include native drag & drop with visual feedback (drag-over effect, wobble animation on impact, real-time UI updates), a dual view with slide/fade transitions and auto-scroll to the current month, plus professional accessibility: role="grid", full keyboard navigation (Tab, Enter, Escape), and dark/light theme support via prefers-color-scheme.',
    ],
    preview: "",
    code: "",
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    tech: [
      "Chart.js",
      "JavaScript Vanilla",
      "localStorage",
      "Intl.NumberFormat",
      "Lucide Icons",
      "HTML5",
      "CSS3",
    ],
    desc: [
      "A complete personal finance management application with dashboard, interactive charts, Tunisian tax calculations (progressive IRPP, CNSS, CSS), category budgets, recurring transactions, CSV export, and save/restore — fully localized in French and English.",
      "The technical challenge was building an app equivalent to a professional financial web app: full internationalization (~130 keys per language), tax calculations across 8 progressive tax brackets, interactive charting with Chart.js, and robust persistence with validation — all in a single coherent JavaScript file.",
      "Highlights include an advanced i18n system with dynamic parameters and real-time updates without reloading (charts, tables, budgets, settings), complete Tunisian tax calculations (IRPP from 0% to 40%, CNSS 9.68%, CSS 1%), and smart analytics: doughnut charts with central labels, 12-month trend curves, budget-overrun alerts, and savings projections over 3/6/12 months based on real averages.",
    ],
    preview: "",
    code: "",
  },
  {
    slug: "imagevault",
    title: "ImageVault",
    tech: [
      "Unsplash API",
      "CSS Masonry (column-count)",
      "IntersectionObserver",
      "JavaScript Vanilla",
      "HTML5",
      "CSS3",
    ],
    desc: [
      "An infinite image gallery connected to the Unsplash API, with keyword search, multilingual random suggestions, parallax scrolling, and an immersive lightbox — all in a responsive, clean design without any framework.",
      "The technical challenge was implementing a fluid masonry layout with optimized infinite scrolling (IntersectionObserver), while maintaining staggered entry animations, a smooth 60 FPS parallax effect, and a credible skeleton loader in pure CSS and JavaScript.",
      "Highlights include optimized scrolling performance (IntersectionObserver with 400px rootMargin for anticipatory loading, parallax limited to visible cards via Set + requestAnimationFrame, shimmer skeleton loader), instant FR/EN internationalization with fade transitions, and an immersive lightbox with image download via fetch + Blob + URL.createObjectURL.",
    ],
    preview: "",
    code: "",
  },
  {
    slug: "love-letter",
    title: "Love Letter",
    tech: ["HTML5", "CSS3", "JavaScript Vanilla", "Canvas API"],
    desc: [
      "An interactive animated Valentine's card where the user must aim and shoot Cupid's arrow at a floating envelope to reveal a pixelated love letter, all set in a retro-chic universe with floating confetti. Created as part of a 7-day, 7-projects challenge.",
      "The technical challenge was simulating realistic arc physics in pure JavaScript — parabolic trajectory with gravity, progressive velocity based on bow draw strength, and adaptive hitbox detection that widens after each missed shot to keep the experience enjoyable.",
      "Highlights include procedural bow physics (progressive draw, bow recoil, heart-shaped particle trail, auto-adjusting hitbox), a multi-layer particle system (three depth planes with parallax, heart burst on impact, confetti rain with gravity physics), and full keyboard, mouse, and touch support with prefers-reduced-motion fallback.",
    ],
    preview: "",
    code: "",
  },
  {
    slug: "luv-song",
    title: "Luv Song",
    tech: [
      "Three.js (WebGL)",
      "Web Audio API",
      "GLSL Shaders",
      "GSAP",
      "GLTFLoader",
      "Procedural 3D",
    ],
    desc: [
      "An interactive 3D music visualization experience where a crystal heart reacts in real time to audio frequencies, with particles, circular waves, and a camera choreography that immerses the user in an atmospheric journey. Day 7 finale of the 7-day challenge.",
      "The technical challenge was synchronizing real-time audio spectrum analysis (FFT) with GLSL particle systems, a procedural heartbeat, and bloom post-processing, all orchestrated in a single render loop without performance degradation.",
      "Highlights include custom GLSL shaders for heart-shaped particles with per-instance color and size variation (InstancedBufferGeometry), real-time audio analysis with beat detection and bass-mapped heartbeat pulse (plus a cyclic 6-second bloom), and a narrative camera choreography with mouse parallax, drag rotation, and scroll zoom.",
    ],
    preview: "",
    code: "",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    tech: ["OpenWeatherMap API", "Geolocation API", "JavaScript Vanilla", "HTML5", "CSS3"],
    desc: [
      "A complete weather application with city search, automatic geolocation, live suggestions, °C/°F toggle, automatic day/night theme based on the time, and smooth animated counters for every weather metric. My first fully independent API integration project.",
      "The technical challenge was orchestrating four parallel API calls (current weather, 5-day forecast, geocoding, browser geolocation) with animated UI states (welcome → loading → weather/error) and aggregating 3-hour forecast data into daily summaries.",
      "Highlights include a state-based UI system with dedicated entry/exit animations (slide-up, scale, shake, fade) and staggered children, animated counters using requestAnimationFrame with cubic easing and cascade effects, and smart geolocation with progressive fallback (geolocation → saved city → home screen), debounced autocomplete (250ms), and persistent favorites.",
    ],
    preview: "",
    code: "",
  },
];

function getProjectBySlug(slug) {
  if (!slug) return null;
  return PROJECTS_INDEX.find((p) => p.slug === slug) || null;
}

export function getProjectTitle(slug) {
  return getProjectBySlug(slug)?.title || slug || "";
}

export const FAQ = [
  // ─── Who is Taim ─────────────────────────────────────
  {
    q: "Who is Taim Baklouti?",
    keywords: ["who is taim", "who are you", "about taim", "introduce taim"],
    a: "Taim Baklouti is a Tunisian high school senior (Baccalaureate Science Track, Lycée Ideal, class of 2028) ranked #1 in his class with a 15.14/20 average, AI Education Builder, creator of EduTounes, and a National League basketball player. He turned his own learning difficulties into motivation to build tools that help other students.",
  },
  {
    q: "What are your future goals?",
    keywords: ["future goals", "dream", "plan after", "what next", "ambition", "career goal"],
    a: "Taim aims to study **Computer Science** at a US or Canadian university on a full scholarship, continue growing EduTounes into a widely used learning platform, and pursue a career at the intersection of AI and education.",
  },
  {
    q: "How can I contact Taim?",
    keywords: ["contact", "email", "reach you", "get in touch", "message", "contact taim"],
    a: "Use the **Contact form** at the bottom of the home page (or the Contact CTA in the navigation). It supports the red focus-glow animation and sends via the Formspree integration. Social links (GitHub, LinkedIn, Instagram) are in the footer and the home contact section.",
  },
  {
    q: "Where do you study?",
    keywords: [
      "where do you study",
      "where did you study",
      "what did you study",
      "school",
      "lycee",
      "education",
      "baccalaureate",
    ],
    a: "Lycée Ideal — Science Track, Tunisia. Baccalaureate expected 2028. Ranked #1 every year with 15.14/20 average — notably achieved despite a diagnosed learning difficulty.",
  },
  {
    q: "What grades do you have?",
    keywords: ["grades", "average", "15.14", "ranked", "rank", "score"],
    a: "15.14/20 average, **#1 Ranked in Class** (Science Track). The average is also highlighted as a hero stat bar with animated counters on the home page.",
  },
  {
    q: "Who are you outside of tech?",
    keywords: ["outside of tech", "hobby", "outside tech", "personal life"],
    a: "Outside of tech Taim is a basketball player (national league since 2023), theater coordinator (~120 students, 10 teams), and a music/visual-effects enthusiast who built Days 1–7 of a 7-project creative challenge — from an arc-physics love letter to a GLSL heart visualizer.",
  },
  // ─── About — skills ──────────────────────────────────
  {
    q: "What are your main skills?",
    keywords: ["main skills", "key skills", "strengths"],
    a: "Four pillars on the About page: **Languages** (Python, JavaScript, HTML/CSS, Docker, GitHub), **Technologies** (React, Next.js, TypeScript, Tailwind, Node.js, Express, REST/GraphQL, Docker, GitHub Actions, Google Cloud, Gemini AI, UX), **Soft Skills** (Leadership, Project Management, Coordination, Communication, Creativity), and **Personal Strengths** (Resilience, Self-Directed Learning, Curiosity, Discipline, Teamwork). Click any category card for the full breakdown + tool list.",
  },
  {
    q: "What programming languages do you use?",
    keywords: ["programming languages", "languages do you use", "python", "javascript"],
    a: "Main languages: Python, JavaScript, HTML, CSS. Plus Docker (containers), Git/GitHub for workflow. Highlighted in the About → Languages category; click the card to see the full tool strip.",
  },
  {
    q: "What technologies / tech stack do you use?",
    keywords: ["tech stack", "technologies", "framework", "what do you build with"],
    a: "Core stack: React 19, Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, @react-spring, GSAP, Lenis, Node.js, Express, Google Gemini AI. Infrastructure via Vercel Analytics, FontAwesome, next/font (Poppins & Jost). The About → Technologies card surfaces this with a staggered reveal.",
  },
  {
    q: "What tools do you use?",
    keywords: ["tools", "vs code", "vercel", "postman", "google cloud"],
    a: "VS Code, Vercel (hosting + analytics), Postman (API work), Google Cloud, and GitHub Actions (CI). Surfaces inside the About skill cards under 'Infrastructure & Tools'.",
  },
  {
    q: "Tell me about your experience",
    keywords: ["experience", "work experience", "internship", "leadership experience"],
    a: "Highlights on the About → Experience timeline (7 entries, chronological, with expandable DrawSVG line): national hackathon team lead (2nd place), Andiamo exchange (Italy), Amour t'es là? theater coordinator (120 students), IEEE WIE SESAME (EduTounes idea born), Inter-Class Short-Film Director, Mental Calculation qualifiers (highest cert), National League Basketball (since 2023). Click 'View More Experience' to expand the full line.",
  },
  {
    q: "Tell me about EduTounes",
    keywords: ["edutounes", "edu tounes"],
    a: "EduTounes is Taim's open-source, local-first AI study app — turn any PDF, video, or audio into notes, flashcards, quizzes, and a study chat. Runs fully local via Ollama (~2GB model, no cloud) or with your own OpenAI/Anthropic keys. Built with React 19, Vite, Tailwind v4, Electron, KaTeX and FSRS spaced repetition. Born from his own learning difficulties, won 2nd at AI SHIFT 2025.",
  },
  {
    q: "How did you overcome learning difficulties?",
    keywords: ["learning difficult", "learning disorder", "overcome", "struggle"],
    a: "Diagnosed young with learning disorders, Taim doubled his effort, joined a mental-calculation club (top cert), discovered self-directed study via the web, learned to code from YouTube, and built compensatory methods around discipline, basketball, and systemization — ultimately ranking #1. The About → Education and Complete Story pages tell this in full.",
  },
  {
    q: "What is your basketball career?",
    keywords: ["basketball", "sport", "national league", "athlete"],
    a: "National League basketball player in Tunisia since 2023 (age 14). Previously tried tennis, dance, handball and volleyball. Basketball taught him discipline, teamwork and resilience — pillars he applies to building products.",
  },
  {
    q: "Tell me about the theatre production",
    keywords: ["theatre", "theater", "amour", "120 students", "coordinator"],
    a: "Co-coordinator (with mentor Mr. Khaled Ferjeni) of 'Amour, t'es là?' — 10 sub-teams, ~120 students, 10 simultaneous stands/plays/short films on the theme of love. See About → Experience for the card and the Andiamo exchange that culminated in a Troia (Italy) performance.",
  },
  {
    q: "What is the Andiamo project?",
    keywords: ["andiamo", "foggia", "troia", "italy exchange"],
    a: "Andiamo (Dec 2024–Apr 2025) — international exchange with the Foggia (Italy) high school, liaison work with Mr. Khaled Ferjeni, ending with a theatrical performance in Troia & Rome. On the About → Experience timeline.",
  },
  {
    q: "What is the IEEE WIE SESAME program?",
    keywords: ["ieee", "sesame", "wie"],
    a: "IEEE WIE SESAME SAG (2024) — international engineering & leadership program where the original **EduTounes** idea was born. The winning team would have received launch support.",
  },
  {
    q: "What did you study outside school?",
    keywords: [
      "coursera",
      "self-taught",
      "outside school",
      "self development",
      "what did you study",
    ],
    a: "Two Coursera courses (2nd year of high school) + self-study across scratch 2.0 → HTML/CSS/Python on YouTube → full-stack and backend via the EduTounes hackathon prize. Documented in About → Education.",
  },
  // ─── Education & achievements ──────────────────────────
  {
    q: "What are your education and achievements?",
    keywords: [
      "education and achievements",
      "achievements",
      "honors",
      "milestones",
      "medal",
      "award",
    ],
    a: "Grouped by year: 2025 — AI SHIFT 2nd place & #1 Rank; 2024 — IEEE WIE SESAME; 2023 — National Basketball; 2017 — International Astronomy top score (age 9). The About → Education & Achievements section shows them with year markers and 'Show 3 More' expansion.",
  },
  {
    q: "What is your astronomy achievement?",
    keywords: ["astronomy", "age 9", "international astronomy"],
    a: "International Astronomy Certification at age 9 — top national score (2017). Shown under Achievements (2017 group).",
  },
  {
    q: "Who is Mr. Khaled Ferjeni?",
    keywords: ["khaled ferjeni", "mentor", "teacher"],
    a: "Taim's mentor and teacher — co-led Andiamo, the 'Amour, t'es là?' coordination, and the short-film direction. The person who trusted him with directing and coordinating ~120 students.",
  },
  // ─── About page — structure ────────────────────────────
  {
    q: "What is on the About page?",
    keywords: ["what is on the about page", "about page content", "sections on about"],
    a: "Hero (full-bleed image + parallax scroll-zoom), the About bio (diagonal image stack + 'Read more' link), Skills & Strengths (four interactive category cards), Experience & Leadership (DrawSVG timeline, alternating cards, Expand button), Education & Achievements (split layout, year-grouped cards), Quote (Socrates, scrambled typewriter reveal), and the DrawSVG Signature at the bottom.",
  },
  {
    q: "What is your complete story?",
    keywords: ["complete story", "full story", "mon histoire"],
    a: "A long-form biography at **/about/complete-story** — verbatim memoir from the mental-calculation club, through the astronomy passion, the Internet discovery of Scratch 2.0, HTML/CSS/Python self-learning, IEEE/Andiamo/theatre coordination year, to the EduTounes hackathon win and national basketball. Reachable from the About page 'En savoir plus sur mon histoire' link.",
  },
  {
    q: "What is the Socrates quote?",
    keywords: ["socrates", "quote", "secret of change"],
    a: '"The secret of change is to focus all of your energy not on fighting the old, but on building the new." — Socrates. Animated on scroll with a GSAP ScrambleText reveal in the About → Quote section.',
  },
  // ─── Projects — overview ───────────────────────────────
  {
    q: "What projects have you built?",
    keywords: ["what projects", "built", "how many projects", "portfolio projects"],
    a: "7 featured projects: **EduTounes** (AI study app), **Calendar** (drag & drop, month/year views), **Expense Tracker** (Tunisian tax, i18n FR/EN, Chart.js), **ImageVault** (Unsplash masonry + infinite scroll), **Love Letter** (Cupid arc physics), **Luv Song** (WebGL heart + FFT), **Weather App** (OpenWeather + geolocation). Browse them on /projects (filterable) and the full table on /projects/archive.",
  },
  {
    q: "Which technologies appear most in your work?",
    keywords: ["which technologies appear", "most used tech", "common stack"],
    a: "JavaScript/TypeScript + React/Next.js + Tailwind + HTML5/CSS3 appear in almost every project. API-heavy ones add Unsplash, OpenWeatherMap, Google GenAI, Chart.js, Three.js/WebGL, and Lenis/GSAP for motion.",
  },
  {
    q: "What is your most complex project?",
    keywords: ["most complex", "hardest project", "proudest project"],
    a: "Most often cited: **EduTounes** — local/cloud AI orchestration, RAG-like note generation, KaTeX math, FSRS flashcards, 888 passing tests and zero TS errors. Among the smaller ones, **Luv Song** (GLSL + FFT sync + bloom) is technically the hardest.",
  },
  {
    q: "How do I filter projects?",
    keywords: ["filter projects", "category", "web development", "ai & machine learning", "other"],
    a: "On /projects, use the pill buttons above the grid: **Web Development**, **AI & Machine Learning**, **Other**. Selection is animated with GSAP Flip + ScrollTrigger batch reveals; filtered state persists without reload.",
  },
  {
    q: "What is the project archive?",
    keywords: ["archive", "view in archive"],
    a: "A sortable table at **/projects/archive** listing every project (title, category, tech tags, links) with pagination and 'View In Archive' navigation from /projects.",
  },
  {
    q: "What is the hackathon win?",
    keywords: ["hackathon win", "2nd place", "hackathon", "ai shift 2025"],
    a: "Team Lead, 2nd place at **AI SHIFT 2025** (national hackathon) with EduTounes — integrated multiple APIs via an enterprise Gemini Pro account and Google Drive RAG-like 'brain'; reused the prize to learn backend. Featured in the Experience timeline and the home proof bar.",
  },
  {
    q: "Do you work alone or in teams?",
    keywords: ["alone or team", "solo or team", "work in teams"],
    a: "Both — led a 4-person hackathon team, coordinated 120 students for theatre, liaised with 10 sub-teams. The projects are solo-built but experience entries highlight delegation, coordination and presentation.",
  },
  // ─── Per-project Q&A ──────────────────────────────────
  {
    q: "Tell me about the Calendar project",
    keywords: ["calendar project", "calendar app"],
    a: 'Calendar — vanilla-JS interactive calendar with month/year views, Drag & Drop event moves (HTML5 API), slide/fade auto-scroll to current month, badges (+N), role="grid" + full keyboard nav, and dark/light via prefers-color-scheme. See /projects/calendar.',
  },
  {
    q: "Tell me about the Expense Tracker",
    keywords: ["expense tracker", "finance app"],
    a: "Personal finance manager — dashboard, Chart.js doughnut + trend charts, Tunisian progressive IRPP/CNSS/CSS tax, budgets, recurring txns, CSV export, save/restore, fully localized FR/EN (~130 keys), real averages over 3/6/12 months. See /projects/expense-tracker.",
  },
  {
    q: "Tell me about ImageVault",
    keywords: ["imagevault", "unsplash", "infinite gallery"],
    a: "Unsplash infinite masonry gallery — keyword search + multilingual random suggestions, parallax scroll (Set + rAF), IntersectionObserver prefetch, CSS shimmer skeletons, immersive lightbox with Blob-download. Pure CSS/JS, no framework. See /projects/imagevault.",
  },
  {
    q: "Tell me about the Love Letter project",
    keywords: ["love letter", "valentine", "cupid", "pixelated love letter"],
    a: "Valentine's Day mini-game — aim and shoot Cupid's arrow (gravity arc + progressive draw strength + widening hitbox) at an envelope to reveal a pixel heart letter, confetti in 3 depth planes. Day 5 of the 7-day challenge. See /projects/love-letter.",
  },
  {
    q: "Tell me about Luv Song",
    keywords: ["luv song", "crystal heart", "music visualization", "3d heart"],
    a: "3D audio-reactive experience — crystal heart driven by real-time FFT spectrum, GLSL instanced particles + circular waves, bloom pulse, narrative camera (parallax, drag, scroll zoom). Day 7 finale of the 7-project challenge using Three.js, Web Audio API and GSAP. See /projects/luv-song.",
  },
  {
    q: "Tell me about the Weather App",
    keywords: ["weather app", "openweather", "geolocation"],
    a: "Weather app — city search + auto-geolocation, live autocomplete (250ms debounce), °C/°F toggle, day/night auto-theme, animated counters, 4 parallel API orchestrations (current + 5-day + geocoding + navigator.geolocation) with animated welcome/loading/error states. See /projects/weather-app.",
  },
  {
    q: "What is the 7-day project challenge?",
    keywords: ["7-day challenge", "7 projects", "7 days"],
    a: "A sprint where Taim shipped 7 projects in 7 days. Days 5 and 7 are showcased here — Love Letter (Cupid physics) and Luv Song (3D heart visualizer). The challenge validated his appetite for rapid learning.",
  },
  // ─── Site / navigation Q&A ─────────────────────────────
  {
    q: "How do I navigate the site?",
    keywords: ["navigate", "navigation", "go to", "where is"],
    a: "Top **Navbar** (logo, nav links, theme toggle), left-rail **Sidebar** on the home page (scroll-spy follows the home sections), **Footer** (socials + sitemap), and **Breadcrumbs/Back** buttons on About/Projects subpages.",
  },
  {
    q: "What pages does the site have?",
    keywords: ["pages", "what pages", "sitemap"],
    a: "Home (`/` — hero, about preview, projects preview, contact), **/about** (story, skills, experience, education, quote), **/about/complete-story** (full memoir), **/projects** (filterable grid), **/projects/[slug]** (per-project), **/projects/archive** (table), and the **BasketGame** easter-egg.",
  },
  {
    q: "How do I go back to the home page?",
    keywords: ["back to home", "home page", "go home"],
    a: "Click the **logo/wordmark in the Navbar** or the browser Back button. Subpages also have a circular back arrow that smoothly scrolls to the previous section.",
  },
  {
    q: "How does the theme toggle work?",
    keywords: ["theme", "dark mode", "light mode", "toggle"],
    a: "Sun/Moon toggle in the Navbar (next-themes). Choice is saved as `taim-portfolio-theme` in localStorage; a tiny inline script in <head> prevents flash-of-wrong-theme before paint.",
  },
  {
    q: "What is the BasketGame?",
    keywords: ["basket", "basketgame", "shoot your shot", "game", "easter egg"],
    a: "A hidden basketball mini-game ('Shoot Your Shot') on the home page — drag-to-shoot physics (gravity, rim/backboard collisions, swish/bank detection), keyboard+touch+mouse, difficulties and lives. Opened via its trigger on the home page.",
  },
  {
    q: "Is the site accessible?",
    keywords: ["accessible", "accessibility", "keyboard", "screen reader", "a11y"],
    a: "Yes — skip-to-content link, semantic headings, keyboard-focusable nav + cards, theme persistence, reduced-motion respect, and accessible contrast tokens. Many motion modules guard with `prefers-reduced-motion`.",
  },
  {
    q: "What tech was the site itself built with?",
    keywords: ["site built with", "what is the site built", "portfolio stack", "next.js"],
    a: "Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion + @react-spring/web + GSAP + Lenis + FontAwesome + next/font + Vercel Analytics. The chatbot is custom (floating panel + terminal chrome) backed by Gemini when a key is configured.",
  },
  {
    q: "Where can I find your GitHub?",
    keywords: ["github", "git hub", "repository", "source code"],
    a: "https://github.com/taimbaklouti — linked from the home contact section's SocialRow and the footer.",
  },
  {
    q: "Where can I find your LinkedIn?",
    keywords: ["linkedin", "linked in"],
    a: "https://www.linkedin.com/in/taimbaklouti/ — in the home contact SocialRow and the footer.",
  },
  {
    q: "What is the scroll indicator?",
    keywords: ["scroll indicator", "scroll down button"],
    a: "A subtle down-arrow button (home hero, About hero, Projects hero) that smooth-scrolls — via Lenis where present — to the next section when clicked, with a Framer Motion bob animation.",
  },
  {
    q: "How was the chat implemented?",
    keywords: ["how was the chat", "chat implementation", "how does chatbot work"],
    a: "A floating panel (z-50) with a terminal header exposing a Gemini proxy at `/api/chat` when `GEMINI_API_KEY` is set. Without a key, these offline answers render instantly — so the chat is always useful. Per-page suggestion chips and hints rotate by route.",
  },
  // ─── Extra coverage: suggestions that previously fell back to Gemini ─
  {
    q: "What challenges did you face building it?",
    keywords: ["challenges", "difficulties building", "hardest part", "what challenges"],
    a: "Each project lists its core challenge in its detail page (second paragraph): e.g. Calendar — multi-view + Drag & Drop state, Expense Tracker — i18n + 8 tax brackets + Chart.js, ImageVault — masonry + IntersectionObserver + 60 FPS parallax, Love Letter — arc physics + adaptive hitbox, Luv Song — FFT + GLSL + bloom sync, Weather — 4 parallel APIs, EduTounes — local/cloud AI orchestration + KaTeX/FSRS. When you're on a project page, ask 'What technologies does it use?' for its stack.",
  },
  {
    q: "Where can I see it live?",
    keywords: [
      "where can i see it live",
      "see it live",
      "live demo",
      "live preview",
      "preview link",
      "where is the demo",
    ],
    a: "Each project card has **Preview** and **Code** buttons where applicable. EduTounes links to its GitHub release + repo; the other 6 are portfolio demos viewable via their detail pages (`/projects/[slug]`) with thumbnails and image galleries. If a preview link is empty, the project is showcased inline.",
  },
  {
    q: "What did you learn from it?",
    keywords: ["what did you learn", "lessons learned", "takeaway", "what did you learn from it"],
    a: "Every project highlights its learnings in the third paragraph of its detail page: e.g. Calendar — Drag & Drop + accessibility (role=grid, keyboard nav), Expense Tracker — i18n architecture + Tunisian tax math, ImageVault — performance (Set + rAF, prefetch), Love Letter — physics + particles, Luv Song — GLSL + Web Audio, Weather — API orchestration + geolocation fallbacks, EduTounes — Electron/Ollama + local-first AI.",
  },
  {
    q: "Where is the source code?",
    keywords: [
      "where is the source code",
      "source code",
      "github repo",
      "where is the code",
      "view code",
    ],
    a: "EduTounes is open-source at **https://github.com/Blueturboguy07/EduTounes**. The other 6 projects are portfolio pieces showcased with detail pages and screenshots; their Code buttons appear when a repo is public. Taim's own GitHub profile is https://github.com/taimbaklouti.",
  },
  {
    q: "Which project are you most proud of?",
    keywords: ["proud of", "favorite project", "proudest", "most proud"],
    a: "Most often: **EduTounes** — the local-first AI study app that won 2nd at AI SHIFT 2025 and embodies Taim's learning-difficulty story. Among the 7-day sprint builds, **Luv Song** (GLSL heart + FFT) is the technically proudest for its shader + audio sync work.",
  },
  {
    q: "What motivated you to start EduTounes?",
    keywords: [
      "motivated edutounes",
      "why edutounes",
      "inspiration edutounes",
      "why did you build edutounes",
      "motivation edutounes",
    ],
    a: "Diagnosed with learning difficulties, Taim built his own study methods (mental calculation, self-directed web learning). EduTounes is that system generalized: turn any document/video/audio into notes, flashcards, quizzes and a chat — private, local-first, free — so other Tunisian students don't face the same barriers. The idea crystallized during IEEE WIE SESAME (2024) and was first shipped for AI SHIFT 2025.",
  },
  {
    q: "What are your plans after high school?",
    keywords: [
      "plans after high school",
      "after high school",
      "after bac",
      "after graduation",
      "university plans",
    ],
    a: "Study **Computer Science** at a US or Canadian university on a full scholarship, scale EduTounes into a widely used platform, and build a career at the intersection of AI and education.",
  },
  {
    q: "How do the skill cards work?",
    keywords: ["skill cards", "how do skill cards", "skills interaction", "skills cards work"],
    a: "On **/about → Skills & Strengths**, four category cards (Languages, Technologies, Soft Skills, Personal Strengths) are Framer Motion-animated and interactive — click a card to expand its full breakdown and tool strip with a staggered reveal. Respects `prefers-reduced-motion`.",
  },
  {
    q: "How does the experience timeline work?",
    keywords: ["experience timeline", "timeline work", "how does timeline", "timeline dot"],
    a: "On **/about → Experience & Leadership**, a vertical DrawSVG timeline (GSAP) connects alternating cards (7 entries, chronological). Initially 3 are shown; 'View More Experience' expands the rest with AnimatePresence, and the SVG line animates on scroll. Dots + cards are keyboard-focusable.",
  },
  {
    q: "Show me your AI-related projects",
    keywords: [
      "ai-related projects",
      "ai projects",
      "machine learning projects",
      "ai & machine learning",
    ],
    a: "AI-tagged: **EduTounes** (local + cloud AI, Ollama, KaTeX, FSRS). The others are Web Development (Calendar, Expense Tracker, ImageVault, Weather App) and Other/Creative (Love Letter, Luv Song). Filter by **AI & Machine Learning** on /projects, or see /projects/archive for the table with category tags.",
  },
  {
    q: "How do I use the project archive?",
    keywords: ["use the archive", "how archive", "archive work", "how do i use archive"],
    a: "Visit **/projects/archive** — a sortable table of all projects (title, category, tech tags, year, links) with pagination. From /projects, the 'View In Archive' button jumps there. Useful for quickly scanning stacks and categories.",
  },
  {
    q: "How does the contact form work?",
    keywords: ["contact form work", "how contact form", "send message form", "contact form"],
    a: "At the bottom of the **home page** (Contact section) — fields for name, email, message with the red focus-glow animation, submitted via Formspree. Socials (GitHub / LinkedIn / Instagram) sit alongside in the SocialRow. The Navbar Contact CTA scrolls you there via Lenis.",
  },
  {
    q: "What is in the home hero?",
    keywords: ["home hero", "what is in the hero", "hero section", "avatar orbit"],
    a: "The home hero has: a proof bar (animated counters: #1 Rank, 15.14/20, 2nd Place), Taim's bio with an orbiting avatar (OrbitRings + QuarterCircle accent), CTA pills that smooth-scroll to the About preview, and a scroll indicator that Lenis-scrolls to the next section.",
  },
];

/**
 * Find the best offline answer for `query`, or null.
 * Pass { slug } when on a project detail page for project-aware answers.
 */
export function findOfflineAnswer(query, opts) {
  if (!query || typeof query !== "string") return null;
  const raw = query.toLowerCase().trim().replace(/\s+/g, " ");
  if (!raw) return null;
  const q = raw;

  const slug = typeof opts === "string" ? opts : opts?.slug;
  const project = getProjectBySlug(slug);

  // ─── Project-aware instant answers (when viewing /projects/[slug]) ──
  if (project) {
    // "Tell me about this project" → full project pitch
    if (
      q === "tell me about this project" ||
      q === "tell me about this project?" ||
      (q.includes("this project") &&
        (q.includes("tell me") || q.includes("about") || q.length < 40))
    ) {
      return {
        q: `Tell me about the ${project.title} project`,
        a: `${project.title} — ${project.desc[0]} ${project.desc[1]} See /projects/${project.slug} for screenshots and details. Tech: ${project.tech.join(", ")}.`,
        keywords: [],
      };
    }
    // "What technologies does it use?" → project tech stack
    if (
      (q.includes("technolog") || q.includes("tech stack") || q.includes("built with")) &&
      (q.includes("it use") ||
        q.includes("this project") ||
        q.includes("does it") ||
        q === "what technologies does it use?" ||
        q === "what technologies does it use")
    ) {
      return {
        q: `What technologies does ${project.title} use?`,
        a: `${project.title} is built with: **${project.tech.join(" · ")}**. ${project.desc[2].slice(0, 220)}… See /projects/${project.slug}.`,
        keywords: [],
      };
    }
    // "Where can I see it live?" → preview / code
    if (
      q.includes("see it live") ||
      q.includes("live demo") ||
      q.includes("live preview") ||
      q.includes("preview link") ||
      (q.includes("where can i see") && q.includes("live"))
    ) {
      const preview = project.preview
        ? `Preview: ${project.preview}`
        : "Preview is showcased on its detail page with screenshots.";
      const code = project.code ? ` Code: ${project.code}` : "";
      return {
        q: `Where can I see ${project.title} live?`,
        a: `${project.title} — ${preview}.${code} Open /projects/${project.slug} for its gallery and links.`,
        keywords: [],
      };
    }
    // "What challenges did you face building it?" → project challenge (desc[1])
    if (
      q.includes("challenge") &&
      (q.includes("building") || q.includes("face") || q.includes("hardest"))
    ) {
      return {
        q: `What challenges did you face building ${project.title}?`,
        a: `${project.title}: ${project.desc[1]}`,
        keywords: [],
      };
    }
    // "What did you learn from it?" → project learnings (desc[2])
    if (
      q.includes("what did you learn") ||
      (q.includes("learn") && (q.includes("from it") || q.includes("building it")))
    ) {
      return {
        q: `What did you learn from ${project.title}?`,
        a: `${project.title}: ${project.desc[2]}`,
        keywords: [],
      };
    }
    // "Where is the source code?" for this project
    if (q.includes("source code") || q.includes("where is the code") || q.includes("github repo")) {
      if (project.code) {
        return {
          q: `Where is the source code for ${project.title}?`,
          a: `${project.title} source: ${project.code}`,
          keywords: [],
        };
      }
    }
  }

  // Exact canonical match wins first (e.g. chip clicks)
  const exact = FAQ.find((entry) => entry.q.toLowerCase() === q);
  if (exact) return exact;

  let best = null;
  let bestScore = 0;
  for (const entry of FAQ) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.split(" ").length; // weight by words
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  const minScore = q.length < 15 ? 2 : 1;
  return bestScore >= minScore ? best : null;
}

/**
 * For detail pages: append a context snippet for the current project slug
 */
export function projectContextSnippet(slug) {
  try {
    return `User is viewing project slug: "${slug}". Answer in context of that project if relevant.`;
  } catch {
    return "";
  }
}
