# Motion MCP

Couche **outil IA** : le serveur MCP `motion-dev-mcp` permet à ton éditeur / client IA de disposer d'une source de documentation et de génération liée aux animations.

Ce README parle du serveur MCP lui-même. Il ne parle pas de comment le connecter (voir `mcp-config/README.md`), ni du smooth scroll Lenis (voir `lenis-core/README.md`).

## Ce que cet élément fait

- Donner accès à l'IA à la documentation d'animation (exemple : Framer Motion, APIs d'animation, patterns).
- Permettre à l'IA de générer des composants animés à partir de prompts.
- Servir de source externe de référence pour que l'IA ne devine pas l'API.
- Être utilisé dans la conversation avec le client IA quand on demande des animations.

## Ce que cet élément NE fait PAS

- Instancer le serveur MCP (cela dépend de la config et du client IA, voir `mcp-config/`).
- Modifier le site pour les visiteurs.
- Remplacer Lenis, ni le CSS, ni le scroll lock.
- Gérer l'authentification ou les clés API si le serveur MCP en demande une (selon sa propre configuration).

## Pourquoi cet outil est utile dans ce projet

Quand on travaille avec des animations, l'IA peut deviner l'API, oublier des props, ou mélanger plusieurs bibliothèques. Un serveur MCP documenté évite ça en fournissant une source de vérité pour les réponses d'animation.

Dans ce projet, il est prévu pour être utilisé conjointement avec :

- Lenis (`lenis-core/`, `smooth-scroll/`) pour le scroll.
- Une lib d'animation (Framer Motion, GSAP, Anime.js, etc.) pour les animations visuelles.
- Le CSS global (`css-global/`) pour les règles de scroll.

## Ce que tu peux lui demander

Une fois le serveur MCP connecté à ton client IA, tu peux lui demander directement dans la conversation.

### Exemple 1 : documentation

```
Avec le serveur motion-dev-mcp, donne-moi la documentation de l'API d'animation pour un composant React, avec les props principales et un exemple rapide.
```

### Exemple 2 : génération d'un composant animé

```
Via motion-dev-mcp, génère un composant React animé : une carte qui entre en slide-up + fade-in, avec un hover scale doux, en utilisant Framer Motion.
```

### Exemple 3 : combinaison Lenis + animation

```
Montre-moi comment combiner Lenis (smooth scroll) et une lib d'animation pour animer des sections au fur et à mesure du scroll, avec un exemple concret en React.
```

### Exemple 4 : pattern spécifique

```
Avec motion-dev-mcp, donne-moi un pattern de parallaxe basique piloté par le scroll, sans dépendances lourdes.
```

## Comment l'IA doit l'utiliser

Pour l'IA, `motion-dev-mcp` est une source externe qu'elle peut interroger pour :

- obtenir des exemples d'API d'animation,
- générer du code cohérent avec une lib d'animation,
- éviter de mixer des APIs incompatible dans la même réponse.

L'IA doit toujours garder clair :

- ce qui concerne Lenis (scroll),
- ce qui concerne l'animation visuelle,
- ce qui relève du CSS global,
- ce qui relève du MCP (outil IA).

## Notes importantes

- Le comportement réel du serveur MCP dépend de ce qu'il a été conçu pour exposer. Vérifie dans `mcp-config/README.md` comment il est lancé et si des variables d'environnement sont nécessaires.
- Si le serveur MCP répond dans une langue ou un format spécifique, adapte les prompts. L'idée reste la même : poser une question précise sur l'animation souhaitée.
- Si l'IA te propose du code qui mélange Lenis et animation, vérifie que chaque partie vient du bon README.

## Voir aussi

- `mcp-config/README.md` — comment connecter le serveur MCP à ton client IA
- `lenis-core/README.md` — Lenis
- `smooth-scroll/README.md` — lecture du scroll
- `scroll-lock/README.md` — modales
- `css-global/README.md` — CSS global
