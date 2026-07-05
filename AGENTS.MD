# Expin UI Agent Guide

This file is the living project contract for agents working in `expin-ui`.
Every session that adds, removes, or changes a durable convention must update this file before finishing.

## Product Context

Expin is a SuperApp with several finance-oriented modules. Current planned modules:

- Expense history: users register monetary income and expenses, assign categories, and support nested categories such as `Comida` with subcategories like `Carniceria` or `Verduleria`.
- Expense splitter: users create events, register expenses inside each event, and later split them between participants.
- Auth: user identity, session, and future permission boundaries.
- Expin is a Progressive Web App and must be designed mobile-first.

## Technical Stack

- React with Vite and TypeScript.
- `react-router-dom` owns client-side routing.
- PWA metadata lives in `public/manifest.webmanifest`.
- The app registers `public/service-worker.js` from `src/app/pwa/registerServiceWorker.ts` outside development.
- RTK Query is the global remote-state layer and HTTP client.
- `styled-components` owns component styling and the application theme.
- Shared visual tokens live in `src/app/theme/theme.ts`.
- Global browser resets and base typography live in `src/app/theme/GlobalStyles.ts`.
- Redux store setup lives in `src/app/store/store.ts`.
- RTK Query base API lives in `src/app/api/baseApi.ts`.

## Architecture

Use vertical slicing under `src/slices`.

```text
src/
  app/
    api/
    router/
    store/
    theme/
  slices/
    common/
      components/
    auth/
      api/
      model/
    events/
      api/
      model/
    expense-history/
      api/
      model/
```

Rules:

- `common` is only for reusable application pieces that are not owned by a business feature.
- Feature slices own their API endpoints, domain types, hooks, pages, and components when those pieces are specific to that feature.
- Feature pages live inside their owning slice under `pages/`.
- Prefer importing across slices through explicit public exports when a slice grows enough to need them.
- Do not place feature-specific UI or API contracts in `common`.
- Keep RTK Query endpoint injection inside the feature slice, using `baseApi.injectEndpoints`.
- Use typed contracts in each slice's `model` folder before wiring API endpoints.

## RTK Query

- Use `baseApi` from `src/app/api/baseApi.ts` for all HTTP endpoints.
- Configure backend URL with `VITE_API_BASE_URL`; the local fallback is `http://localhost:8080`.
- Add tag types in `baseApi` when a new cache domain is introduced.
- Prefer server state in RTK Query over duplicating remote data in local Redux slices.
- Add local Redux slices only for client-only state that does not belong to a component.

## Routing

- Route definitions live in `src/app/router/routes.tsx`.
- Use `react-router-dom` primitives (`RouterProvider`, `createBrowserRouter`, `Link`, `NavLink`, `Outlet`) for navigation.
- `AppShell` is the shared route layout and renders child pages through `Outlet`.
- Each feature route should render a page owned by that feature slice.
- Keep route paths in Spanish when they are user-facing, for example `/historial` and `/eventos`.

## Styling

- Use `styled-components`; do not add new `.css` files for component styling.
- Design mobile-first: default styles target small touch screens, then expand with `min-width` media queries.
- Keep touch ergonomics, safe-area insets, and standalone PWA display in mind for shared layout components.
- Use theme tokens for colors, spacing, typography, radii, and shadows.
- Keep reusable styled primitives near their component.
- Cards should use a radius of `8px` unless a local design reason is documented.
- Avoid one-color interfaces; Expin should feel clean, practical, and finance-oriented rather than decorative.

## Agent Workflow

- Read this file before making repo changes.
- Make changes in the smallest slice that owns the behavior.
- If a new durable convention is introduced, update this file in the same session.
- If a feature is added, document its slice ownership and any API contracts that future agents must preserve.
- Run available validation commands before finishing when practical, and report any command that could not be run.

## Current Base

- `src/main.tsx` mounts `AppProviders`.
- `AppProviders` wraps the app with Redux Provider, ThemeProvider, and GlobalStyles.
- `src/main.tsx` registers the service worker outside development.
- `index.html` links the web app manifest and mobile app metadata.
- `App.tsx` renders `RouterProvider` with the route tree from `src/app/router/routes.tsx`.
- Initial routes exist for `/`, `/historial`, `/eventos`, and `/auth`.
- `auth`, `events`, and `expense-history` have initial RTK Query endpoint files and model types.
- The home page lives in `src/slices/common/pages/HomePage`.
