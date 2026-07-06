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
    background: ${theme.colors.primary};
    color: ${theme.colors.textInverse};
    &:hover:not(:disabled) {
      background: ${theme.colors.primaryHover};
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
    background: ${theme.colors.dangerSoft};
    color: ${theme.colors.danger};
    &:hover:not(:disabled) {
      background: ${theme.colors.danger};
      color: ${theme.colors.textInverse};
    }
  `,
  subtle: css`
    background: ${theme.colors.primarySoft};
    color: ${theme.colors.primaryHover};
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
