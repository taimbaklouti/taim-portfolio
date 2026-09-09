# 02-style-references — Identités visuelles de marque

> **Pour l'IA :** une fiche = une identité complète (couleurs, typo, spacing, composants, do's/don'ts). Choisis-en UNE par projet et respecte-la à la lettre. Ne mélange jamais deux fiches.

## Rôle de ce dossier

C'est le **"quoi" visuel**. Les skills (`01-skills/`) disent comment travailler ; ces fiches disent à quoi le résultat doit ressembler. Chaque fiche contient : tokens CSS prêts à copier (`:root` / `@theme` Tailwind v4), échelle typo, composants types, do's/don'ts, guide de prompt pour l'agent.

## Index des fiches

| Fiche | Ambiance en une ligne |
|---|---|
| **`mintlify/`** (dossier) | Cloud garden over a glass desk — monochrome discipliné + vert menthe `#0c8c5e`. **La plus complète** : `mintlify.md` + `tokens.json` + `refrence-theme.css` + `variables.css`. Sert de référence de format. |
| `ai-for-business.md` | SaaS IA corporate, crédibilité pro |
| `apple.md` / `apple2.md` | Minimalisme premium Apple (2 variantes) |
| `ditto.md` | Sunlit wildflower compliance atelier |
| `eleven-labs.md` | Tech audio sombre et précise |
| `flying-papers.md` | Éditorial dynamique, papier en mouvement |
| `hungry-tiger.md` | Audacieux, contrasté, agence |
| `hyer-aviation.md` | Aviation premium, bleu profond |
| `jeton.md` | Fintech éditoriale sur marbre chaud |
| `leonardo.md` | IA créative, gallery-like |
| `mercury.md` | Fintech banking, sobre et luxueuse |
| `miranda.md` | Studio créatif, typographie forte |
| `slush.md` | Universe de stickers gonflés sur papier pastel |
| `steep.md` | Thé/boissons, énergique |
| `structured.md` | SaaS structuré, grille nette |
| `superr.md` | Studio digital flashy |
| `wise.md` | Deep moss with lime voltage |

## Comment choisir (workflow)

1. **L'utilisateur nomme la marque** → prends cette fiche, point.
2. **L'utilisateur décrit une ambiance** → compare avec la colonne "Ambiance", prends la plus proche, annonce ton choix.
3. **Amélioration d'un site existant** → cherche la fiche de SA marque ici ; si absente, extrais les tokens du site existant avant d'ajouter quoi que ce soit (voir Workflow B du README principal).

## Utiliser les tokens

Chaque fiche se termine par des blocs de code prêts à copier :

```css
:root { --color-…: #…; --font-…: …; --text-…: …px; --spacing-…: …px; }
@theme { /* pareil, format Tailwind v4 */ }
```

→ Copie le bloc dans le CSS global du projet cible. C'est la source de vérité : **aucune couleur/taille hors tokens.**

## Exemples de format

**`mintlify/`** est le meilleur exemple sur place : fiche narrative + `tokens.json` + thème CSS + variables. Pour le format minimal (tokens.json + theme.css), voir `../04-examples/example-site-web/phantom/`. C'est le squelette de référence pour créer une nouvelle fiche.

## Règles

- **Une fiche par site.** Jamais de mix-and-match entre marques.
- Les sections "Do's and Don'ts" et "Animation Philosophy" de chaque fiche sont **non négociables** (ex: Slush interdit les gradients et les ombres).
- En cas de doute sur un composant : la section "Components" de la fiche montre comment il est construit — imite, n'invente pas.
- Les doublons historiques (ex: `Apple.md` vs `apple.md`) sont des variantes légitimes, pas des erreurs — compare-les avant d'en écarter une.

---

Voir aussi : [`../README.md`](../README.md) (workflows one-shot / amélioration).
