import styled from "styled-components"
import type { DefaultTheme } from "styled-components"

export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info"

export const toneColor = (theme: DefaultTheme, tone: StatusTone) => {
  const map = {
    neutral: theme.colors.textMuted,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    info: theme.colors.focus,
  }
  return map[tone]
}

export const Root = styled.span<{ $tone: StatusTone }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["2"]};
  padding: 4px ${({ theme }) => theme.space["3"]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`

export const Dot = styled.span<{ $tone: StatusTone }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $tone }) => toneColor(theme, $tone)};
  flex-shrink: 0;
`
