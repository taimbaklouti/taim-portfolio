# Guide complet — Lenis + Motion.dev MCP

---

## Environnement identifié

| Élément | Valeur détectée dans le projet |
|---|---|
| Framework | Projet web (structure vanilla / React possible selon usage) |
| Langage | JavaScript (Node.js présent, yarn/npm disponibles) |
| Animation liée | Lenis déjà en dépendance (`^1.3.26`), GSAP présente en archive, Anime.js disponible via skill |
| Client IA | MCP configuré via `.mcp.json` à la racine — compatible Claude Code, Cursor, VS Code, n'importe quel client lisant ce fichier |

> Les commandes ci-dessous sont copier-coller. Adapte les chemins si ton projet n'est pas là où est généré ce fichier.

---

# PARTIE 1 — Smooth scroll avec Lenis

## 1.1 Installation

Lenis est déjà listé dans `package.json`, mais si tu récupères le projet ou si tu veux garantir la version :

```bash
npm install lenis
```

ou, si le projet utilise yarn :

```bash
yarn add lenis
```

## 1.2 Initialisation propre

Fichier recommandé : `src/lenis.js` (ou `lib/lenis.js`, ajuste le chemin).

```js
// src/lenis.js
import Lenis from 'lenis'

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.0 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  autoRaf: true,        // ← utilise requestAnimationFrame automatiquement
  normalizeWheel: false,
})

// Boucle RAF manuelle si autoRaf: false (exemple complet pour référence)
// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }
// requestAnimationFrame(raf)

export function smoothScrollTo(targetY, duration = 1.2) {
  lenis.scrollTo(targetY, { duration })
}

export function handleLenis Razor(motionValue) {
  // Si tu utilises React Three Fiber, gsap, etc., tu peux récupérer la position
  // directement depuis lenis.scrollProgress ou lenis.progress
}
```

Si tu utilises React, exemple d'intégration dans un composant :

```jsx
// src/components/ScrollProvider.jsx
import { useEffect } from 'react'
import { lenis } from '../lenis'

export function ScrollProvider({ children }) {
  useEffect(() => {
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

## 1.3 CSS global indispensable

Piège classique : le scroll natif du navigateur doit être coupé pour laisser Lenis prendre le contrôle sans conflit. Ajoute ça dans ton CSS global (`src/styles/global.css`, `index.css`, ou équivalent) :

```css
/* === Lenis smooth scroll — CSS global === */

html,
body {
  /* Coupe le scroll natif au profit de Lenis */
  overflow: hidden;
  /* Évite les pinch-zoom parasites sur mobile si tu ne les gères pas */
  overscroll-behavior: none;
  /* Permet le scroll horizontal si ton layout en a besoin */
  scroll-behavior: auto;
}

/* Si tu as des zones ponctuelles qui doivent scroller nativement
   (ex: dropdowns, modals internes), réactive localement : */
.scroll-native {
  overflow: auto;
  overscroll-behavior: contain;
}

/* Optionnel : style de la barre de défilement si tu veux la garder */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
```

> Important : `overflow: hidden` sur `html,body` doit être présent. Sans lui, tu vois courir le scroll natif en même temps que Lenis sur certains navigateurs.

## 1.4 Bloquer / débloquer le scroll (pour modales, menus, etc.)

Fonction utilitaire à ajouter dans `src/lenis.js` ou dans un fichier dédié :

```js
// src/lenis.js (complément)

let scrollBlocked = false
const originalOverflow = ''

export function blockScroll() {
  if (scrollBlocked) return
  scrollBlocked = true

  // Mémorise l'état précédent si tu veux le restaurer proprement
  const body = document.body
  const html = document.documentElement

  originalOverflow = body.style.overflow
  body.style.overflow = 'hidden'
  html.style.overflow = 'hidden'

  // Astuce : compensation du décalage de scrollbar si le layout bouge
  // Quand scroll est bloqué, la scrollbar disparaît et le layout peut shifter.
  // Solution légère : forcer une barre transparente via CSS plutôt que du JS.
}

export function unblockScroll() {
  if (!scrollBlocked) return
  scrollBlocked = false

  const body = document.body
  const html = document.documentElement

  body.style.overflow = originalOverflow || ''
  html.style.overflow = originalOverflow || ''
}

export function withScrollLock(fn) {
  blockScroll()
  try {
    return fn()
  } finally {
    unblockScroll()
  }
}
```

Exemple d'usage avec une modale React :

```jsx
import { useEffect, useState } from 'react'
import { blockScroll, unblockScroll } from '../lenis'

export function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) blockScroll()
    return () => unblockScroll()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div style={{ margin: '2rem auto', maxWidth: 520, background: '#fff', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}
```

---

# PARTIE 2 — Serveur MCP Motion.dev (motion-dev-mcp)

## 2.1 Cloner, installer, build en local

Prérequis : Node.js 18+ (vérifie avec `node -v`).

```bash
# 1. Cloner le dépôt
git clone https://github.com/Abhishekrajpurohit/motion-dev-mcp.git
cd motion-dev-mcp

# 2. Installer les dépendances
npm install

# 3. Build du projet (si le package.json expose un script "build")
npm run build
```

Si le dépôt n'a pas de script `build`, les commandes typiques à essayer en fallback :

```bash
npm run compile
# ou
npx tsc --build
```

Après build, le serveur MCP est prêt à être appelé via Node.js. Garde en tête le chemin absolu vers le script de serveur, par exemple :

```
/path/to/motion-dev-mcp/build/index.js
# ou
/path/to/motion-dev-mcp/src/index.js
# (selon la structure réelle du dépôt)
```

> Note : la commande exacte à mettre dans `.mcp.json` dépend de l'entrée principale exportée par le dépôt. Vérifie `package.json` du dépôt (champ `main` ou scripts `start`) pour pointer sur le bon fichier.

## 2.2 Configuration JSON à ajouter dans le client IA

Ton projet utilise déjà `.mcp.json` à la racine pour configurer les serveurs MCP. Pour ajouter Motion.dev MCP, édite `.mcp.json` :

### Option A — Lancement via npx (le plus simple, sans build local)

```json
{
  "mcpServers": {
    "watermelon": {
      "command": "npx",
      "args": ["-y", "@watermelon-ui/mcp-server"]
    },
    "motion-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@motion-dev/mcp-server"]
    }
  }
}
```

> Remplace `@motion-dev/mcp-server` par le nom exact du package MCP si celui-ci est publié sous un autre nom. C'est à vérifier sur le dépôt cloné.

### Option B — Exécution du fichier build local (si tu veux l'héberger toi-même)

```json
{
  "mcpServers": {
    "watermelon": {
      "command": "npx",
      "args": ["-y", "@watermelon-ui/mcp-server"]
    },
    "motion-dev-mcp": {
      "command": "node",
      "args": ["/chemin/absolu/vers/motion-dev-mcp/build/index.js"]
    }
  }
}
```

Remarques :
- Les chemins absolus sont plus fiables dans `.mcp.json` quand le MCP est lancé depuis un éditeur qui ne part pas du même cwd.
- Si le serveur MCP attend des variables d'environnement (clé API, etc.), ajoute un champ `env` dans le bloc, par exemple :

```json
{
  "command": "node",
  "args": ["/chemin/absolu/vers/motion-dev-mcp/build/index.js"],
  "env": {
    "MOTION_API_KEY": "ton_cle_ici"
  }
}
```

Après modification de `.mcp.json`, redémarre ton éditeur / ton client IA pour que le serveur MCP soit chargé.

## 2.3 Exemples d'utilisation du MCP

Une fois le serveur MCP connecté à ton client IA, tu peux lui demander directement dans la conversation :

### Exemple 1 — Récupérer la documentation d'une animation

```
Avec le serveur motion-dev-mcp, donne-moi la doc de l'api useAnimation pour un composant React, avec les params principaux et un exemple rapide.
```

### Exemple 2 — Générer un composant animé

```
Via motion-dev-mcp, génère un composant React animé : une carte qui entre en slide-up + fade-in au scroll, avec uneнимация hover scale douce, en utilisant Framer Motion.
```

### Exemple 3 — Obtenir un snippet pour Lenis + Motion

```
Montre-moi comment combiner Lenis (smooth scroll) et Motion pour animer des sections au fur et à mesure du scroll, avec un exemple concret en React.
```

> Si le MCP répond en anglais ou en suivant la syntaxe du dépôt, adapte tes prompts en anglais si nécessaire. Le contenu de la doc est le même.

---

# Récap rapide — commandes à copier

```bash
# Partie 1 — Lenis
npm install lenis

# Partie 2 — Motion.dev MCP
git clone https://github.com/Abhishekrajpurohit/motion-dev-mcp.git
cd motion-dev-mcp
npm install
npm run build

# Vérifications
node -v          # doit être >= 18
cat package.json # dans motion-dev-mcp pour identifier le point d'entrée MCP
```

```json
// .mcp.json mis à jour (exemple)
{
  "mcpServers": {
    "watermelon": {
      "command": "npx",
      "args": ["-y", "@watermelon-ui/mcp-server"]
    },
    "motion-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@motion-dev/mcp-server"]
    }
  }
}
```

---

# Points de vigilance

- Lenis : n'oublie pas `overflow: hidden` sur `html,body` dans le CSS global, sinon le scroll natif et Lenis entrent en conflit.
- Lenis : si tu utilises React, pense à appeler `lenis.destroy()` au cleanup du provider.
- MCP : après chaque modification de `.mcp.json`, redémarre le client IA.
- MCP local : adapte le chemin dans `args` selon la structure réelle du dépôt `motion-dev-mcp` (fichier `index.js` ou `build/index.js` à identifier via `package.json` du dépôt).
- Dépôt MCP : si la commande `npm run build` n'existe pas, regarde les scripts disponibles dans `package.json` du dépôt et utilise le bon (`compile`, `tsc`, etc.).
