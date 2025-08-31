# Utilify Monorepo

This repository is a pnpm workspace containing:

- `apps/web` – Next.js 14 application using TypeScript, Tailwind CSS, and shadcn/ui.
- `apps/worker` – Node 20 TypeScript worker.

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the web app:

   ```bash
   pnpm dev
   ```

3. Run the worker:

   ```bash
   pnpm worker
   ```

## Features

- Tailwind theme: background zinc-50, surface white, borders zinc-200, text zinc-900/600, primary blue-600.
- Components built with shadcn/ui and lucide-react.
- TinyWow-style pages with generous spacing and responsive grids.
