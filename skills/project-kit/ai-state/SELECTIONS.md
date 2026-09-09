# 🧠 SELECTIONS — Mémoire persistante des choix de l'IA

> **PROTOCOLE OBLIGATOIRE pour l'IA — à chaque session, sans exception :**
>
> 1. **AVANT toute tâche** : lis ce fichier en entier. C'est ta seule mémoire entre les sessions.
> 2. **Si une entrée existe** pour le projet/page concerné(e) → **RÉUTILISE ces choix tels quels** (même fiche de style, mêmes skills, mêmes MCP). Ne re-décide pas. Ne re-pick pas.
> 3. **Si aucune entrée n'existe** → fais tes choix via [`../README.md`](../README.md) (workflows + navigation), puis **écris une entrée ci-dessous AVANT de coder**, en copiant le template.
> 4. **Si l'utilisateur change un choix en cours** → mets à jour l'entrée concernée et déplace l'ancien choix dans "Décisions remplacées" de l'entrée.
> 5. **Ne supprime jamais une entrée.** Termine-la : 🔄 en cours → ✅ terminé ou 🚫 abandonné.
>
> Règle d'or : une session fraîche sans aucun contexte doit pouvoir reprendre le travail **uniquement** avec ce fichier + les README du kit.

---

## Pourquoi ce fichier existe

Chaque session de l'IA repart de zéro. Sans registre, deux sessions travaillant sur le même projet peuvent choisir **des fiches de style différentes, des skills différents, des approches différentes** — et le projet devient incohérent. Ce fichier fige les décisions : ce qui est choisi ici est **verrouillé** jusqu'à décision explicite de l'utilisateur.

Ce qui est enregistré ici : les **choix** (style, skills, MCP, workflow, décisions structurantes) et **l'état d'avancement** (fait / reste à faire).
Ce qui n'est PAS enregistré ici : le code lui-même (il vit dans le projet), les détails triviaux.

---

## Template d'entrée (copier-coller, remplir, garder l'ordre)

```markdown
### [NOM PROJET/TÂCHE] — [AAAA-MM-JJ]
- **Statut :** 🔄 en cours / ✅ terminé / 🚫 abandonné
- **Workflow :** A (one-shot) / B (amélioration)
- **Style reference :** `../02-style-references/<fiche>.md` — raison du choix en 1 ligne
- **Skills actifs :** `gsap/gsap-scrolltrigger`, `copywriting`, `unslop`… (chemins exacts)
- **MCP utilisés :** watermelon / motion-dev-mcp / 21st / aucun
- **Motion :** `../03-motion/lenis.js` + `global.css` copiés dans le projet ? (oui → chemin, non)
- **Décisions clés :** 2-3 lignes max (ex: tokens Tailwind v4, dark mode only, marquee statique)
- **Décisions remplacées :** (anciens choix abandonnés, avec la date)
- **Fait :** ce qui est déjà produit
- **À reprendre :** ce qui reste à faire à la prochaine session (précis et actionnable)
```

---

## 📌 Entrées actives

### TAIM-PORTFOLIO-WOW — refonte scroll Home — 2026-09-07
- **Statut :** 🔄 en cours
- **Workflow :** B (amélioration — site existant Next.js 15, refonte scroll home)
- **Style reference :** `../02-style-references/apple.md` (variante) — blend Apple + Phantom + Oryzo défini dans `design.md` : pill geometry, surfaces translucides backdrop-blur, soft glow shadows, ember accent, Inter. Le style Miranda a été essayé puis **abandonné sur décision utilisateur** (trop serif/éditorial, il voulait du doux arrondi).
- **Skills actifs :** `../01-skills/gsap/gsap-core`, `../01-skills/gsap/gsap-react`, `../01-skills/gsap/gsap-scrolltrigger`, `../01-skills/gsap/gsap-timeline`, `../01-skills/gsap/gsap-performance`, `../01-skills/copywriting`, `../01-skills/unslop`
- **MCP utilisés :** motion-dev-mcp (principal)
- **Motion :** GSAP leader (SplitText hero, ScrollTrigger parallax scrub sur images + blob, reveals en cascade via AnimatedSection), Lenis scroll libre existant, Framer routes only, prefers-reduced-motion → durées 0
- **Décisions clés :**
  - Style verrouillé : Apple/Phantom/Oryzo (design.md + tokens.css) — arrondis pill, translucide, Inter, accent ember.
  - Scroll animations : SplitText sur le nom hero, parallax doux (yPercent scrub, transform only) sur images About/Projets + blob hero, reveals staggered existants conservés. Rien de gadget.
  - Sidebar + Navbar conservées telles quelles (choix utilisateur), Footer/Button/Badge inchangés d'origine.
- **Décisions remplacées :**
  - Miranda Poster Editorial (2026-09-07, essayé puis abandonné même jour) → retour Apple/Phantom/Oryzo. Bodoni Moda / Source Serif 4 désinstallées de layout.jsx.
  - Accent ember bordeaux #c03f13 (2026-09-07 → 2026-09-08, remplacé sur décision utilisateur : "c'est pas du bordeaux mais du orange") → accent orange #f97316 (light) / #fb923c (dark). Fond pas blanc → crème chaud #faf6f0 (light) / brun chaud #1c1917 (dark). tokens.css + globals.css + HeroParticles fallback modifiés en conséquence.
- **Fait (2026-09-07 session 2) :** essai Miranda complet (tokens, fonts serif, bandeaux encre, badge carré, tampon) → **reverté**. tokens.css/globals.css/design.md/Navbar/Sidebar/Button/Footer/FooterCta/ThemeToggle/HeroAnimation/page.jsx restaurés à l'état Apple/Phantom/Oryzo. Composants Miranda supprimés (StampSeal, EditorialMarquee, DisplayBanner). Parallax doux ajouté sur les images (data-parallax + scale-125).
- **Fait (2026-09-08 session 3) :** palette orange/crème (tokens.css déverrouillé sur demande user). Amplification couleur : bandes ember-band, tuiles ember-tile, manifeste ember-solid (bande 100% orange), orbes flottantes. Titres révélés au scroll (data-reveal-title, GSAP once). Zoom images 1.3→1.18 scrub. Section Stack pills en cascade. 3 cartes projets réelles (EduTounes, Calendar, ImageVault — ImageVault choisi car Intervyou refusé par user, slugs vérifiés dans json/data.json). Micro-interactions animejs v4 : tilt 3D avatar avec ressort, pop élastique icônes sociales. Back-to-top flottant (components/BackToTop.jsx). Point pulsant badge hero. Build vert. Backup tar 102Mo dans ~/backups/ + /tmp (git stash -u a timeouté à cause de .pnpm-store).
- **À reprendre :** valider le rendu scroll sur navigateur (orange/crème + reveals), étendre le même traitement aux pages About/Projects si validé.

### PROJECT-KIT — bibliothèque de skills/styles — 2026-09-06
- **Statut :** ✅ terminé (kit organisé ; entrées futures = nouveaux projets sites)
- **Workflow :** A (one-shot — construction de la librairie elle-même)
- **Style reference :** aucune appliquée (le kit est un outil, pas un site) — fiches disponibles dans `../02-style-references/`
- **Skills actifs :** aucun exécuté ; bibliothèque constituée : `../01-skills/` (gsap ×8, 21st ×7, animejs, copywriting, design-critique, unslop)
- **MCP utilisés :** `motion-dev-mcp` (installé : `../03-motion/motion-dev-mcp/dist/index.js`, build + DB initialisés, 26 pages de doc React/JS/Vue) + `watermelon` (déjà présent dans `.mcp.json`)
- **Motion :** oui — code canonique dans `../03-motion/` (`lenis.js` + `global.css`), dépendance lenis ^1.3.26 dans `../_archive/npm-tooling/`
- **Décisions clés :**
  - Structure du kit = 01-skills / 02-style-references / 03-motion / 04-examples / 05-docs / ai-state / _archive (lecture seule).
  - Mintlify promu d'exemple vers fiche canonique (`../02-style-references/mintlify/`) — sheet complète + tokens.json + theme css + variables.css.
  - Sources originales conservées dans `_archive/` avec mapping vérifié (`INDEX.md` + `index.json`, 18 fichiers identiques confirmés par cmp).
- **Décisions remplacées :** ancienne organisation racine (`.agents/skills/`, `.style-references/`, dossiers en vrac) → remplacée par `project-kit/` le 2026-09-06.
- **Fait :** réorganisation complète, READMEs (master + 6 dossiers), INDEX.md + index.json _archive, ai-state créé, motion-dev-mcp cloné/buildé/DB initialisé/configuré dans `.mcp.json` (chemin absolu), yaml agents repris, Mintlify promu.
- **À reprendre :** rien pour le kit. Prochaine session : choisir une fiche de style et créer l'entrée du projet site.


---

## ✅ Terminés / 🚫 Abandonnés

*(les entrées déplacées ici ne sont plus actives — les consulter pour l'historique des décisions)*

---

Voir aussi : [`../README.md`](../README.md) (carte du kit, workflows, checklist IA).
