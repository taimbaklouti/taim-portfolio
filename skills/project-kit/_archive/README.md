# _archive — Sources originales (LECTURE SEULE)

> **Pour l'IA :** ne rien modifier, ne rien supprimer ici. Tout l'utile est déjà copié et organisé dans `01-skills/` et `03-motion/`. Ce dossier = référence brute / sauvegarde.

👉 **Mapping complet source ↔ version organisée : [`INDEX.md`](INDEX.md)** (statut vérifié fichier par fichier).

## Contenu

| Dossier | C'est quoi | Version organisée |
|---|---|---|
| `21st.dev/` | Source officielle des skills 21st.dev (LICENSE, README, skills) | `../01-skills/21st/` |
| `animejs-skills-main/` | Repo source du skill Anime.js (SKILL.md + references) | `../01-skills/animejs/` |
| `gsap/` | Source des 8 skills GSAP + `llms.txt` | `../01-skills/gsap/` |
| `liquid-glass-js-main/` | Librairie "liquid glass" (code démo : button.js, glass.css, container.js…) | — (code de démo exploitable tel quel) |
| `react-three-fiber-master/` | Source complète React Three Fiber (packages fiber, test-renderer, eslint-plugin…) | — (référence 3D web) |
| `shadergradient-main/` | Source ShaderGradient (gradients animés 3D, packages ui/shadergradient, exemples vite/next) | — (référence 3D web) |
| `npm-tooling/` | `package.json` + `package-lock.json` + `node_modules` (dépendance `lenis ^1.3.26`) | `../03-motion/` (code prêt) |

## Quand consulter

- Vérifier la **source d'un skill** (diff, version, licence).
- Récupérer du **code de démo** : effets liquid glass, shaders gradient, patterns R3F.
- Re-vérifier une **version de dépendance** (lenis) dans `npm-tooling/`.

## Règles

- **Ne jamais modifier** le contenu de `_archive/`.
- Pour réutiliser du code : copier vers le projet cible ou vers le dossier du kit approprié, jamais l'inverse.

---

Voir aussi : [`../README.md`](../README.md) (carte du kit).
