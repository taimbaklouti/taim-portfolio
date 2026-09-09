# 🔎 INDEX — `_archive/` : sources ↔ versions organisées

> **Pour l'IA :** ce fichier fait le mapping exact entre chaque source brute ici et sa contrepartie organisée dans le kit. Statut vérifié par `cmp` octet par octet (pas une supposition). Dernière vérification : septembre 2026.

**Légende statut :**
- ✅ **COPIE IDENTIQUE** — la version organisée est un double byte-à-byte de la source
- 📦 **CONTENU UNIQUE** — n'existe QUE ici, aucune contrepartie organisée
- 📚 **RÉFÉRENCE SEULE** — lib/monorepo complet posé ici pour consultation, pas destiné à être copié

---

## Vue d'ensemble

| Source ici | Contrepartie organisée | Statut |
|---|---|---|
| `21st.dev/` | `../01-skills/21st/` | ✅ 7/7 skills identiques (+ extras ici) |
| `animejs-skills-main/` | `../01-skills/animejs/` | ✅ 3/3 fichiers identiques (+ extras ici) |
| `gsap/` | `../01-skills/gsap/` | ✅ 8/8 modules identiques (+ extras ici) |
| `liquid-glass-js-main/` | — | 📦 contenu unique (lib démo) |
| `react-three-fiber-master/` | — | 📚 référence seule (monorepo R3F) |
| `shadergradient-main/` | — | 📚 référence seule (monorepo ShaderGradient) |
| `npm-tooling/` | `../03-motion/` (code adapté) | 📦 dépendances (lenis) |

---

## 1. `21st.dev/` → `../01-skills/21st/`

Source officielle des skills 21st.dev (repo avec LICENSE + README + 7 skills).

| Fichier source | Contrepartie | Statut |
|---|---|---|
| `skills/21st-ai/SKILL.md` | `01-skills/21st/21st-ai/SKILL.md` | ✅ identique |
| `skills/21st-cli-use/SKILL.md` | `01-skills/21st/21st-cli-use/SKILL.md` | ✅ identique |
| `skills/21st-design-sync/SKILL.md` | `01-skills/21st/21st-design-sync/SKILL.md` | ✅ identique |
| `skills/21st-registry/SKILL.md` | `01-skills/21st/21st-registry/SKILL.md` | ✅ identique |
| `skills/21st-ui-build/SKILL.md` | `01-skills/21st/21st-ui-build/SKILL.md` | ✅ identique |
| `skills/21st-ui-explore/SKILL.md` | `01-skills/21st/21st-ui-explore/SKILL.md` | ✅ identique |
| `skills/21st-ui-review/SKILL.md` | `01-skills/21st/21st-ui-review/SKILL.md` | ✅ identique |

**📦 Extras présents uniquement ici :**
- `LICENSE`, `README.md` — licence et doc du repo source

*(Les `agents/openai.yaml` des 3 skills UI étaient les derniers extras — ils ont depuis été repris dans `01-skills/21st/*/agents/`. Mappings mis à jour dans le tableau ci-dessus et dans `index.json`.)*

---

## 2. `animejs-skills-main/` → `../01-skills/animejs/`

Repo source du skill Anime.js.

| Fichier source | Contrepartie | Statut |
|---|---|---|
| `SKILL.md` | `01-skills/animejs/SKILL.md` | ✅ identique |
| `references/api-reference.md` | `01-skills/animejs/references/api-reference.md` | ✅ identique |
| `references/examples.md` | `01-skills/animejs/references/examples.md` | ✅ identique |

**📦 Extras présents uniquement ici :**
- `install.sh` — script d'installation d'origine du repo
- `README.md` — doc du repo source

---

## 3. `gsap/` → `../01-skills/gsap/`

Source des 8 modules de skills GSAP.

| Fichier source | Contrepartie | Statut |
|---|---|---|
| `gsap-core/SKILL.md` | `01-skills/gsap/gsap-core/SKILL.md` | ✅ identique |
| `gsap-frameworks/SKILL.md` | `01-skills/gsap/gsap-frameworks/SKILL.md` | ✅ identique |
| `gsap-performance/SKILL.md` | `01-skills/gsap/gsap-performance/SKILL.md` | ✅ identique |
| `gsap-plugins/SKILL.md` | `01-skills/gsap/gsap-plugins/SKILL.md` | ✅ identique |
| `gsap-react/SKILL.md` | `01-skills/gsap/gsap-react/SKILL.md` | ✅ identique |
| `gsap-scrolltrigger/SKILL.md` | `01-skills/gsap/gsap-scrolltrigger/SKILL.md` | ✅ identique |
| `gsap-timeline/SKILL.md` | `01-skills/gsap/gsap-timeline/SKILL.md` | ✅ identique |
| `gsap-utils/SKILL.md` | `01-skills/gsap/gsap-utils/SKILL.md` | ✅ identique |

**📦 Extras présents uniquement ici :**
- `llms.txt` — index LLM du repo source

---

## 4. `liquid-glass-js-main/` — 📦 lib démo (pas de contrepartie)

Librairie "liquid glass" en JS vanilla : effet de verre liquide interactif (boutons, conteneurs).

| Fichier | Rôle |
|---|---|
| `button.js` (25 KB) | Composant bouton liquid glass |
| `container.js` (26 KB) | Composant conteneur liquid glass |
| `controls.js` + `controls.css` | Panneau de contrôle des paramètres |
| `glass.css` + `styles.css` + `demo.css` | Styles (lib + démo) |
| `index.html` + `demo.js` | Page de démo ouvrable dans un navigateur |
| `demo.gif` (10 MB) | Aperçu animé |
| `README.md` + `LICENSE` | Doc + licence d'origine |

**Usage :** copier `button.js` / `container.js` / `glass.css` tel quel dans un projet qui veut l'effet. C'est du code de démo autonome — pas un skill, pas un système organisé.

---

## 5. `react-three-fiber-master/` — 📚 référence 3D web

Monorepo complet de **React Three Fiber** (renderer React pour three.js).

- `packages/fiber/` — le cœur (core, hooks, types)
- `packages/test-renderer/` — renderer de test
- `packages/eslint-plugin/` — règles lint (ex: `no-new-in-loop`)
- `packages/shared/` — utilitaires partagés
- `docs/`, `example/` — documentation et exemple
- Config monorepo : `package.json`, `yarn.lock`, `tsconfig.json`, `vite.config.ts`, `jest.config.js`, `babel.config.js`

**Usage :** consulter la source pour des patterns R3F avancés (boucle, raycasting, extention de three). Ne pas copier tel quel — c'est un projet entier, pas une lib à glisser.

---

## 6. `shadergradient-main/` — 📚 référence gradients 3D

Monorepo complet de **ShaderGradient** (gradients animés 3D, basé sur R3F).

- `packages/shadergradient/` — le composant React `ShaderGradient` + post-processing (HalftonePass, etc.)
- `packages/ui/` — l'app UI (composants partagés, overrides Figma, store presets)
- `packages/tailwind-config/`, `packages/tsconfig/`, `packages/eslint-config-custom/` — config partagées
- `apps/examples/`, `apps/example-nextjs-dev/` — exemples d'intégration (vite, next)
- `apps/figma-plugin/`, `apps/framer-plugin/` — plugins Figma/Framer
- `apps/email-previews/` — previews email react-email
- Config monorepo : `pnpm-workspace.yaml`, `turbo.json`, `pnpm-lock.yaml`

**Usage :** extraire des patterns (props du composant, passes de post-processing, intégration R3F). Ne pas copier tel quel.

---

## 7. `npm-tooling/` — 📦 dépendances npm

| Fichier/dossier | Rôle |
|---|---|
| `package.json` | Une seule dépendance : `lenis ^1.3.26` |
| `package-lock.json` | Lockfile associé |
| `node_modules/` | Modules installés (lenis) |

**Contrepartie organisée :** le code de scroll **adapté à la main** vit dans `../03-motion/lenis.js` + `../03-motion/global.css` (pas une copie — une version épurée : init, scrollTo, block/unblock, CSS anti-conflit). Les fichiers npm ici servent si tu veux réinstaller lenis localement (`npm install` dans ce dossier) ou vérifier la version.

---

## 🔬 Re-vérifier les mappings (commandes)

```bash
cd project-kit/_archive

# Skills 21st (7)
for s in 21st-ai 21st-cli-use 21st-design-sync 21st-registry 21st-ui-build 21st-ui-explore 21st-ui-review; do
  cmp -s "21st.dev/skills/$s/SKILL.md" "../01-skills/21st/$s/SKILL.md" && echo "OK  $s" || echo "DIFF  $s"
done

# Skills GSAP (8)
for g in gsap-core gsap-frameworks gsap-performance gsap-plugins gsap-react gsap-scrolltrigger gsap-timeline gsap-utils; do
  cmp -s "gsap/$g/SKILL.md" "../01-skills/gsap/$g/SKILL.md" && echo "OK  $g" || echo "DIFF  $g"
done

# Anime.js (3 fichiers)
cmp -s "animejs-skills-main/SKILL.md" "../01-skills/animejs/SKILL.md" && echo "OK  animejs SKILL"
cmp -s "animejs-skills-main/references/api-reference.md" "../01-skills/animejs/references/api-reference.md" && echo "OK  animejs api-ref"
cmp -s "animejs-skills-main/references/examples.md" "../01-skills/animejs/references/examples.md" && echo "OK  animejs examples"
```

Résultat attendu : tout `OK`.

---

## ⚠️ Rappel

Ce dossier est en **lecture seule** (voir `README.md`). Pour réutiliser quelque chose : copier VERS le projet cible ou le dossier du kit concerné — jamais l'inverse.

---

Voir aussi : [`../README.md`](../README.md) (carte du kit) · [`README.md`](README.md) (règles de l'archive).
