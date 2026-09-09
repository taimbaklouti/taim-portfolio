# Freebuff — Skills & Style References

Ce dossier contient les **skills** et **style references** utilisables par Freebuff (Buffy) sur tous tes projets.

```
.agents/skills/       ← 16 skills chargés automatiquement
.style-references/    ← 14 fiches de style de marque
```

---

## Architecture

```
.agents/skills/          ← Skills (16) — chargés automatiquement par Freebuff
  animejs/               ← Anime.js v4 (animations JS, timeline, SVG, scroll, draggable)
  gsap/
    gsap-core/           ← Tweens, easing, stagger, matchMedia
    gsap-timeline/       ← Sequençage multi-étapes
    gsap-scrolltrigger/  ← Animations au scroll (pin, scrub, horizontal)
    gsap-react/          ← useGSAP, gsap.context(), cleanup React
    gsap-frameworks/     ← Vue, Svelte, Nuxt — lifecycle & scoping
    gsap-plugins/        ← Flip, Draggable, SplitText, MorphSVG, DrawSVG, etc.
    gsap-utils/           ← gsap.utils (clamp, mapRange, snap, distribute…)
    gsap-performance/    ← 60fps, will-change, quickTo, ScrollTrigger perf
  copywriting/           ← Copywriting orienté conversion
  design-critique/       ← Cadre structuré pour retours design
  unslop/                ← Retire les marqueurs AI de l'écriture
  21st/                  ← CLI 21st.dev (recherche, install, publish, AI)
    21st-ai/             ← Sketch / itérer / récupérer code UI
    21st-cli-use/        ← Rechercher et installer composants/thèmes
    21st-registry/       ← Publier et gérer composants/thèmes sur 21st.dev
    21st-design-sync/    ← Publier le design du projet comme thème 21st
    21st-ui-build/       ← Construire/modifier UI production avec contexte
    21st-ui-explore/     ← Explorer plusieurs directions UI
    21st-ui-review/      ← Audit UI (accessibilité, responsive, consistance)

.style-references/       ← Style references (14) — contexte de marque
  ai-for-business.md
  apple.md / apple2.md
  ditto.md               ← Sunlit wildflower compliance atelier
  eleven-labs.md
  flying-papers.md
  hungry-tiger.md
  hyer-aviation.md
  jeton.md               ← Editorial fintech on warm marble
  leonardo.md
  mercury.md
  miranda.md
  steep.md
  structured.md
  superr.md
  wise.md                ← Deep moss with lime voltage

example-site-web/
  phantom/               ← Exemple : tokens.json + referance-theme.css
```

---

## Comment utiliser

### Un skill se déclenche automatiquement

Chaque dossier dans `.agents/skills/` contient un `SKILL.md` avec un frontmatter `---\nname: ...` et `description: ...`. Freebuff lit le `name` + `description` + `triggers` et charge le skill quand la demande correspond.

Exemple : quand tu dis *"animate this section with GSAP"* ou *"build a pricing page with 21st"*, le skill correspondant est activé.

### Une style reference se lit quand tu travailles sur cette marque

Les fichiers dans `.style-references/` sont des fiches de style de marque (couleurs, tokens, typographie, composants, do's/don'ts). Ils ne sont pas des skills — ce sont du contexte.

Pour les utiliser :
- Tu les mentionnes par nom quand tu demandes une implémentation (ex: *"concevez cette page dans le style Ditto"*).
- Ou tu les copies dans le projet concerné quand tu veux que Freebuff les utilise systématiquement sur ce projet.

### L'exemple Phantom

`example-site-web/phantom/` contient un exemple de tokens (`tokens.json`) et de thème CSS (`referance-theme.css`). Utilise-le comme modèle quand tu veux créer une nouvelle style reference ou extraire les tokens d'un site.

---

## Compter les skills inclus

| Catégorie | Nombre | Détail |
|-----------|--------|--------|
| Animation (Anime.js) | 1 | animejs + 2 références |
| Animation (GSAP) | 7 | core, timeline, scrolltrigger, react, frameworks, plugins, utils, performance |
| Copy & contenu | 2 | copywriting, unslop |
| Design | 1 | design-critique |
| UI / 21st.dev | 7 | ai, cli-use, registry, design-sync, ui-build, ui-explore, ui-review |
| **Total skills** | **16** | |
| **Total style references** | **14** | |

---

## Format d'un skill

Chaque skill respecte le format standard :

```markdown
---
name: nom-du-skill
description: >-
  Ce que fait le skill, quand l'utiliser, comment le déclencher.
---

# Titre du skill

Contenu du skill...
```

Le frontmatter `---\nname: ...` est obligatoire — c'est lui qui permet à Freebuff de reconnaître et charger le skill.

---

## Format d'une style reference

Une style reference contient :
- Une description de la marque / du style
- Une table de tokens (couleurs, typographie, spacing, radius, shadows)
- Une échelle typographique
- Des composants typiques avec leurs règles
- Des do's / don'ts
- Un guide rapide pour l'agent (quick color reference, prompts d'exemple)

Les fichiers les plus complets sont `ditto.md`, `wise.md`, `jeton.md`, `ai-for-business.md`.

---

## MCP

Le fichier `.mcp.json` configure les serveurs MCP. Actuellement :

```json
{
  "mcpServers": {
    "watermelon": {
      "command": "npx",
      "args": ["-y", "@watermelon-ui/mcp-server"]
    }
  }
}
```

Pour ajouter un serveur MCP :
1. Éditer `.mcp.json`
2. Ajouter un bloc dans `mcpServers`
3. Redémarrer l'éditeur / l'hôte MCP pour charger les nouveaux outils

---

## Archives (ne pas utiliser directement)

Les dossiers suivants sont les sources originales qui ont servi à créer la structure ci-dessus. Ils restent sur place en sauvegarde :

- `animejs-skills-main/` — source du skill animejs
- `gsap/` — source des skills GSAP
- `21st.dev/` — source des skills 21st + fichiers `agents/*.yaml`
- `example site web/` — archives d'exemples de sites

Tu peux supprimer ces archives une fois que tu as vérifié que tout fonctionne depuis `.agents/skills/`.

---

## Ajouter un nouveau skill

1. Créer `.agents/skills/<nom>/SKILL.md`
2. Ajouter le frontmatter `---\nname: <nom>\ndescription: ... ---`
3. Écrire le contenu du skill
4. Si le skill a des références : créer `.agents/skills/<nom>/references/`

Pour un style reference :
1. Créer `.style-references/<nom>.md`
2. Écrire la fiche (tokens, composants, do's/don'ts…)

---

Dernière mise à jour : Septembre 2026
