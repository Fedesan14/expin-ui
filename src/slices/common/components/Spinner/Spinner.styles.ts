import styled, { keyframes } from "styled-components"

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const Root = styled.span<{ $size: number; $color?: string }>`
  display: inline-flex;
  position: relative;
  color: ${({ $color, theme }) => $color ?? theme.colors.primary};
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 0.7s linear infinite;
`
