import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import type { DefaultTheme } from "styled-components"

export type LinkButtonTone = "primary" | "neutral" | "danger"
export type LinkButtonSize = "sm" | "md"

const toneColor = {
  primary: (c: DefaultTheme["colors"]) => c.primary,
  neutral: (c: DefaultTheme["colors"]) => c.textMuted,
  danger: (c: DefaultTheme["colors"]) => c.danger,
}

const base = css<{ $tone: LinkButtonTone; $size: LinkButtonSize }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["1"]};
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme, $size }) =>
    $size === "sm" ? theme.fontSizes.sm : theme.fontSizes.md};
  color: ${({ theme, $tone }) => toneColor[$tone](theme.colors)};
  cursor: pointer;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    text-decoration: none;
  }
`

export const AsButton = styled.button<{ $tone: LinkButtonTone; $size: LinkButtonSize }>`
  ${base}
`

export const AsAnchor = styled.a<{ $tone: LinkButtonTone; $size: LinkButtonSize }>`
  ${base}
`

export const AsRouterLink = styled(Link)<{ $tone: LinkButtonTone; $size: LinkButtonSize }>`
  ${base}
`
