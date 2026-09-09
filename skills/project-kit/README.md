# 📦 PROJECT-KIT — Librairie complète pour l'IA

> **Règle n°1 pour l'IA (Buffy ou autre) :** quand une demande touche à l'UI, au style, aux animations, au scroll ou au copy d'un site — **lis ce README, puis les README des dossiers concernés, AVANT d'écrire du code.** Ne devine jamais : indexe-toi ici.

Ce dossier est une **librairie auto-suffisante** : skills, styles de marque, système motion/scroll, sites d'exemple et documentation. Il est conçu pour qu'une IA puisse **one-shot** un site complet ou **améliorer** un site existant sans se perdre, en lisant les bons README dans le bon ordre.

---

## 🗺️ Carte du kit

```
project-kit/
├── README.md                 ← CE FICHIER — point d'entrée obligatoire
│
├── 01-skills/                ← COMPÉTENCES de l'IA (comment elle doit travailler)
│   ├── animejs/              Anime.js v4 — animations JS, timeline, SVG, scroll
│   ├── gsap/                 GSAP complet — core, timeline, ScrollTrigger, React…
│   ├── 21st/                 21st.dev — générer / installer / auditer de l'UI
│   ├── copywriting/          Copy orienté conversion (CTA, structure de page)
│   ├── design-critique/      Cadre structuré pour critiquer un design
│   ├── unslop/               Retire les tournures "AI-slop" de l'écriture
│   └── mcp-skills/           Copies plattes des 3 skills (compat MCP)
│
├── 02-style-references/      ← IDENTITÉS VISUELLES (le style à imiter)
│   ├── mintlify/             Fiche complète + tokens.json + theme css (référence de format)
│   └── [17+ fiches .md]      Apple, Wise, Ditto, Slush, Steep, Superr…
│
├── 03-motion/                ← SYSTÈME MOTION & SCROLL (code prêt à l'emploi)
│   ├── lenis.js              Init Lenis + blockScroll/unblockScroll
│   ├── global.css            CSS global indispensable au smooth scroll
│   ├── docs/                 Guide complet Lenis + Motion.dev MCP
│   ├── motion-library/       7 sous-dossiers documentés (lenis-core, scroll-lock…)
│   └── motion-dev-mcp/       Serveur MCP Motion.dev — cloné, buildé, DB docs initialisée (configuré dans .mcp.json)
│
├── 04-examples/              ← SITES D'EXEMPLE (référence concrète)
│   ├── example site web/     8 marques complètes (md + tokens + css)
│   └── example-site-web/     Exemple Phantom minimal (tokens.json + theme.css)
│
├── 05-docs/                  ← DOCUMENTATION & instructions
│   ├── instruction for Freebuff.txt   Prompt d'origine (mission Lenis + MCP)
│   └── README-previous.md    Ancien README racine (historique)
│
├── ai-state/                 ← MÉMOIRE DES CHOIX DE L'IA (persistent entre sessions)
│   └── SELECTIONS.md         Registre : quelle fiche de style / skills / MCP utilisés par projet
│
└── _archive/                 ← SOURCES ORIGINALES (lecture seule)
    ├── INDEX.md              Mapping complet source ↔ version organisée
    ├── 21st.dev/             Source des skills 21st
    ├── animejs-skills-main/  Source du skill animejs
    ├── gsap/                 Source des skills GSAP
    ├── liquid-glass-js-main/ Lib liquid glass (code de démo)
    ├── react-three-fiber-master/  Docs/source R3F (pour le 3D web)
    ├── shadergradient-main/  Source ShaderGradient (gradients animés 3D)
    └── npm-tooling/          package.json, lock, node_modules (lenis)
```

---

## 🧭 Comment l'IA doit naviguer (ordre de lecture)

| Si la demande concerne… | Lis d'abord | Ensuite |
|---|---|---|
| Créer / one-shoter un site | `02-style-references/README.md` | `01-skills/` (GSAP/copy) + `03-motion/README.md` |
| Améliorer un site existant | `02-style-references/` (fiche de la marque) | `01-skills/design-critique/` |
| Animations / scroll | `03-motion/README.md` | `01-skills/gsap/` ou `01-skills/animejs/` |
| Copy / textes marketing | `01-skills/copywriting/` | `01-skills/unslop/` |
| Générer des composants UI | `01-skills/21st/` | `02-style-references/` (tokens de la marque) |
| Config MCP / Motion.dev | `03-motion/motion-dev-mcp/` (installé) | `03-motion/motion-library/mcp-config/` + `.mcp.json` |
| Comprendre une source originale | `_archive/` (voir `INDEX.md` / `index.json`) | — (ne jamais modifier _archive) |

---

## 🚀 Workflow A — ONE-SHOT un nouveau site

> Objectif : produire un site complet, stylé et animé en une seule passe, sans itération.

0. **Mémoire** → Lis `ai-state/SELECTIONS.md`. Une entrée existe déjà pour ce projet ? Réutilise ses choix et saute à l'étape correspondante. Sinon, continue et **écris l'entrée à la fin de cette étape 0**.
1. **Style** → Ouvre `02-style-references/` et choisis UNE fiche de marque (ex: `slush.md`, `wise.md`). Elle contient tokens, typo, composants, do's/don'ts. *Si l'utilisateur a décrit un style précis, prends la fiche la plus proche.*
2. **Tokens** → Copie le bloc `:root` / `@theme` de la fiche (ou prends `02-style-references/examples/` comme squelette) dans le CSS global du nouveau projet.
3. **Motion** → Copie `03-motion/lenis.js` + `03-motion/global.css` dans le projet, importe-les une fois au démarrage. Lis `03-motion/motion-library/` pour les détails (scroll-lock modales, ancres, etc.).
4. **Animations** → Applique les skills `01-skills/gsap/` (scroll-trigger, timeline) ou `01-skills/animejs/` selon le besoin. Respecte la section "Animation Philosophy" de la fiche de marque.
5. **Copy** → Rédige les textes avec `01-skills/copywriting/` (CTA, structure) et nettoie avec `01-skills/unslop/`.
6. **Qualité** → Vérifie le résultat contre les "Do's and Don'ts" de la fiche de marque + `01-skills/design-critique/`.

**Règle d'or :** une seule identité visuelle par site. Ne mélange jamais deux fiches de style.

---

## 🔧 Workflow B — AMÉLIORER un site existant

> Objectif : retoucher/étendre un projet qui tourne déjà, sans casser son identité.

0. **Mémoire** → Lis `ai-state/SELECTIONS.md`. Une entrée existe pour ce projet ? Réutilise ses choix (surtout la fiche de style — ne jamais en changer sans décision explicite). Sinon, continue et écris l'entrée.
1. **Identifier le style** → Si le projet a déjà une fiche dans `02-style-references/`, c'est LA référence. Sinon, extrais ses tokens (couleurs, typo, radius) et note-les en tête de réflexion.
2. **Diagnostiquer** → Utilise `01-skills/design-critique/` pour structurer la critique (ce qui marche / ce qui casse).
3. **Étendre sans trahir** → Tout nouveau composant doit réutiliser les tokens existants. Les fiches de marque contiennent une section "Components" qui montre comment les éléments existants sont construits — imite-les.
4. **Motion additive** → Ajoute du mouvement seulement si la fiche de marque le permet (section "Animation Philosophy" — ex: Slush = quasi statique, marquee only).
5. **Copy** → Pour les nouveaux textes : `01-skills/copywriting/`, et respecte le ton de la marque si la fiche en définit un.

**Règle d'or :** ne réinvente pas le style — continue-le. Si la fiche n'existe pas, extrais les tokens AVANT d'ajouter quoi que ce soit.

---

## 🤖 Si tu es une IA (checklist avant de coder)

- [ ] **ÉTAPE 0 — j'ai lu `ai-state/SELECTIONS.md`** : si une entrée existe pour ce projet, je RÉUTILISE ses choix (style, skills, MCP) sans re-décider ; sinon je noterai mes choix dedans AVANT de coder.
- [ ] J'ai lu ce README.
- [ ] J'ai identifié le workflow : one-shot (A) ou amélioration (B).
- [ ] J'ai lu le README du/des dossiers concernés (01→05).
- [ ] Style : j'ai UNE fiche de marque et je respecte ses do's/don'ts.
- [ ] Motion : je réutilise `03-motion/lenis.js` / `global.css` tel quel, je n'improvise pas.
- [ ] `_archive/` = lecture seule (sources originales, ne pas modifier ni supprimer).

---

## ⚠️ Deux choses à savoir

1. **`.mcp.json`** reste à la racine du workspace (à côté de `project-kit/`). C'est le config des serveurs MCP : `watermelon` (npx) et `motion-dev-mcp` (serveur local **déjà installé** dans `03-motion/motion-dev-mcp/` — build + DB faits, chemin absolu). Détails : `03-motion/motion-library/mcp-config/README.md`.
2. **`_archive/`** contient les sources d'origine des skills/libs. Elles ne sont pas nécessaires au quotidien — tout l'utile est déjà copié dans `01-skills/` et `03-motion/`. À consulter seulement pour vérifier une source ou récupérer du code de démo (liquid-glass, shadergradient, R3F).

---

Dernière mise à jour : Septembre 2026
