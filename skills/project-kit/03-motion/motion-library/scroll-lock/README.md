# Scroll Lock

Couche **contrôle du scroll** : bloquer et débloquer le défilement de la page, typiquement pour les modales, les menus, ou les zones qui doivent prendre le focus.

Cette couche est un wrapper autour du DOM et de Lenis. Elle ne fait pas d'animation, ni de smooth scroll.

## Ce que cet élément fait

- Bloquer le scroll de la page.
- Débloquer le scroll de la page.
- Exposer un helper `withScrollLock` pour exécuter du code avec le scroll bloqué.
- Mentionner comment gérer le nested scroll (zones internes qui doivent scroller).

## Ce que cet élément NE fait PAS

- Faire du smooth scroll. Voir `lenis-core/` et `smooth-scroll/`.
- Styler la page. Voir `css-global/`.
- Animer des éléments.

## Pourquoi le scroll lock est nécessaire avec Lenis

Quand une modale s'ouvre, on veut que le corps de la page soit fixe. Avec Lenis, cela signifie :

- empêcher le scroll natif et Lenis de se déclencher,
- éviter que le visiteur ne fasse défiler le background pendant la modal,
- éviter les bugs de double scroll (native + Lenis).

## Mécanisme recommandé

### Bloquer

```js
export function blockScroll() {
  if (document.body.dataset.scrollLocked === 'true') return
  document.body.dataset.scrollLocked = 'true'

  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}
```

### Débloquer

```js
export function unblockScroll() {
  if (document.body.dataset.scrollLocked !== 'true') return
  document.body.dataset.scrollLocked = 'false'

  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}
```

### Pourquoi un attribut dataset

Pour éviter un dédoublement : si `blockScroll()` est appelé plusieurs fois (bug d'UI, ou plusieurs modales empilées mal gérées), on ne met pas le scroll en pétition forever.

> Si ton UI ouvre plusieurs modales en stack, c'est un problème d'architecture. Le lock doit être lié au nombre de modales ouvertes, pas à des appels incontrôlés.

## Helper : `withScrollLock`

Utile quand une action doit être rapide et que le déblocage doit toujours se faire.

```js
export async function withScrollLock(fn) {
  blockScroll()
  try {
    return await fn()
  } finally {
    unblockScroll()
  }
}
```

Exemple :

```js
import { withScrollLock } from '../scroll-lock'

await withScrollLock(async () => {
  await openModalAndFetchData()
})
```

## Usage typique avec une modale React

```jsx
import { useEffect } from 'react'
import { blockScroll, unblockScroll } from '../scroll-lock'

export function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      blockScroll()
    }
    return () => {
      unblockScroll()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}
```

Important :

- Si la modale se ferme par `Escape`, assure-toi que le `onClose` libère bien le scroll.
- Si la modale est dans un route change, assure-toi que le démontage libère le scroll.

## Interaction avec Lenis

Le scroll lock de cette couche est **au niveau du DOM**. Il fonctionne avec ou sans Lenis.

Si Lenis est actif :

- `overflow: hidden` sur `html,body` coupe le scroll natif.
- Lenis continue de tourner, mais le contenu ne bouge pas car le body est bloqué.
- Si tu veux stopper Lenis proprement pendant la modale, tu peux appeler `lenis.stop()` et `lenis.start()` aux bons endroits.

Exemple :

```js
import { lenis } from '../lenis'
import { blockScroll, unblockScroll } from '../scroll-lock'

export function openModal() {
  blockScroll()
  lenis.stop()
}

export function closeModal() {
  lenis.start()
  unblockScroll()
}
```

Si tu utilises cette approche, lie bien l'ouverture et la fermeture pour ne jamais laisser Lenis dans un état incohérent.

## Nested scroll : zones internes qui doivent scroller

Si une modale ou un panneau interne a son propre contenu scrollable, il faut que ce contenu puisse scroller sans déclencher le scroll de la page.

### Option 1 : `allowNestedScroll` de Lenis

```js
const lenis = new Lenis({
  allowNestedScroll: true,
})
```

C'est la solution la plus simple. Lenis détecte les zones scrollables et les laisse natives.

Attention :

- Ça peut être plus coûteux en perf car Lenis check le DOM au fil des événements.
- Si tu as des perf problématiques, utilises plutôt `prevent` ou les attributs HTML.

### Option 2 : attribut `data-lenis-prevent`

```html
<div data-lenis-prevent>
   contenu scrollable
</div>
```

Variantes :

| Attribut | Effet |
|---|---|
| `data-lenis-prevent` | Bloque tout le smooth scroll sur l'élément |
| `data-lenis-prevent-wheel` | Bloque uniquement les événements wheel |
| `data-lenis-prevent-touch` | Bloque uniquement les événements touch |

### Option 3 : fonction `prevent`

```js
const lenis = new Lenis({
  prevent: (node) => node.classList.contains('scrollable-inner'),
})
```

## Pièges courants

- **Double lock** : if `blockScroll()` est appelé sans `unblockScroll()` équivalent, la page reste bloquée.
- **Lock oublié au changement de route** : si tu changes de page et qu'une modale était ouverte, tu dois libérer le scroll avant ou pendant le route change.
- **Scrollbar disparaît et le layout bouge** : sur certains designs, le masquage de la scrollbar fait shifter la page. Voir `css-global/README.md` pour atténuer ce comportement.
- **Lenis + lock sans synchronisation** : si tu fais `lenis.stop()` dans une modale, n'oublie pas `lenis.start()` à la fermeture.

## Voir aussi

- `lenis-core/README.md` — stop / start Lenis
- `css-global/README.md` — overflow, overscroll, scrollbar
- `smooth-scroll/README.md` — scroll programmatique si tu veux remonter en haut avant d'ouvrir une modale
