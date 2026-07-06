# Prompt para generar la base UI/UX de Expin

Quiero que diseñes y generes una base UI/UX reutilizable para una aplicación llamada Expin.

## Contexto del producto

Expin es una SuperApp financiera mobile-first. Sus módulos principales serán:

- Historial de gastos: registro de ingresos y egresos, categorías y subcategorías.
- División de gastos: eventos, gastos compartidos y participantes.
- Auth: login, registro, sesión y futuras reglas de permisos.

La app es una PWA, por lo que debe sentirse como una aplicación móvil instalada, con buena ergonomía táctil, soporte para safe areas y navegación simple.

## Stack y restricciones técnicas

- React + Vite + TypeScript.
- `styled-components` para todos los estilos. No usar archivos `.css`.
- `react-router-dom` para navegación.
- `react-hook-form` + Yup para formularios.
- La arquitectura usa vertical slicing bajo `src/slices`.
- Los componentes reutilizables globales deben vivir en `src/slices/common/components`.
- Los tokens visuales deben vivir en `src/app/theme/theme.ts`.
- Los estilos globales deben vivir en `src/app/theme/GlobalStyles.ts`.
- Diseñar mobile-first y luego adaptar a desktop con media queries `min-width`.
- Usar tokens de tema para colores, spacing, tipografías, radii y sombras.
- Las cards deben usar `8px` de border-radius salvo que haya una razón clara.
- Evitar una interfaz monocromática. Debe sentirse limpia, práctica y financiera, no decorativa ni de landing page.

## Rutas actuales y navegación

- `/` y `/login`: login.
- `/registro`: signup.
- `/home`: pantalla principal.
- `/historial`: historial de gastos.
- `/eventos`: eventos para dividir gastos.
- `/auth`: redirige a login.

Los nombres visibles deben estar en español cuando correspondan.

## Estilo visual esperado

Quiero una identidad limpia, moderna y financiera, con buen contraste y sensación de producto real.
Debe priorizar claridad, acciones rápidas, legibilidad y confianza.

Evitar estilos excesivamente decorativos, gradientes protagonistas, glassmorphism exagerado o estética de landing page.

Puedes partir de estos tokens actuales, pero puedes proponer mejoras si mantienen la identidad:

```ts
colors: {
  background: '#f7f8f5',
  surface: '#ffffff',
  surfaceAlt: '#eef4ef',
  text: '#18201a',
  textMuted: '#657068',
  border: '#d9e0d9',
  primary: '#216869',
  primaryHover: '#1a5354',
  accent: '#d9654f',
  success: '#2f7d59',
  warning: '#b8841a',
  danger: '#b43c3c',
  focus: '#2b6cb0',
}

fonts: {
  body: "'Inter', 'Segoe UI', system-ui, sans-serif",
  heading: "'Inter', 'Segoe UI', system-ui, sans-serif",
}

radii: {
  sm: '4px',
  md: '8px',
  lg: '12px',
}
```

Necesito que generes una base de design system/componentes reutilizables, no una landing page.

## Componentes a generar

### 1. Theme y estilos base

Generar:

- `theme.ts` con tokens completos: colores, tipografías, tamaños, pesos, spacing, radii, shadows, z-index, breakpoints.
- `GlobalStyles.ts` con reset base, tipografía, background, estilos de body/root, selección de texto, focus visible, inputs/buttons heredando font y safe-area friendly.

Requisitos:

- Mantener soporte mobile-first.
- Definir estados: default, hover, focus, active, disabled, error, success y loading.

### 2. Layout base

Generar:

- `AppShell`
- `Header`
- `BottomNavigation`
- `Page`
- `PageHeader`
- `Section`
- `Stack`
- `Inline`

El layout debe funcionar en PWA mobile. En mobile debe priorizar bottom nav; en desktop puede usar header/nav superior o layout más ancho.

El contenido debe respetar safe-area bottom para no quedar tapado por navegación inferior.

### 3. Navegación

Generar:

- Navbar superior desktop con marca Expin y rutas principales.
- Bottom navigation mobile con rutas:
  - Home
  - Historial
  - Eventos
  - Perfil o Cuenta

Requisitos:

- Estados activo/inactivo claros.
- Iconos simples y consistentes. Si usas una librería, asumir `lucide-react`.
- El botón activo no debe desplazar el layout.
- Touch targets mínimos de `44px`.

### 4. Formularios

Generar componentes reutilizables compatibles con `react-hook-form`:

- `TextInput`
- `PasswordInput`
- `CurrencyInput`
- `NumberInput`
- `Select`
- `Textarea`
- `Checkbox`
- `Switch`
- `RadioGroup`
- `DateInput`
- `FormField`
- `FieldLabel`
- `FieldHint`
- `FieldError`

Los campos deben soportar:

- label
- placeholder
- hint
- error
- disabled
- required
- icono inicial/final
- loading si aplica
- tamaños cómodos para touch
- buena accesibilidad con `aria-invalid`, `aria-describedby`, `id`, `htmlFor`

El `CurrencyInput` debe estar pensado para montos de ingresos/gastos.

### 5. Botones

Generar:

- `Button`
- `IconButton`
- `LinkButton`
- `FloatingActionButton`

Variantes:

- primary
- secondary
- tertiary/ghost
- danger
- success
- subtle

Tamaños:

- sm
- md
- lg

Estados:

- loading
- disabled
- fullWidth
- iconBefore
- iconAfter

### 6. Feedback

Generar:

- `Alert`
- `Toast`
- `EmptyState`
- `Skeleton`
- `Spinner`
- `Badge`
- `StatusPill`
- `InlineMessage`

Deben servir para errores de auth, estados de carga de gastos/eventos, éxito de creación y pantallas vacías.

### 7. Overlays

Generar:

- `Modal`
- `ConfirmDialog`
- `BottomSheet`
- `Drawer`
- `ActionSheet`

Requisitos:

- Accesibles.
- Cerrar con overlay y Escape.
- Header, body y footer composables.
- En mobile, preferir bottom sheet para acciones contextuales.
- En desktop, modal centrado con ancho máximo.
- Manejar scroll interno sin romper la página.
- Respetar safe-area.

### 8. Componentes financieros base

Generar componentes reutilizables orientados al dominio:

- `MoneyAmount`: mostrar ingresos/egresos con color y signo.
- `TransactionItem`: item de movimiento con categoría, fecha, monto y descripción.
- `CategoryChip`: chip de categoría/subcategoría.
- `BalanceSummary`: resumen de saldo, ingresos y egresos.
- `ExpenseSplitParticipant`: participante con avatar/iniciales, monto pagado o adeudado.
- `EventCard`: card para evento de gastos compartidos.
- `QuickActionGrid`: acciones rápidas para registrar gasto, ingreso o crear evento.

### 9. Superficies y estructura visual

Generar:

- `Card`
- `List`
- `ListItem`
- `Divider`
- `Tabs`
- `SegmentedControl`
- `Toolbar`
- `SearchInput`
- `FilterChip`

Estos componentes deben ser sobrios, compactos y útiles para una app financiera.

### 10. Pantallas demo para validar el sistema

Crear ejemplos de composición, no landing page:

- Login mobile.
- Signup mobile.
- Home dashboard con resumen financiero y acciones rápidas.
- Historial de gastos con filtros, búsqueda y lista.
- Eventos con cards y estado vacío.
- Modal de confirmación.
- Bottom sheet para agregar gasto rápido.

## Formato de entrega esperado

- Generar código React + TypeScript.
- Usar `styled-components`.
- Separar cada componente en:
  - `ComponentName.tsx`
  - `ComponentName.styles.ts`
  - `index.ts`
- Usar `import * as S from './ComponentName.styles'` cuando haya varios styled exports.
- Usar props tipadas.
- Evitar lógica de API o Redux. Esto es solamente design system/base UI.
- No duplicar componentes feature-specific dentro de `common` salvo que sean verdaderamente reutilizables.
- No crear una landing page.
- No usar datos reales; usar mocks mínimos para demos.
- Mantener todo en español para copy visible.

## Estructura sugerida

```txt
src/
  app/
    theme/
      theme.ts
      GlobalStyles.ts
      styled.d.ts
  slices/
    common/
      components/
        Button/
        IconButton/
        TextInput/
        FormField/
        Modal/
        BottomSheet/
        AppShell/
        Header/
        BottomNavigation/
        Card/
        Badge/
        Alert/
        Toast/
        EmptyState/
        MoneyAmount/
        TransactionItem/
        BalanceSummary/
        EventCard/
        QuickActionGrid/
```

## Prioridades de diseño

- Mobile-first real.
- Accesibilidad.
- Consistencia visual.
- Componentes reutilizables.
- Buen soporte para formularios.
- Estados completos.
- Navegación clara.
- Producto financiero práctico, no decorativo.
- Código listo para integrarse en una app React/Vite existente.
