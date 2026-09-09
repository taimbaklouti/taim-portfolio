# 05-docs — Documentation & historique

> **Pour l'IA :** contexte historique et mission d'origine. À lire pour comprendre POURQUOI ce kit existe — pas pour copier du code (le code à jour est dans `03-motion/`).

## Contenu

| Fichier | C'est quoi |
|---|---|
| `instruction for Freebuff.txt` | Le prompt d'origine de l'utilisateur : mission "installer Lenis + serveur MCP Motion.dev", avec contraintes et livrables attendus. C'est le document fondateur du kit. |
| `README-previous.md` | L'ancien README racine (avant réorganisation en `project-kit/`). Décrit l'architecture historique `.agents/skills/` + `.style-references/` — gardé pour traçabilité. |

## Pourquoi c'est utile

- `instruction for Freebuff.txt` explique l'intention : une librairie qui permet à une IA d'installer et combiner **smooth scroll (Lenis)** et **doc d'animation via MCP (motion-dev-mcp)** sans se perdre. Tout `03-motion/` découle de cette mission.
- `README-previous.md` fait le lien entre l'ancienne organisation (dossiers cachés à la racine) et la nouvelle (tout visible dans `project-kit/`).

## Note de mapping (ancien → nouveau)

| Avant (racine) | Maintenant |
|---|---|
| `.agents/skills/*` | `project-kit/01-skills/*` |
| `.style-references/*.md` | `project-kit/02-style-references/*.md` |
| `src/lenis.js`, `src/styles/global.css` | `project-kit/03-motion/` |
| `motion-library/` | `project-kit/03-motion/motion-library/` |
| `example site web/`, `example-site-web/` | `project-kit/04-examples/` |
| README racine | `project-kit/05-docs/README-previous.md` |

---

Voir aussi : [`../README.md`](../README.md) (état actuel du kit).
