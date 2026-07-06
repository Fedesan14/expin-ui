export const theme = {
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
  },
  fonts: {
    body: "'Inter', 'Segoe UI', system-ui, sans-serif",
    heading: "'Inter', 'Segoe UI', system-ui, sans-serif",
    mono: "'Fira Code', 'Cascadia Code', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    soft: '0 16px 40px rgba(24, 32, 26, 0.08)',
  },
} as const

export type AppTheme = typeof theme
