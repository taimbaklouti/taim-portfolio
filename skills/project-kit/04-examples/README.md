# 04-examples — Sites d'exemple

> **Pour l'IA :** ici ce n'est plus de la théorie — ce sont des implémentations concrètes (fiche de marque + tokens + thème CSS). Sers-t'en pour voir à quoi ressemble "une fiche appliquée".

## Rôle de ce dossier

Montrer le **format final attendu** quand on extrait ou applique un style : chaque exemple couple une fiche narrative (`.md`) à des fichiers de tokens exploitables (`tokens.json`, `*.css`).

## Contenu

### `example site web/` — marques complètes

> Note : `Mintlify/` a été promu dans `../02-style-references/mintlify/` (fiche canonique). Les marques ci-dessous peuvent suivre le même chemin si elles deviennent un style de référence.

| Dossier | Fichiers types |
|---|---|
| `Phantom/` | `Phantom.md` + `tokens.json` + `referance-theme.css` + `variables.css` |
| `Monad/` | idem |
| `off+brand/` | idem |
| `ORYZO AI/` | idem |
| `Slash/` | idem |
| `Superhuman/` | idem |
| `gsap2/` | `gsap2.md` (fiche seule) |
| `Your workplace has the answer Just ask Dala for it/` | fiche Dala + tokens + css |

*(Noms de dossiers avec espaces = d'origine, ne pas renommer.)*

### `example-site-web/` — exemple minimal

`phantom/` avec seulement `tokens.json` + `referance-theme.css` : le **squelette de référence** pour créer une nouvelle fiche de style. (Pour un exemple complet avec fiche narrative, voir `../02-style-references/mintlify/`.)

## Comment les utiliser

1. **Créer une nouvelle style reference** → copie la structure de `example-site-web/phantom/` (tokens.json + theme.css), remplis avec les tokens extraits du site cible, puis pose la fiche dans `../02-style-references/`.
2. **Voir une identité appliquée** → lit la fiche `.md` de la marque + ses `tokens.json` côte à côte : tu vois comment les tokens abstraits deviennent des valeurs concrètes.
3. **S'inspirer pour un one-shot** → les fiches de `example site web/` décrivent layout, composants et ambiance section par section : bon calque pour structurer une nouvelle page.

## Règles

- Ces dossiers sont des **références en lecture** : ne les modifie pas pour "adapter" un projet. Copie vers le projet cible, ou crée une nouvelle fiche dans `02-style-references/`.
- En cas de conflit entre une fiche de `02-style-references/` et un exemple ici, la fiche fait foi (les exemples sont des snapshots).

---

Voir aussi : [`../02-style-references/README.md`](../02-style-references/README.md) (les fiches canoniques).
