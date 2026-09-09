# motion-library

Bibliothèque locale de référence pour **Lenis** (smooth scroll) et **Motion.dev MCP** (documentation animation / génération de composants).

Ce dossier existe pour qu'une IA (Claude, Cursor, VS Code, etc.) comprenne **ce que fait chaque élément, quand l'utiliser, et comment les combiner**, sans deviner ni confondre les responsabilités.

---

## Pourquoi cette bibliothèque existe

Quand une IA génère du code de scroll ou d'animation, elle confond souvent :

- le smooth scroll (Lenis) et les animations visuelles (Framer Motion, GSAP, Anime.js)
- le CSS global de Lenis et le CSS des composants
- le blocking de scroll (modales) et l'animation du scroll
- la config MCP (outil IA) et le code frontend

Cette bibliothèque sépare ces responsabilités en **éléments indépendants**, chacun avec son propre README.

---

## Architecture

```
motion-library/
├── README.md                  # ce fichier — index et règles
├── lenis-core/               # README — initialisation Lenis, RAF, destroy
├── smooth-scroll/            # README — scrollTo, progress, événements, ancres
├── scroll-lock/              # README — block/unblock, modales, nested scroll
├── css-global/               # README — CSS indispensable, overflow, overscroll
├── motion-mcp/               # README — motion-dev-mcp, doc animation, exemples prompts
└── mcp-config/               # README — .mcp.json, commande node vs npx, env vars
```

---

## Index des éléments

| Élément | Fichier README | Ce qu'il fait | Ce qu'il NE fait PAS |
|---|---|---|---|
| **Lenis Core** | `lenis-core/README.md` | Instancier Lenis, RAF, destroy, options principales | Animer des éléments, gérer des modales |
| **Smooth Scroll** | `smooth-scroll/README.md` | scrollTo, progress, velocity, événements `scroll` / `virtual-scroll`, ancres | Bloquer le scroll, styler le DOM |
| **Scroll Lock** | `scroll-lock/README.md` | Bloquer/débloquer le scroll (modales, menus) | Animer, gérer le smooth himself |
| **CSS Global** | `css-global/README.md` | Rules `overflow`, `overscroll`, scrollbar, conflits navigateur | Styles des composants, thème |
| **Motion MCP** | `motion-mcp/README.md` | Ce que fait le serveur MCP motion-dev-mcp, exemples de prompts | Connexion réseau, auth, installation locale |
| **MCP Config** | `mcp-config/README.md` | Structure `.mcp.json`, commande vs args, env, chemins absolus | Code frontend, scroll, animation |

---

## Règles pour que l'IA ne soit pas confuse

### 1. Un élément = une responsabilité
Chaque README ne parle que de son élément. Si un sujet touche deux éléments, les deux README le mentionnent en section "Voir aussi".

### 2. Séparation claire : scroll vs animation
- **Lenis** = smooth scroll, cadencement du défilement, position dans la page.
- **Motion (Framer Motion, GSAP, Anime.js, motion-dev-mcp)** = animation d'éléments (scale, opacity, translate, hover, entrée au scroll).
- On peut les combiner, mais ce sont deux couches différentes.

### 3. Séparation claire : scroll lock vs smooth scroll
- **Scroll Lock** = empêcher le scroll (modales). C'est une couche de contrôle au-dessus de Lenis.
- **Smooth Scroll** = rendre le scroll fluide. Lenis le fait.

### 4. CSS global vs CSS composant
- Le CSS de `css-global/` doit être chargé une fois, au niveau de la page.
- Il ne doit pas être dupliqué dans des composants.

### 5. MCP != code frontend
- La config MCP (`mcp-config/`) concerne l'outil IA.
- Elle ne change pas le comportement du site pour un visiteur lambda.

---

## Comment utiliser cette bibliothèque avec une IA

### Pour générer du code
Lis d'abord le README de l'élément concerné, puis demande :
```
En te basant sur motion-library/lenis-core/README.md, génère...
```

### Pour debuguer
Si le smooth scroll ne marche pas, vérifier dans cet ordre :
1. `css-global/README.md` → `overflow: hidden` présent ?
2. `lenis-core/README.md` → `autoRaf: true` ou boucle RAF manuelle ?
3. `scroll-lock/README.md` → le scroll est-il bloqué par une modale ?

### Pour combiner Lenis + animation
Lis `smooth-scroll/README.md` pour récupérer `progress` ou `scroll`, puis utilise l'animation de ton choix (Framer Motion, GSAP ScrollTrigger, Anime.js). Voir aussi `motion-mcp/README.md` pour des exemples via l'IA.

---

## Installation réelle (projet)

Lenis est déjà installé dans ce projet (voir `package.json` à la racine). Les commands :

```bash
npm install lenis
```

Le serveur MCP motion-dev-mcp est documenté dans `motion-mcp/README.md` et configuré via `.mcp.json` (voir `mcp-config/README.md`).

---

## Liens externes

- Lenis : https://github.com/darkroomengineering/lenis
- Lenis docs : https://lenis.darkroom.engineering/
- motion-dev-mcp : https://github.com/Abhishekrajpurohit/motion-dev-mcp
