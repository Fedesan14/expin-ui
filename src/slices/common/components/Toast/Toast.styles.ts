import styled, { css } from 'styled-components'
import type { ToastTone } from './ToastContext'

const toneStyles = {
  success: css`
    border-left-color: ${({ theme }) => theme.colors.roles.tertiary};
  `,
  danger: css`
    border-left-color: ${({ theme }) => theme.colors.roles.error};
  `,
  info: css`
    border-left-color: ${({ theme }) => theme.colors.roles.primary};
  `,
}

export const Viewport = styled.div`
  position: fixed;
  left: ${({ theme }) => theme.space['4']};
  right: ${({ theme }) => theme.space['4']};
  bottom: calc(
    ${({ theme }) => theme.sizes.bottomNavHeight} + env(safe-area-inset-bottom) +
      ${({ theme }) => theme.space['4']}
  );
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: grid;
  gap: ${({ theme }) => theme.space['2']};
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: auto;
    right: ${({ theme }) => theme.space['7']};
    bottom: ${({ theme }) => theme.space['7']};
    width: min(360px, calc(100vw - ${({ theme }) => theme.space['8']}));
  }
`

export const Toast = styled.div<{ $tone: ToastTone }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.space['3']};
  align-items: start;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space['3']};
  pointer-events: auto;

  ${({ $tone }) => toneStyles[$tone]}
`

export const Icon = styled.span<{ $tone: ToastTone }>`
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $tone }) =>
    $tone === 'success'
      ? theme.colors.roles.tertiaryContainer
      : $tone === 'danger'
        ? theme.colors.roles.errorContainer
        : theme.colors.roles.primaryContainer};
  color: ${({ theme, $tone }) =>
    $tone === 'success'
      ? theme.colors.roles.onTertiaryContainer
      : $tone === 'danger'
        ? theme.colors.roles.onErrorContainer
        : theme.colors.roles.onPrimaryContainer};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
`

export const Body = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['1']};
  min-width: 0;
`

export const Title = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.snug};
`

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`

export const CloseButton = styled.button`
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`
