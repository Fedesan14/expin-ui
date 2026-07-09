import styled from "styled-components"
import type { DefaultTheme } from "styled-components"

export type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "income"
  | "expense"
  | "transfer"
  | "pending"
  | "positiveBalance"
  | "negativeBalance"

export const toneColor = (theme: DefaultTheme, tone: StatusTone) => {
  const map = {
    neutral: theme.colors.roles.onSurfaceVariant,
    success: theme.colors.roles.tertiary,
    warning: theme.colors.roles.secondary,
    danger: theme.colors.roles.error,
    info: theme.colors.roles.primary,
    income: theme.colors.domain.income,
    expense: theme.colors.domain.expense,
    transfer: theme.colors.domain.transfer,
    pending: theme.colors.domain.pending,
    positiveBalance: theme.colors.domain.positiveBalance,
    negativeBalance: theme.colors.domain.negativeBalance,
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
