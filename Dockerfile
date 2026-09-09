# ===== Development Stage =====
FROM node:22-alpine AS dev

WORKDIR /app

# Enable pnpm via Corepack (bundled with Node 22+)
RUN corepack enable && corepack prepare pnpm@latest-11 --activate

# Copy dependency manifests first (leveraging Docker layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (dev dependencies included — we're in dev mode)
RUN pnpm install --frozen-lockfile

# Expose the Next.js dev server port
EXPOSE 3000

# Start the dev server with Turbopack, binding to all interfaces so Docker
# port-forwarding can reach it from the host.
CMD ["pnpm", "exec", "next", "dev", "--turbopack", "-H", "0.0.0.0"]
