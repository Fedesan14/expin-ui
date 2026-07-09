import styled, { css } from "styled-components"
import type { DefaultTheme } from "styled-components"

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "subtle"
export type IconButtonSize = "sm" | "md" | "lg"

const dimensions: Record<IconButtonSize, string> = {
  sm: "36px",
  md: "44px",
  lg: "48px",
}

const variantStyles = (
  theme: DefaultTheme,
): Record<IconButtonVariant, ReturnType<typeof css>> => ({
  primary: css`
    background: ${theme.colors.roles.primary};
    color: ${theme.colors.roles.onPrimary};
    &:hover:not(:disabled) {
      background: ${theme.colors.state.hoverOnPrimary};
    }
  `,
  secondary: css`
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
    border-color: ${theme.colors.border};
    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceAlt};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.textMuted};
    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceAlt};
      color: ${theme.colors.text};
    }
  `,
  danger: css`
    background: ${theme.colors.roles.errorContainer};
    color: ${theme.colors.roles.onErrorContainer};
    &:hover:not(:disabled) {
      background: ${theme.colors.roles.error};
      color: ${theme.colors.roles.onError};
    }
  `,
  subtle: css`
    background: ${theme.colors.roles.primaryContainer};
    color: ${theme.colors.roles.onPrimaryContainer};
    &:hover:not(:disabled) {
      filter: brightness(0.97);
    }
  `,
})

export const Root = styled.button<{
  $variant: IconButtonVariant
  $size: IconButtonSize
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => dimensions[$size]};
  height: ${({ $size }) => dimensions[$size]};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ theme, $variant }) => variantStyles(theme)[$variant]}

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`
