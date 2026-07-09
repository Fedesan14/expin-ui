import styled from 'styled-components'

export const AuthLayout = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
`

export const AuthPanel = styled.div`
  width: min(100%, 440px);
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 800;
`

export const Input = styled.input`
  width: 100%;
  min-height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    outline: 3px solid rgba(43, 108, 176, 0.16);
  }
`

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 800;
`

export const SubmitButton = styled.button`
  min-height: 50px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 900;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.64;
  }
`

export const SwitchPrompt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`

export const QuickLoginOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['3']};
  min-height: 56px;
  padding: ${({ theme }) => theme.space['3']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export const SwitchInput = styled.input`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  clip-path: inset(50%);
`

export const SwitchTrack = styled.span<{ $checked: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 48px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.borderStrong};
  transition: background ${({ theme }) => theme.transitions.base};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $checked }) => ($checked ? '23px' : '3px')};
    width: 22px;
    height: 22px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: left ${({ theme }) => theme.transitions.base};
  }
`

export const StatusMessage = styled.p<{ $tone: 'danger' | 'success' }>`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $tone }) =>
    $tone === 'success' ? 'rgba(47, 125, 89, 0.1)' : 'rgba(180, 60, 60, 0.1)'};
  color: ${({ $tone, theme }) =>
    $tone === 'success' ? theme.colors.success : theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 800;
`

export const SessionPanel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

export const SessionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  overflow-wrap: anywhere;
`

export const SecondaryButton = styled.button`
  width: max-content;
  min-height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-weight: 800;
`
