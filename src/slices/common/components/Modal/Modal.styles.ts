import styled, { keyframes } from "styled-components"
import { media } from "../../../../app/theme/theme"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: ${({ theme }) => theme.space["4"]};
  animation: ${fadeIn} ${({ theme }) => theme.transitions.base};

  ${media.sm} {
    align-items: center;
  }
`

export const Panel = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxContentNarrow};
  max-height: calc(100dvh - ${({ theme }) => theme.space["8"]});
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${slideUp} ${({ theme }) => theme.transitions.slow};
  overflow: hidden;
`

export const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space["3"]};
  padding: ${({ theme }) => theme.space["5"]} ${({ theme }) => theme.space["5"]}
    ${({ theme }) => theme.space["3"]};
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export const Body = styled.div`
  padding: 0 ${({ theme }) => theme.space["5"]} ${({ theme }) => theme.space["5"]};
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`

export const Footer = styled.footer`
  display: flex;
  gap: ${({ theme }) => theme.space["3"]};
  padding: ${({ theme }) => theme.space["4"]} ${({ theme }) => theme.space["5"]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  & > * {
    flex: 1;
  }
`
