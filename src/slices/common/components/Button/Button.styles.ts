import { css } from "styled-components"
import styled from "styled-components"
import type { DefaultTheme } from "styled-components"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "danger"
  | "success"
  | "subtle"

export type ButtonSize = "sm" | "md" | "lg"

const sizeStyles = (theme: DefaultTheme): Record<ButtonSize, ReturnType<typeof css>> => ({
  sm: css`
    height: 36px;
    padding: 0 ${theme.space["3"]};
    font-size: ${theme.fontSizes.sm};
    gap: ${theme.space["1"]};
  `,
  md: css`
    height: ${theme.sizes.touch};
    padding: 0 ${theme.space["4"]};
    font-size: ${theme.fontSizes.md};
    gap: ${theme.space["2"]};
  `,
  lg: css`
    height: 52px;
    padding: 0 ${theme.space["5"]};
    font-size: ${theme.fontSizes.lg};
    gap: ${theme.space["2"]};
  `,
})

const variantStyles = (theme: DefaultTheme): Record<ButtonVariant, ReturnType<typeof css>> => ({
  primary: css`
    background: ${theme.colors.roles.primary};
    color: ${theme.colors.roles.onPrimary};
    &:hover:not(:disabled) {
      background: ${theme.colors.state.hoverOnPrimary};
    }
  `,
  secondary: css`
    background: ${theme.colors.surface};
    color: ${theme.colors.roles.primary};
    border-color: ${theme.colors.roles.primary};
    &:hover:not(:disabled) {
      background: ${theme.colors.roles.primaryContainer};
    }
  `,
  tertiary: css`
    background: ${theme.colors.surfaceAlt};
    color: ${theme.colors.text};
    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceMuted};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.text};
    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceAlt};
    }
  `,
  danger: css`
    background: ${theme.colors.roles.error};
    color: ${theme.colors.roles.onError};
    &:hover:not(:disabled) {
      background: ${theme.colors.dangerHover};
    }
  `,
  success: css`
    background: ${theme.colors.roles.tertiary};
    color: ${theme.colors.roles.onTertiary};
    &:hover:not(:disabled) {
      filter: brightness(0.95);
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
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
  $loading: boolean
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ theme, $size }) => sizeStyles(theme)[$size]}
  ${({ theme, $variant }) => variantStyles(theme)[$variant]}

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      cursor: progress;
      pointer-events: none;
    `}
`

export const Content = styled.span<{ $hidden: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: inherit;
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
`

export const LoaderOverlay = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
