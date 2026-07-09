import styled from "styled-components"
import type { DefaultTheme } from "styled-components"

export type AlertTone = "info" | "success" | "warning" | "danger"

const toneStyles = (theme: DefaultTheme, tone: AlertTone) => {
  const map = {
    info: {
      bg: theme.colors.roles.primaryContainer,
      fg: theme.colors.roles.onPrimaryContainer,
      border: theme.colors.roles.primary,
    },
    success: {
      bg: theme.colors.roles.tertiaryContainer,
      fg: theme.colors.roles.onTertiaryContainer,
      border: theme.colors.roles.tertiary,
    },
    warning: {
      bg: theme.colors.roles.secondaryContainer,
      fg: theme.colors.roles.onSecondaryContainer,
      border: theme.colors.roles.secondary,
    },
    danger: {
      bg: theme.colors.roles.errorContainer,
      fg: theme.colors.roles.onErrorContainer,
      border: theme.colors.roles.error,
    },
  }
  return map[tone]
}

export const Root = styled.div<{ $tone: AlertTone }>`
  display: flex;
  gap: ${({ theme }) => theme.space["3"]};
  padding: ${({ theme }) => theme.space["3"]} ${({ theme }) => theme.space["4"]};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $tone }) => toneStyles(theme, $tone).bg};
  border-left: 3px solid ${({ theme, $tone }) => toneStyles(theme, $tone).border};
  color: ${({ theme }) => theme.colors.text};
`

export const IconWrap = styled.div<{ $tone: AlertTone }>`
  color: ${({ theme, $tone }) => toneStyles(theme, $tone).fg};
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 1px;
`

export const IconGlyph = styled.span`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
`

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`

export const Title = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.snug};
`

export const Description = styled.p`
  margin: ${({ theme }) => theme.space["1"]} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`

export const CloseWrap = styled.div`
  flex-shrink: 0;
  margin: -4px -4px 0 0;
`
