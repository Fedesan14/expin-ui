import styled from 'styled-components'
import { media } from '../../../../app/theme/theme'

export const Positioner = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.space['3']};
  bottom: calc(
    ${({ theme }) => theme.sizes.bottomNavHeight} + env(safe-area-inset-bottom) +
      ${({ theme }) => theme.space['3']}
  );
  left: ${({ theme }) => theme.space['3']};
  z-index: ${({ theme }) => theme.zIndex.toast};

  ${media.md} {
    right: ${({ theme }) => theme.space['5']};
    bottom: ${({ theme }) => theme.space['5']};
    left: auto;
    width: min(440px, calc(100vw - ${({ theme }) => theme.space['10']}));
  }
`

export const Root = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.space['3']};
  padding: ${({ theme }) => theme.space['4']};
  border: 1px solid ${({ theme }) => theme.colors.roles.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.roles.inverseSurface};
  color: ${({ theme }) => theme.colors.roles.inverseOnSurface};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  ${media.sm} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

export const Copy = styled.div`
  min-width: 0;
`

export const Title = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export const Description = styled.p`
  margin: ${({ theme }) => theme.space['1']} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.roles.inverseOnSurface};
`

export const ErrorMessage = styled.p`
  margin: ${({ theme }) => theme.space['1']} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.roles.errorContainer};
`
