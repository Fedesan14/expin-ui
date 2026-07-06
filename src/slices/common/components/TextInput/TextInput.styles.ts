import styled, { css } from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const Adornment = styled.span<{ $position: 'start' | 'end' }>`
  position: absolute;
  ${({ $position }) => ($position === 'start' ? 'left: 14px;' : 'right: 14px;')}
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`

export const Input = styled.input<{
  $hasStartIcon: boolean
  $hasEndIcon: boolean
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
  padding: 0 ${({ theme }) => theme.space['4']};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition:
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.base};

  ${({ $hasStartIcon, theme }) =>
    $hasStartIcon &&
    css`
      padding-left: calc(${theme.space['4']} + 22px);
    `}

  ${({ $hasEndIcon, theme }) =>
    $hasEndIcon &&
    css`
      padding-right: calc(${theme.space['4']} + 22px);
    `}

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
`
