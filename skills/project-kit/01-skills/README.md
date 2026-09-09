# 01-skills — Compétences de l'IA

> **Pour l'IA :** chaque sous-dossier = un skill activable. Lis le `SKILL.md` du skill concerné AVANT de faire la tâche correspondante. Ces skills te disent COMMENT travailler — pas quoi construire.

## Rôle de ce dossier

C'est la **boîte à outils comportementale** de l'IA. Le style (le "quoi") vient de `02-style-references/` ; les skills (le "comment") sont ici : comment animer, comment écrire, comment critiquer, comment générer de l'UI.

## Index des skills

| Skill | Chemin | Quand l'utiliser |
|---|---|---|
| **GSAP** (8 modules) | `gsap/` | Animations au scroll (ScrollTrigger), timelines complexes, intégration React/Vue/Svelte, performance 60fps |
| **Anime.js v4** | `animejs/` | Animations JS légères, SVG (morphing, draw), stagger, draggable, motion path |
| **21st.dev** (7 modules) | `21st/` | Générer des composants UI, installer des composants/thèmes, auditer une UI, publier sur 21st.dev |
| **Copywriting** | `copywriting/` | Textes marketing orientés conversion : hero, CTA, pricing, landing |
| **Design critique** | `design-critique/` | Structurer un retour design avant/après modification d'une page |
| **Unslop** | `unslop/` | Nettoyer les tournures "IA" dans tout texte produit |

### `mcp-skills/` — compatibilité

Copies **plates** des 3 skills (copywriting, design-critique, unslop) au format fichier unique `*_SKILL.md`. Utile pour les clients/agents qui ne lisent pas les dossiers `SKILL.md`. Le contenu est identique — rien de nouveau ici.

### Agents `*.yaml` (21st)

Trois skills UI de 21st (`21st-ui-build`, `21st-ui-explore`, `21st-ui-review`) incluent un dossier `agents/openai.yaml` — interface metadata pour les agents OpenAI (display_name, short_description, default_prompt). Repris de la source ; inoffensif pour les autres hôtes.

## Format d'un skill

Chaque sous-dossier contient un `SKILL.md` avec un frontmatter obligatoire :

```markdown
---
name: nom-du-skill
description: Ce que fait le skill, quand l'utiliser.
---

# Contenu du skill…
```

Certains skills ont des `references/` (doc détaillée) — chargée seulement si besoin.

## Comment ça se déclenche

L'hôte IA lit `name` + `description` et active le skill quand la demande correspond :
- *"animate this hero on scroll"* → `gsap/gsap-scrolltrigger`
- *"write the landing page copy"* → `copywriting`
- *"build a pricing section"* → `21st/21st-ui-build` + `copywriting`

## Combinaisons typiques

| Tâche | Skills à charger ensemble |
|---|---|
| One-shot landing page | `copywriting` + `gsap/gsap-scrolltrigger` + fiche de marque de `02-style-references/` |
| Refonte UI d'une section | `design-critique` + `21st/21st-ui-review` |
| Ajouter une animation | `gsap/` ou `animejs/` + `03-motion/` (scroll system) |
| Rédiger + publier du texte | `copywriting` puis `unslop` |

## Règles

- Un skill se **lit**, pas se copie dans le projet (contrairement aux tokens de style).
- Ne jamais improviser une API d'animation : le skill fait autorité (versions, syntaxe).
- Les sources originales de ces skills sont dans `_archive/` (lecture seule).

---

Voir aussi : [`../README.md`](../README.md) (carte du kit et workflows).
