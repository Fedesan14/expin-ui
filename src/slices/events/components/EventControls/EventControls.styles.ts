import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { media } from '../../../../app/theme/theme'

export const CardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['3']};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']};
  padding: ${({ theme }) => theme.space['4']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};
`

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['1']};
`

export const EventCardLayout = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.space['3']};
  align-items: start;
  padding: ${({ theme }) => theme.space['4']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.xs};
`

export const EventCardBody = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']};
`

export const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.snug};
`

export const MutedText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space['2']};
`

export const Pill = styled.span`
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: 0 ${({ theme }) => theme.space['3']};
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space['2']};
`

export const CardActions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2']};
  justify-items: end;
`

export const CardActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  min-height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  transition:
    background ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`

export const EmptyState = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['3']};
  justify-items: start;
  padding: ${({ theme }) => theme.space['5']};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.space['4']};
`

export const TextArea = styled.textarea<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 112px;
  resize: vertical;
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  line-height: ${({ theme }) => theme.lineHeights.normal};
  padding: ${({ theme }) => `${theme.space['3']} ${theme.space['4']}`};
  transition:
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    outline: none;
  }
`

export const Select = styled.select<{ $invalid?: boolean }>`
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.touch};
  border: 1px solid
    ${({ theme, $invalid }) =>
      $invalid ? theme.colors.danger : theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  padding: 0 ${({ theme }) => theme.space['4']};

  &:focus {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    outline: none;
  }
`

export const FieldRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['4']};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const InlineField = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.space['2']};
  align-items: end;
`

export const ParticipantList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space['2']};
  list-style: none;
  margin: 0;
  padding: 0;
`

export const ParticipantItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['3']};
  align-items: center;
  min-height: ${({ theme }) => theme.sizes.touch};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.space['2']} ${theme.space['3']}`};
`

export const DetailGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['4']};
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
`

export const DetailColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['4']};
`

export const CopyBox = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['3']};
  padding: ${({ theme }) => theme.space['4']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`

export const ShareValue = styled.code`
  display: block;
  overflow-wrap: anywhere;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.space['3']};
`

export const CompactHeader = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.space['2']};
`

export const CompactTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['3']};
`

export const DetailTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`

export const DescriptionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`

export const FloatingActionBar = styled.div`
  position: fixed;
  left: ${({ theme }) => theme.space['4']};
  right: ${({ theme }) => theme.space['4']};
  bottom: calc(
    ${({ theme }) => theme.sizes.bottomNavHeight} + env(safe-area-inset-bottom) +
      ${({ theme }) => theme.space['3']}
  );
  z-index: ${({ theme }) => theme.zIndex.fab};
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space['2']};
  padding: ${({ theme }) => theme.space['2']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  ${media.md} {
    left: 50%;
    right: auto;
    bottom: ${({ theme }) => theme.space['7']};
    width: min(640px, calc(100vw - ${({ theme }) => theme.space['8']}));
    transform: translateX(-50%);
  }
`

export const FloatingActionLink = styled(Link)`
  display: inline-flex;
  min-height: ${({ theme }) => theme.sizes.touch};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const FloatingActionButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  min-height: ${({ theme }) => theme.sizes.touch};
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $danger }) =>
    $danger ? theme.colors.danger : theme.colors.surfaceAlt};
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.textInverse : theme.colors.primary};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover:not(:disabled) {
    background: ${({ theme, $danger }) =>
      $danger ? theme.colors.dangerHover : theme.colors.primarySoft};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const Collapsible = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space['3']};
`

export const CollapsibleButton = styled.button`
  display: flex;
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.touch};
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['3']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  padding: ${({ theme }) => `${theme.space['3']} ${theme.space['4']}`};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`

export const CollapsibleTitle = styled.span`
  display: grid;
  gap: ${({ theme }) => theme.space['1']};
`

export const CollapsibleLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.snug};
`

export const CollapsibleHint = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`

export const CollapsibleIcon = styled.span<{ $open: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
  transition: transform ${({ theme }) => theme.transitions.base};
`
