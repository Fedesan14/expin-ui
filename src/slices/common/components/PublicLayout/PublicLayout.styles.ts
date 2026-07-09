import styled from 'styled-components'

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
  min-height: 100vh;
  min-height: 100svh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space['4']};
`
