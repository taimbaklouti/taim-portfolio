# 03-motion — Système Motion & Scroll (Lenis)

> **Pour l'IA :** ce dossier contient le code de smooth scroll **prêt à copier tel quel** dans n'importe quel projet web. Ne réécris pas cette logique — copie, importe, point d'interrogation.

## Rôle de ce dossier

Fournir la couche **scroll + motion de base** : initialisation Lenis, CSS global anti-conflit, verrouillage de scroll pour les modales, et la doc complète pour aller plus loin (MCP Motion.dev, GSAP, etc.).

## Contenu

| Élément | Type | Rôle |
|---|---|---|
| `lenis.js` | Code | Instance Lenis (`autoRaf`, easing custom) + `scrollTo()` + `blockScroll()` / `unblockScroll()` / `withScrollLock()` |
| `global.css` | Code | CSS global indispensable : `overflow:hidden` sur html/body, `overscroll-behavior:none`, zones `.scroll-native`, scrollbar fine |
| `motion-library/` | Docs | 7 sous-dossiers documentés : lenis-core, smooth-scroll, scroll-lock, css-global, motion-mcp, mcp-config — **ce que fait / ne fait pas** chaque pièce |
| `motion-dev-mcp/` | Serveur MCP | Motion.dev MCP **installé** : cloné, `npm run build` fait, base docs initialisée (`docs/motion-docs.db`, 26 pages React/JS/Vue). Configuré dans `.mcp.json` (chemin absolu vers `dist/index.js`). |
| `docs/LENIS_MOTION_MCP_GUIDE.md` | Doc | Guide pas-à-pas complet : install Lenis, serveur MCP motion-dev-mcp, config `.mcp.json`, exemples de prompts |

## Installation dans un projet (3 étapes)

```bash
npm install lenis
```

1. **Copie** `lenis.js` → `src/lenis.js` dans le projet cible.
2. **Copie** `global.css` → `src/styles/global.css` (ou importe-le depuis ton entry CSS).
3. **Importe une seule fois** au démarrage de l'app :

```js
import './styles/global.css'
import { lenis } from './lenis'
```

### Verrouiller le scroll (modales, menus)

```js
import { blockScroll, unblockScroll } from './lenis'

// à l'ouverture
blockScroll()
// à la fermeture
unblockScroll()
```

### Zones à scroll natif (dropdowns, panneaux internes)

Ajoute la classe `scroll-native` — déjà gérée par `global.css`.

## Pièges connus (déjà gérés ici, ne pas casser)

- `overflow: hidden` sur `html, body` → sinon scroll natif et Lenis se battent.
- `lenis.destroy()` au cleanup si intégration React (voir `motion-library/lenis-core/`).
- Ne jamais animer `scroll` CSS en parallèle de Lenis (`scroll-behavior: auto` forcé).

## Aller plus loin

- **Détail de chaque pièce** → `motion-library/README.md` (tableau responsabilité / non-responsabilité).
- **Brancher le MCP Motion.dev** → **déjà fait** : serveur installé dans `motion-dev-mcp/` et déclaré dans `.mcp.json` (redémarrer le client IA pour charger les outils : `search_motion_docs`, `get_component_api`, `generate_motion_component`, `validate_motion_syntax`…). Pour maintenance : `npm run rebuild` / `npm run stats` dans `motion-dev-mcp/`, et `motion-library/mcp-config/`.
- **Animées au scroll** → combiner avec `../01-skills/gsap/gsap-scrolltrigger/`.

---

Voir aussi : [`../README.md`](../README.md) (carte du kit).
