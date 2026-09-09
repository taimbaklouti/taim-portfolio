# MCP Config

Couche **connexion du serveur MCP au client IA**. Elle ne change rien au site pour les visiteurs. Elle configure comment l'IA lance et contacte le serveur MCP.

Dans ce projet, la configuration MCP se trouve dans `.mcp.json` à la racine.

## Ce que cet élément fait

- Décrire la structure de `.mcp.json`.
- Expliquer comment ajouter un serveur MCP (ici `motion-dev-mcp`).
- Préciser comment choisir entre `npx` et `node` local.
- Rappeler les pièges (chemins absolus, redémarrage du client IA, variables d'environnement).

## Ce que cet élément NE fait PAS

- Installer le serveur MCP (cela dépend du dépôt, voir `motion-mcp/README.md`).
- Lancer le serveur MCP à la main.
- Modifier le comportement frontend.

## Fichier concerné

- `.mcp.json` à la racine du projet.

Ce fichier est lu par le client IA pour déterminer quels serveurs MCP lancer.

## Structure de base

```json
{
  "mcpServers": {
    "nom-du-serveur": {
      "command": "npx",
      "args": ["-y", "@exemple/mcp-server"]
    }
  }
}
```

Chaque entrée dans `mcpServers` est un serveur MCP nommé.

Champs principaux :

| Champ | Type | Rôle |
|---|---|---|
| `command` | `string` | Commande lançant le serveur. Souvent `npx` ou `node`. |
| `args` | `string[]` | Arguments de la commande. |
| `env` | `object` | Variables d'environnement du serveur (si nécessaire). |

## Ajouter `motion-dev-mcp`

Le projet a déjà un serveur MCP existant (`watermelon`). Pour ajouter `motion-dev-mcp`, on ajoute une nouvelle entrée dans `mcpServers`.

### Option A : via npx (le plus simple)

```json
{
  "mcpServers": {
    "watermelon": {
      "command": "npx",
      "args": ["-y", "@watermelon-ui/mcp-server"]
    },
    "motion-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@motion-dev/mcp-server"]
    }
  }
}
```

Remarque :

- Remplace `@motion-dev/mcp-server` par le nom exact du package MCP si celui-ci est publié sous un autre nom.
- Cette option ne demande pas de build local. Le serveur MCP est récupéré via npx au lancement.

### Option B : via le fichier build local

Si tu as cloné le dépôt `motion-dev-mcp` et que tu veux l'utiliser depuis une copie locale :

```json
{
  "mcpServers": {
    "watermelon": {
      "command": "npx",
      "args": ["-y", "@watermelon-ui/mcp-server"]
    },
    "motion-dev-mcp": {
      "command": "node",
      "args": ["/chemin/absolu/vers/motion-dev-mcp/build/index.js"]
    }
  }
}
```

Remarques :

- Le chemin doit être absolu. Les chemins relatifs dans `.mcp.json` sont source de bugs car le cwd du client IA n'est pas garanti.
- Le fichier pointé dépend de la structure réelle du dépôt. Vérifie `package.json` du dépôt (`main`, `exports`, scripts) pour identifier le bon point d'entrée.
- Si le projet utilise un script `build`, l'entrée peut être `/chemin/absolu/vers/motion-dev-mcp/build/index.js`.
- Sinon, essaie le point d'entrée `src/index.js` si le dépôt ne build pas.

### Si le serveur MCP a besoin d'env

```json
{
  "mcpServers": {
    "motion-dev-mcp": {
      "command": "node",
      "args": ["/chemin/absolu/vers/motion-dev-mcp/build/index.js"],
      "env": {
        "MOTION_API_KEY": "ta_cle_ici"
      }
    }
  }
}
```

Seules les variables attendues par le serveur MCP doivent être ajoutées.

## Règles pour que l'IA ne soit pas confuse

### 1. Un serveur MCP = une entrée unique dans `mcpServers`

Ne pas dupliquer le même serveur sous des noms différents.

### 2. Un seul fichier `.mcp.json`

Si l'IA te pose des questions sur la config MCP, se référer à `.mcp.json` et à ce README, pas à des fichiers éparpillés.

### 3. `npx` vs `node`

- `npx` est pratique si le package MCP est publié.
- `node` est à privilégier si tu héberges toi-même le dépôt MCP localement.
- Ne pas mélanger les deux sans raison.

### 4. Chemins absolus pour les MCP locaux

Si le MCP est lancé depuis un éditeur qui ne démarre pas dans le dossier du projet, un chemin relatif peut échouer silencieusement. Préférer un chemin absolu.

### 5. Redémarrer le client IA après modification

Après avoir modifié `.mcp.json`, redémarrer le client IA / l'éditeur pour que le serveur MCP soit chargé.

### 6. Environnement

Si le MCP échoue sans message clair, vérifier :

- si une variable d'environnement est nécessaire,
- si le chemin pointe vers un fichier existant,
- si Node.js est en version compatible (Node 18+ pour beaucoup de MCP).

## Debug rapide

Vérifier que le fichier est valide :

```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('.mcp.json')))"
```

Vérifier Node :

```bash
node -v
```

Si le MCP doit être lancé localement :

```bash
node /chemin/absolu/vers/motion-dev-mcp/build/index.js
```

Si le serveur MCP est lancé manuellement pour le test, assure-toi que son stdin/stdout respecte le protocole MCP attendu par le client IA.

## Voir aussi

- `motion-mcp/README.md` — ce que fait le serveur MCP
- `lenis-core/README.md` — Lenis
- `.mcp.json` — fichier réel à modifier
