import styled from "styled-components"

export const Root = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space["4"]};
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space["1"]};
  min-width: 0;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.01em;
`

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["2"]};
  flex-shrink: 0;
`
