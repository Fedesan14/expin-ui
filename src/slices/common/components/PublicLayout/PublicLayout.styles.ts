import styled from 'styled-components'

export const Shell = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  min-height: 100dvh;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), transparent 320px),
    ${({ theme }) => theme.colors.background};
`

export const Main = styled.main`
  width: 100%;
`
