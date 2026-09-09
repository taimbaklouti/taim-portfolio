# Lenis Core

Couche **initialisation et cycle de vie** de Lenis. Elle ne s'occupe pas des animations visuelles, ni du blocage du scroll, ni du CSS.

## Ce que cet élément fait

- Instancier Lenis avec les bonnes options.
- Lancer la boucle RAF (autoRaf ou manuelle).
- Fournir une fonction utilitaire de scroll programmatique (optionnel).
- Offrir un point de nettoyage (`destroy`) pour React / Vue / démontage.

## Ce que cet élément NE fait PAS

- Animer des éléments dans la page (Framer Motion, GSAP, Anime.js).
- Bloquer le scroll (voir `scroll-lock/`).
- Gérer le CSS global (voir `css-global/`).

## Installation

```bash
npm install lenis
```

Déjà présent dans ce projet (`package.json` à la racine, version `^1.3.26`).

Import :

```js
import Lenis from 'lenis'
```

## Initialisation recommandée

Fichier : `src/lenis.js` (ou `lib/lenis.js`).

```js
import Lenis from 'lenis'

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.0 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  autoRaf: true,
  respectReducedMotion: true,
})
```

### Pourquoi ces options

| Option | Valeur | Raison |
|---|---|---|
| `duration` | `1.2` | Durée par défaut du scroll fluide (secondes). |
| `easing` | fonction personnalisée | Raccourci pour un easing doux type "expo out". |
| `smoothWheel` | `true` | Active le lissage des événements souris. |
| `autoRaf` | `true` | Lenis lance lui-même `requestAnimationFrame`. Pas besoin de boucle manuelle. |
| `respectReducedMotion` | `true` | Respecte `prefers-reduced-motion`. Le scroll reste fonctionnel mais sans interpolation. |

## Boucle RAF

### Avec `autoRaf: true`

Pas de code supplémentaire. Lenis gère le `requestAnimationFrame` en interne.

### Avec `autoRaf: false` (ou si tu as ton propre tick)

```js
import Lenis from 'lenis'

const lenis = new Lenis({ autoRaf: false })

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
```

C'est obligatoire si `autoRaf` est faux. Sans cela, Lenis ne met pas à jour le scroll.

## Méthode utilitaire : scroll programmatique

Optionnel. À placer dans `lenis-core/` si tu veux un helper.

```js
export function scrollTo(target, options) {
  lenis.scrollTo(target, options)
}
```

Usage :

```js
import { lenis } from '../lenis'

lenis.scrollTo('#section-2', { duration: 1.2 })
lenis.scrollTo(0, { immediate: true })
```

## Nettoyage

Si tu utilises un framework (React, Vue), détruit l'instance au démontage :

```js
import { lenis } from '../lenis'

// React
useEffect(() => {
  return () => {
    lenis.destroy()
  }
}, [])
```

`destroy()` retire les écouteurs d'événements et arrête la boucle interne.

## Propriétés utiles (pour autres éléments)

| Propriété | Type | Description |
|---|---|---|
| `lenis.scroll` | `number` | Position actuelle (gère l'infinite si activé). |
| `lenis.progress` | `number` | Progression de 0 à 1. |
| `lenis.velocity` | `number` | Vitesse actuelle. |
| `lenis.direction` | `1 | -1 | 0` | Sens du scroll. |
| `lenis.isScrolling` | `boolean | 'smooth' | 'native'` | État du scroll. |
| `lenis.isStopped` | `boolean` | Lenis est-il arrêté. |
| `lenis.prefersReducedMotion` | `boolean` | L'utilisateur réduit-il les mouvements. |
| `lenis.limit` | `number` | Scroll max possible. |

Ces propriétés servent surtout à `smooth-scroll/` et aux animations basées sur le scroll.

## Événements

```js
lenis.on('scroll', (lenis) => {
  // lenis.scroll, lenis.progress, lenis.velocity
})

lenis.on('virtual-scroll', ({ deltaX, deltaY, event }) => {
  // deltaY utile pour synchroniser d'autres effets au défilement
})
```

Note : `scroll` se fait sur l'instance Lenis, pas sur le DOM. Ne pas confondre avec `window.addEventListener('scroll', ...)`.

## Options complètes (résumé)

Voir la doc officielle : https://github.com/darkroomengineering/lenis

Les plus utilisées dans ce projet :

| Option | Par défaut | Quand changer |
|---|---|---|
| `duration` | `1.2` | Pour accélérer ou ralentir le scroll. |
| `easing` | fonction par défaut | Pour un style différent. |
| `lerp` | `0.1` | Alternative à `duration` pour un contrôle continu. |
| `autoRaf` | `false` | À `true` pour ne pas gérer RAF soi-même. |
| `smoothWheel` | `true` | À `false` si le scroll souris doit être natif. |
| `anchors` | `false` | À `true` pour que les liens d'ancres fonctionnent. |
| `allowNestedScroll` | `false` | À `true` si des zones internes doivent scroller nativement. |
| `respectReducedMotion` | `true` | À `false` seulement si tu sais ce que tu fais. |

## Voir aussi

- `smooth-scroll/README.md` — scrollTo, progress, événements, ancres
- `scroll-lock/README.md` — block/unblock
- `css-global/README.md` — CSS indispensable
