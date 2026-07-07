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
- `react-hook-form` owns form state and submit handling.
- Yup schemas, connected through `@hookform/resolvers`, own form validation.
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
      icons/
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
- Keep features highly cohesive: pages, hooks, components, and helpers should own one clear behavior. Split flows into separate routes/pages when their logic diverges, such as login and signup.
- Use `react-hook-form` with Yup schemas for forms; keep schemas in the owning feature slice, usually under `model/`.
- Prefer importing across slices through explicit public exports when a slice grows enough to need them.
- Do not place feature-specific UI or API contracts in `common`.
- Keep RTK Query endpoint injection inside the feature slice, using `baseApi.injectEndpoints`.
- Use typed contracts in each slice's `model` folder before wiring API endpoints.

## RTK Query

- Use `baseApi` from `src/app/api/baseApi.ts` for all HTTP endpoints.
- Configure backend URL with `VITE_API_BASE_URL`; the local fallback is `http://localhost:8080`.
- Add tag types in `baseApi` when a new cache domain is introduced.
- `baseApi` reads `state.auth.sessionToken` and sends `Authorization: Bearer <sessionToken>` for private endpoints; public auth endpoints must opt out by endpoint name when needed.
- Prefer server state in RTK Query over duplicating remote data in local Redux slices.
- Add local Redux slices only for client-only state that does not belong to a component.

## Auth

- The auth feature is owned by `src/slices/auth`.
- Signup uses `POST /auth/signup` with JSON body `{ username, password, email }`.
- Login uses `POST /auth/login` without a body and with `Authorization: Basic <base64(identifier:password)>`; `identifier` can be username or email.
- Successful login returns `sessionToken`, `sessionTokenExpiresAt`, `refreshToken`, and `refreshTokenExpiresAt`.
- Store auth tokens in the local `auth` Redux slice through `src/slices/auth/model/authSlice.ts`; do not duplicate the token in RTK Query cache state.
- Auth state is hydrated from `localStorage` through `src/slices/auth/model/authStorage.ts` and synchronized from the Redux store so sessions survive page refreshes while valid.
- After login, private backend calls should receive `Authorization: Bearer <sessionToken>` from `baseApi`.
- Signup responses must be typed without `password`.
- Login and signup must remain separate pages with separate route-level logic: `LoginPage` owns login and `SignupPage` owns registration.
- Auth form validation schemas live in `src/slices/auth/model/schemas.ts`.
- Shared auth reads should go through `src/slices/auth/model/useAuth.ts` instead of repeating direct Redux selector plus token-validity logic.
- After a successful login, navigate to `/home`.

## Routing

- Route definitions live in `src/app/router/routes.tsx`.
- Use `react-router-dom` primitives (`RouterProvider`, `createBrowserRouter`, `Link`, `NavLink`, `Outlet`) for navigation.
- Public auth routes render through `PublicLayout`; private module routes render through `PrivateLayout`.
- `PrivateLayout` owns shared module navigation, the logout action, and renders child pages through `Outlet`; logged-out auth pages should not show module navigation.
- Public and private route access is enforced with route guards in `src/app/router/RouteGuards.tsx`: unauthenticated users redirect to `/login`, and authenticated users redirect away from public auth pages to `/home`.
- Each feature route should render a page owned by that feature slice.
- The root path `/` should render the login flow directly, not a generic landing/home page.
- Keep route paths in Spanish when they are user-facing, for example `/historial`, `/eventos`, and `/registro`.

## Styling

- Use `styled-components`; do not add new `.css` files for component styling.
- Design mobile-first: default styles target small touch screens, then expand with `min-width` media queries.
- Keep touch ergonomics, safe-area insets, and standalone PWA display in mind for shared layout components.
- Use theme tokens for colors, spacing, typography, radii, and shadows.
- Keep reusable styled primitives near their component.
- Reusable design-system primitives such as buttons, inputs, form fields, layout helpers, feedback components, overlays, badges, and navigation pieces live under `src/slices/common/components`; adapt them there instead of recreating one-off versions inside feature slices.
- Shared SVG icon components live under `src/slices/common/icons`; add icons there instead of depending on external icon libraries or inline SVG copies in feature code.
- Cards should use a radius of `8px` unless a local design reason is documented.
- Avoid one-color interfaces; Expin should feel clean, practical, and finance-oriented rather than decorative.

## Agent Workflow

- Read this file before making repo changes.
- Make changes in the smallest slice that owns the behavior.
- If a new durable convention is introduced, update this file in the same session.
- If a feature is added, document its slice ownership and any API contracts that future agents must preserve.
- Run available validation commands before finishing when practical, and report any command that could not be run.
- Do not start the Vite dev server or otherwise try to launch the project; the user keeps it running on port `5173`.
- Production Docker deployment uses the root `Dockerfile`: build with Node, serve the Vite `dist` output with nginx on port `80`, and pass `VITE_API_BASE_URL` as a Docker build argument when the deployed backend URL differs from the local fallback.

## Current Base

- `src/main.tsx` mounts `AppProviders`.
- `AppProviders` wraps the app with Redux Provider, ThemeProvider, and GlobalStyles.
- `src/main.tsx` registers the service worker outside development.
- `index.html` links the web app manifest and mobile app metadata.
- `App.tsx` renders `RouterProvider` with the route tree from `src/app/router/routes.tsx`.
- `src/app/router/routes.tsx` separates public auth routes from private module routes with `PublicRoute`/`PublicLayout` and `PrivateRoute`/`PrivateLayout`.
- `src/app/theme/theme.ts` includes compatibility tokens for the initial app (`spacing`, `fontSizes.xxl`, `shadows.soft`) plus expanded design-system tokens (`space`, `fontWeights`, `lineHeights`, `sizes`, `zIndex`, `breakpoints`, `transitions`, and `media` helpers).
- Shared reusable UI primitives exist under `src/slices/common/components`, including button, text input, password input, form field, layout, navigation, feedback, overlay, badge, spinner, and status components.
- Cross-cutting transient notifications use the shared Toast provider and `useToast` hook from `src/slices/common/components/Toast`; mount stays in `AppProviders`.
- Shared reusable SVG icons exist under `src/slices/common/icons`.
- Current auth pages use the shared `FormField`, `TextInput`, `PasswordInput`, `Button`, `LinkButton`, `Alert`, and `Page` primitives instead of page-local input/button styling.
- Initial routes exist for `/`, `/login`, `/registro`, `/home`, `/historial`, `/eventos`, and `/auth`.
- `auth`, `events`, and `expense-history` have RTK Query endpoint files and model types.
- `/` and `/login` render `LoginPage`; `/registro` renders `SignupPage`; `/auth` redirects to `/login`.
- `/home` renders the home page from `src/slices/common/pages/HomePage`.
- The `events` slice owns the shared-expense event workflow. It connects private backend endpoints under `/events` and `/events/{eventId}/expenses`, including list, create, detail, update, and delete operations for both events and event expenses.
- Events UI routes are `/eventos`, `/eventos/nuevo`, `/eventos/:eventId`, `/eventos/:eventId/editar`, `/eventos/:eventId/gastos/nuevo`, and `/eventos/:eventId/gastos/:expenseId/editar`.
- Event invitation links from the backend use `/events/invite/:inviteToken`; the private frontend route joins through `POST /events/invite/{inviteToken}` without a body, then navigates to `/eventos/:eventId`.
- Events v1 supports adding guest participants by `guestName` in event forms. Existing participants with `userId` are preserved during event edits, but the UI does not implement user search yet.
- Event settlement/debt calculation is intentionally not represented in the frontend until the backend exposes an explicit endpoint.
