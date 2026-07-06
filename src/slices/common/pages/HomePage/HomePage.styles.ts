import styled from 'styled-components'

export const Intro = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 800;
  text-transform: uppercase;
`

export const Title = styled.h1`
  max-width: 760px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: 1.08;

  @media (min-width: 768px) {
    font-size: 3rem;
    line-height: 1.04;
  }

  @media (min-width: 1080px) {
    font-size: 4rem;
    line-height: 1.02;
  }
`

export const Summary = styled.p`
  max-width: 720px;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

export const FeatureGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
