import styled from 'styled-components'

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space['4']};

  @media (min-width: 768px) {
    gap: ${({ theme }) => theme.space['6']};
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const Footer = styled.footer`
  padding-top: ${({ theme }) => theme.space['4']};
  border-top: 1px solid ${({ theme }) => theme.colors.roles.outlineVariant};
  text-align: center;
`

export const Version = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.roles.onSurfaceVariant};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`
