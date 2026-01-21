  # Repository Guidelines

  ## Project Structure & Module Organization
  - `src/app/` holds Next.js App Router entries; `layout.tsx` defines the global shell
  and `page.tsx` renders the homepage.
  - `src/components/` and `src/utils/` are reserved for shared UI pieces and helpers—add
  new modules here to keep pages focused.
  - `public/` contains static assets referenced by absolute paths (e.g., `/vercel.svg`).
  - Global styling lives in `src/app/globals.css`, where Tailwind tokens configure light
  and dark themes.

  ## Build, Test, and Development Commands
  - `npm run dev` – starts the Turbopack development server at `http://localhost:3000`
  with hot reload.
  - `npm run build` – creates the optimized production bundle using Turbopack.
  - `npm run start` – serves the production build locally (run `npm run build` first).
  - `npm run lint` – runs ESLint with the `next/core-web-vitals` configuration.

  ## Coding Style & Naming Conventions
  - Use TypeScript (`.ts`/`.tsx`) with strict mode; prefer functional React components.
  - Lean on Tailwind utility classes for styling and pre-built components in @src/components/ui; add custom tokens in `globals.css`
  only when utilities fall short.
  - PascalCase components (`HeroSection.tsx`), camelCase hooks/helpers
  (`useCounter.ts`), and kebab-case asset filenames.
  - Keep JSX indented with 2 spaces and rely on Prettier defaults or editor format-
  on-save.

  ## Commit & Pull Request Guidelines
  - Follow conventional commits (`feat: add hero CTA`, `fix: correct footer link`) to
  keep history readable.
  - Keep commits focused; separate refactors from feature additions.
  - Pull requests should describe the change, link related issues, list executed checks
  (`npm run lint`, manual QA), and include screenshots or GIFs for UI updates.
