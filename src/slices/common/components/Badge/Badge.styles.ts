import styled, { css } from "styled-components"
import type { DefaultTheme } from "styled-components"

export type BadgeTone =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "income"
  | "expense"
  | "transfer"
  | "pending"
  | "positiveBalance"
  | "negativeBalance"
export type BadgeVariant = "soft" | "solid" | "outline"

const toneColors = (theme: DefaultTheme) => ({
  neutral: {
    fg: theme.colors.roles.onSurfaceVariant,
    bg: theme.colors.roles.surfaceContainer,
    solid: theme.colors.roles.secondary,
    onSolid: theme.colors.roles.onSecondary,
  },
  primary: {
    fg: theme.colors.roles.onPrimaryContainer,
    bg: theme.colors.roles.primaryContainer,
    solid: theme.colors.roles.primary,
    onSolid: theme.colors.roles.onPrimary,
  },
  accent: {
    fg: theme.colors.roles.onTertiaryContainer,
    bg: theme.colors.roles.tertiaryContainer,
    solid: theme.colors.roles.tertiary,
    onSolid: theme.colors.roles.onTertiary,
  },
  success: {
    fg: theme.colors.roles.onTertiaryContainer,
    bg: theme.colors.roles.tertiaryContainer,
    solid: theme.colors.roles.tertiary,
    onSolid: theme.colors.roles.onTertiary,
  },
  warning: {
    fg: theme.colors.roles.onSecondaryContainer,
    bg: theme.colors.roles.secondaryContainer,
    solid: theme.colors.roles.secondary,
    onSolid: theme.colors.roles.onSecondary,
  },
  danger: {
    fg: theme.colors.roles.onErrorContainer,
    bg: theme.colors.roles.errorContainer,
    solid: theme.colors.roles.error,
    onSolid: theme.colors.roles.onError,
  },
  income: {
    fg: theme.colors.domain.onIncomeContainer,
    bg: theme.colors.domain.incomeContainer,
    solid: theme.colors.domain.income,
    onSolid: theme.colors.domain.onIncome,
  },
  expense: {
    fg: theme.colors.domain.onExpenseContainer,
    bg: theme.colors.domain.expenseContainer,
    solid: theme.colors.domain.expense,
    onSolid: theme.colors.domain.onExpense,
  },
  transfer: {
    fg: theme.colors.domain.onTransferContainer,
    bg: theme.colors.domain.transferContainer,
    solid: theme.colors.domain.transfer,
    onSolid: theme.colors.domain.onTransfer,
  },
  pending: {
    fg: theme.colors.domain.onPendingContainer,
    bg: theme.colors.domain.pendingContainer,
    solid: theme.colors.domain.pending,
    onSolid: theme.colors.domain.onPending,
  },
  positiveBalance: {
    fg: theme.colors.domain.onPositiveBalanceContainer,
    bg: theme.colors.domain.positiveBalanceContainer,
    solid: theme.colors.domain.positiveBalance,
    onSolid: theme.colors.domain.onPositiveBalance,
  },
  negativeBalance: {
    fg: theme.colors.domain.onNegativeBalanceContainer,
    bg: theme.colors.domain.negativeBalanceContainer,
    solid: theme.colors.domain.negativeBalance,
    onSolid: theme.colors.domain.onNegativeBalance,
  },
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
        color: ${c.onSolid};
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
