import styled, { css } from "styled-components"
import type { DefaultTheme } from "styled-components"

export type BadgeTone =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
export type BadgeVariant = "soft" | "solid" | "outline"

const toneColors = (theme: DefaultTheme) => ({
  neutral: { fg: theme.colors.text, bg: theme.colors.surfaceAlt, solid: theme.colors.textMuted },
  primary: { fg: theme.colors.primaryHover, bg: theme.colors.primarySoft, solid: theme.colors.primary },
  accent: { fg: theme.colors.accentHover, bg: theme.colors.accentSoft, solid: theme.colors.accent },
  success: { fg: theme.colors.success, bg: theme.colors.successSoft, solid: theme.colors.success },
  warning: { fg: theme.colors.warning, bg: theme.colors.warningSoft, solid: theme.colors.warning },
  danger: { fg: theme.colors.danger, bg: theme.colors.dangerSoft, solid: theme.colors.danger },
})

export const Root = styled.span<{ $tone: BadgeTone; $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["1"]};
  padding: 2px ${({ theme }) => theme.space["2"]};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.4;
  white-space: nowrap;
  border: 1px solid transparent;

  ${({ theme, $tone, $variant }) => {
    const c = toneColors(theme)[$tone]
    if ($variant === "solid") {
      return css`
        background: ${c.solid};
        color: ${theme.colors.textInverse};
      `
    }
    if ($variant === "outline") {
      return css`
        background: transparent;
        color: ${c.fg};
        border-color: ${c.fg};
      `
    }
    return css`
      background: ${c.bg};
      color: ${c.fg};
    `
  }}
`
