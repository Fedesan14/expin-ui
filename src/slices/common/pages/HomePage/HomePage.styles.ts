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
