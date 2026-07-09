import styled from 'styled-components'
import { media } from '../../../../app/theme/theme'

export const Shell = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  min-height: 100dvh;
  background:
    linear-gradient(180deg, ${({ theme }) => theme.colors.state.surfaceWash}, transparent 320px),
    ${({ theme }) => theme.colors.background};
`

export const Main = styled.main`
  width: 100%;
  padding-bottom: calc(
    ${({ theme }) => theme.sizes.bottomNavHeight} + env(safe-area-inset-bottom)
  );

  ${media.md} {
    padding-bottom: 0;
  }
`

export const LogoutText = styled.p`
  margin: 0;
`

export const LogoutSwitch = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['3']};
  min-height: 56px;
  margin-top: ${({ theme }) => theme.space['4']};
  padding: ${({ theme }) => theme.space['3']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export const SwitchInput = styled.input`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
`

export const SwitchTrack = styled.span<{ $checked: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 48px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.borderStrong};
  transition: background ${({ theme }) => theme.transitions.base};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $checked }) => ($checked ? '23px' : '3px')};
    width: 22px;
    height: 22px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: left ${({ theme }) => theme.transitions.base};
  }
`

export const LogoutActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['3']};
`
