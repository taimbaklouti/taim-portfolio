# CSS Global

Couche **styles obligatoires** pour que Lenis fonctionne sans conflit avec le navigateur.

Ce fichier CSS doit être chargé une fois au niveau de la page. Il ne doit pas être repris dans des composants.

## Ce que cet élément fait

- Coupe le scroll natif au profit de Lenis.
- Évite les effets de bord (overscroll, rebond, zoom indésirable sur mobile).
- Donne une solution pour les zones qui doivent scroller nativement.
- Propose un style de scrollbar optionnel.

## Ce que cet élément NE fait PAS

- Styliser le thème de la page.
- Gérer les animations.
- Gérer le lock du scroll (c'est `scroll-lock/README.md`).

## Règle principale

Lenis fonctionne en remplacement du scroll natif. Pour éviter que le navigateur fasse scroller en même temps que Lenis, le CSS global doit couper le scroll sur `html` et `body`.

```css
html,
body {
  overflow: hidden;
  overscroll-behavior: none;
  scroll-behavior: auto;
}
```

Note :

- `overflow: hidden` est obligatoire dans la plupart des cas.
- `overscroll-behavior: none` évite les effets de rebond sur mobile / défilage enchaîné.
- `scroll-behavior: auto` évite que le navigateur fasse un scroll natif instable si `scrollTo` d'une autre lib est utilisé.

## Pourquoi `overflow: hidden` sur html ET body

Sur certains navigateurs, ne pas mettre les deux introduit des comportements incohérents :

- le scroll natif survole Lenis,
- ou le contenu sort de la vue,
- ou le body reste scrollable même si html est bloqué.

Mettre les deux est la pratique la plus robuste.

## Zones qui doivent scroller nativement

Si une partie de la page doit scroller sans Lenis (menu, panneau interne, zone de contenu dans une modale, etc.), réactive localement :

```css
.scroll-native {
  overflow: auto;
  overscroll-behavior: contain;
}
```

Assure-toi que l'élément a une hauteur contrainte (`height`, `max-height`, `100vh`, etc.) sinon `auto` peut ne rien faire.

## Scrollbar

Lenis cache souvent le scroll natif. Sur certains designs, ça décale le layout quand la scrollbar disparaît.

Deux approches :

### 1. Garder une scrollbar stylisée sans shift de layout

```css
html {
  -ms-overflow-style: none;  /* IE et anciens Edge */
  scrollbar-width: thin;     /* Firefox */
  scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}
```

### 2. Masquer la scrollbar, mais compenser le shift

Si tu masques la scrollbar et que ton layout bouge, la solution classique est d'ajouter un padding-right équivalent à la largeur de la scrollbar sur le conteneur principal, ou d'utiliser une scrollbar transparente dès le départ.

Dans ce projet, privilégier la **scrollbar fine transparente** plutôt que l'effacer brutalement.

## Overscroll

`overscroll-behavior: none` sur `html,body` évite les effets de domino quand on arrive en haut ou en bas de page.

Si certaines zones internes doivent conserver un comportement d'overscroll raisonnable, mets-les en `contain`.

## Mobile / tactile

- Si ton site doit supporter le zoom, n'interdis pas `touch-action` de façon abusive.
- Si tu utilises `overscroll-behavior: none`, ça n'empêche pas le zoom natif sauf si tu ajoutes `touch-action` ou `font-size: 100%` + meta viewport bien configuré.
- Vérifie sur iOS qu'une modale n'empêche pas le scroll du body et ne déclenche pas de scroll natif indésirable.

## Pièges courants

- **Lenis sans ce CSS** : le scroll natif et Lenis se battent, le résultat est instable.
- **Scrollbar fantôme** : la page bouge de quelques pixels quand la scrollbar apparaît/disparaît.
- **Modale qui scroll aussi** : si la modale a `overflow: auto` mais pas de hauteur fixe, elle peut ne pas scroller comme prévu.
- **Div verticale interne qui ne scrollera pas** : oubli de `height` ou `max-height`.
- **Triple overflow** : `overflow` répété partout sans structure claire. À éviter. Le CSS global doit être unique.

## Où placer ce CSS

À la racine du style de la page, avant les styles des composants :

- `src/styles/global.css`
- `src/index.css`
- `src/app.css`
- ou l'équivalent dans ton framework

Que le CSS soit dans un fichier importé une seule fois.

## Voir aussi

- `lenis-core/README.md` — initialisation
- `scroll-lock/README.md` — bloquer le scroll (modales)
- `smooth-scroll/README.md` — scroll programmatique
