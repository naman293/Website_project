# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Ching Chong Restaurant (`artifacts/ching-chong`)
- **Type**: React + Vite (react-vite), static frontend
- **Preview path**: `/` (root)
- **Description**: High-conversion, SEO-optimized landing page for Ching Chong Indo-Chinese restaurant in Jaipur
- **Features**:
  - Dark neon brand theme (red #E63946, orange #F77F00, yellow #FCCA46 on near-black backgrounds)
  - Bebas Neue display font + Inter body font
  - Framer Motion scroll animations and parallax hero
  - Full menu (veg/non-veg/combo) with category filter tabs
  - Veg/Non-veg indicators (Indian food labeling standard)
  - Sticky mobile Call Now bar
  - Google Maps embed (Rajapark, Jaipur)
  - No user accounts, no cart, no online ordering — call-only
  - SEO: title, meta description, Open Graph, Twitter Cards, JSON-LD LocalBusiness schema, sitemap.xml, robots.txt

### API Server (`artifacts/api-server`)
- **Type**: Express 5 REST API
- **Preview path**: `/api`
- **Description**: Shared backend API server (currently minimal — only health check)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
