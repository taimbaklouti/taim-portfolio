// lib/chatbotFaq.js
// Offline FAQ knowledge base — instant answers when /api/chat isn't needed.
// Each entry: { q, a } where q is the canonical question, a is the answer.
// Matching is normalized + includes-based; covers every page/section of the site.

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
    keywords: ["where do you study", "school", "lycee", "education", "baccalaureate"],
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
    keywords: ["coursera", "self-taught", "outside school", "self development"],
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
];

/**
 * Find the best offline answer for `query`, or null.
 * Matching: normalize to lowercase, check if every keyword word
 * hits or at least two multi-word keyword groups hit — simple
 * but effective without a vectors library.
 */
export function findOfflineAnswer(query) {
  if (!query || typeof query !== "string") return null;
  const q = query.toLowerCase().trim().replace(/\s+/g, " ");
  if (!q) return null;

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
    // Boost if any keyword is a near-exact substring of the query
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  // Require at least 1 word hit; with 2+ for short queries to avoid false positives
  const minScore = q.length < 15 ? 2 : 1;
  return bestScore >= minScore ? best : null;
}

/**
 * For detail pages: append a context snippet for the current project slug
 * (fed from data.json / params). The chatbot can prepend it server-side if needed.
 */
export function projectContextSnippet(slug) {
  try {
    // Cheap: slug itself is enough for the Gemini prompt if provided
    return `User is viewing project slug: "${slug}". Answer in context of that project if relevant.`;
  } catch {
    return "";
  }
}
