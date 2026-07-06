import styled from "styled-components"
import { media } from "../../../../app/theme/theme"

export const Root = styled.button<{ $extended: boolean; $hasBottomNav: boolean }>`
  position: fixed;
  right: ${({ theme }) => theme.space["4"]};
  bottom: ${({ theme, $hasBottomNav }) =>
    $hasBottomNav
      ? `calc(${theme.sizes.bottomNavHeight} + env(safe-area-inset-bottom) + ${theme.space["4"]})`
      : `calc(env(safe-area-inset-bottom) + ${theme.space["5"]})`};
  z-index: ${({ theme }) => theme.zIndex.fab};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space["2"]};
  height: 56px;
  min-width: 56px;
  padding: ${({ theme, $extended }) => ($extended ? `0 ${theme.space["5"]}` : "0")};
  border-radius: ${({ theme, $extended }) =>
    $extended ? theme.radii.pill : theme.radii.lg};

  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textInverse};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition:
    background ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${media.md} {
    right: ${({ theme }) => theme.space["7"]};
    bottom: ${({ theme }) => theme.space["7"]};
  }
`

export const Text = styled.span`
  line-height: 1;
`
