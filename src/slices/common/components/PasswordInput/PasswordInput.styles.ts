import styled, { css } from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const Input = styled.input<{
  $invalid: boolean
}>`
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.touch};
  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 calc(${({ theme }) => theme.space['4']} + 34px) 0
    ${({ theme }) => theme.space['4']};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition:
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.75;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    outline: none;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    cursor: not-allowed;
    opacity: 0.72;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      & + button {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `}
`

export const ToggleButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space['2']};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadows.focus};
    outline: none;
  }
`
