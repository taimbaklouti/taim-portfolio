# Smooth Scroll

Couche **interaction avec le scroll** : aller à une position, lire la progression, réagir au défilement, gérer les ancres.

Cette couche utilise l'instance Lenis créée dans `lenis-core/`. Elle ne gère ni le CSS ni le lock du scroll.

## Ce que cet élément fait

- Programme le scroll vers un point cible.
- Expose la progression et la vitesse du scroll.
- Réagit aux événements `scroll` et `virtual-scroll`.
- Active les liens d'ancres si besoin.

## Ce que cet élément NE fait PAS

- Bloquer le scroll (modales, menus). Voir `scroll-lock/`.
- Styler la page. Voir `css-global/`.
- Animer des éléments (c'est le rôle des libs d'animation).

## Prérequis

Un fichier `lenis.js` exportant l'instance :

```js
import { lenis } from '../lenis'
```

Si cet import ne fonctionne pas, voir `lenis-core/README.md`.

## Aller à une position : `scrollTo`

### Par nombre de pixels

```js
lenis.scrollTo(400)
```

### Par sélecteur CSS

```js
lenis.scrollTo('#hero')
```

### Par élément DOM

```js
const section = document.querySelector('#section-2')
lenis.scrollTo(section)
```

### Avec options

```js
lenis.scrollTo('#features', {
  offset: 80,        // équivalent scroll-padding-top
  duration: 1.2,
  easing: (t) => Math.min(1, 1.0 - Math.pow(2, -10 * t)),
  onStart: () => console.log('début du scroll'),
  onComplete: () => console.log('arrivé à la cible'),
})
```

### Options `scrollTo` utiles

| Option | Type | Par défaut | Description |
|---|---|---|---|
| `offset` | `number` | `0` | Décalage par rapport à la cible. |
| `duration` | `number` | config Lenis | Durée en secondes. |
| `easing` | `function` | config Lenis | Fonction easing. |
| `lerp` | `number` | config Lenis | Intensité d'interpolation. |
| `immediate` | `boolean` | `false` | Ignore duration, easing et lerp. |
| `lock` | `boolean` | `false` | Empêche l'utilisateur de scroller jusqu'à la fin. |
| `force` | `boolean` | `false` | Scroll même si Lenis est arrêté. |
| `onStart` | `function` | — | Appelé au début du scroll. |
| `onComplete` | `function` | — | Appelé quand la cible est atteinte. |
| `userData` | `object` | — | Données forwardées dans les événements `scroll`. |

### Attention : `lock`

Si `lock: true`, l'utilisateur ne peut pas scroller manuellement pendant l'animation. À utiliser avec parcimonie, et à combiner avec `scroll-lock/` si tu veux bloquer définitivement le scroll (ex: modale).

## Lire la progression : `progress`

```js
lenis.progress // 0 → 1
```

Utile pour :

- Faire apparaître des éléments au fur et à mesure.
- Synchroniser un dégradé ou un background.
- Piloter une animation GSAP, Framer Motion, Anime.js.
- Synchroniser WebGL / Three.js.

Exemple basique :

```js
lenis.on('scroll', () => {
  const p = lenis.progress
  console.log(`progression : ${p.toFixed(2)}`)
})
```

## Lire la vitesse : `velocity`

```js
lenis.velocity
```

Utile pour :

- Détecter un scroll rapide.
- Lancer un effet d'inertie personnalisé.
- Adapter l'intensité d'une animation en fonction de la vitesse.

## Direction : `direction`

```js
lenis.direction // 1 = vers le haut, -1 = vers le bas, 0 = arrêt
```

## Événement : `scroll`

Se déclenche à chaque frame de scroll fluide.

```js
const unsubscribe = lenis.on('scroll', (lenis) => {
  // lenis.scroll, lenis.progress, lenis.velocity
})

// pour arrêter l'écoute
unsubscribe()
```

Retourne une fonction de désabonnement. Important en React / Vue pour éviter les fuites.

## Événement : `virtual-scroll`

Donne les deltas bruts avant interpolation.

```js
lenis.on('virtual-scroll', ({ deltaX, deltaY, event }) => {
  // event est WheelEvent ou TouchEvent
})
```

Utile pour :

- Synchroniser un effet personnalisé qui veut les deltas.
- Réduire ou amplifier manuellement un axe.
- Détecter un shift+scroll, un geste tactile, etc.

## Ancres

Par défaut, Lenis bloque les liens d'ancres pendant le scroll fluide. Pour les activer :

```js
const lenis = new Lenis({
  anchors: true,
})
```

Ou avec des options :

```js
const lenis = new Lenis({
  anchors: {
    offset: 100,
    onComplete: () => console.log('ancre atteinte'),
  },
})
```

Si tu as des ancres dans le projet, activer `anchors` est fortement recommandé.

## Exemple : section qui apparaît au scroll

Ce n'est pas une animation de composant, c'est une lecture de `progress` qui alimente une animation extérieure.

```js
import { lenis } from '../lenis'

const elements = document.querySelectorAll('[data-reveal]')

lenis.on('scroll', () => {
  const p = lenis.progress
  elements.forEach((el) => {
    const threshold = parseFloat(el.dataset.reveal) || 0
    if (p >= threshold) {
      el.classList.add('is-visible')
    } else {
      el.classList.remove('is-visible')
    }
  })
})
```

Côté CSS, tu gères l'apparence avec `.is-visible`. Cet élément reste dans `smooth-scroll/` car il ne fait que lire le scroll.

## Exemple : synchronisation avec une animation externe

```js
import { lenis } from '../lenis'
// import { animate } from './ta-lib-animation'

lenis.on('scroll', () => {
  const p = lenis.progress
  // p 0→1 peut piloter une timeline, un tween, un paramètre Three.js, etc.
})
```

Voir `motion-mcp/README.md` pour demander à l'IA de générer la partie animation spécifique.

## Voir aussi

- `lenis-core/README.md` — initialiser Lenis, RAF, destroy
- `css-global/README.md` — CSS obligatoire
- `scroll-lock/README.md` — bloquer le scroll
