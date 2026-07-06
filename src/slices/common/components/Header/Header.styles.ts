import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { media } from "../../../../app/theme/theme"

export const Root = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: env(safe-area-inset-top);
`

export const Bar = styled.div`
  height: ${({ theme }) => theme.sizes.headerHeight};
  max-width: ${({ theme }) => theme.sizes.maxContent};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space["4"]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space["4"]};

  ${media.md} {
    padding: 0 ${({ theme }) => theme.space["6"]};
  }
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["2"]};
`

export const Mark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
`

export const BrandName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`

export const DesktopNav = styled.nav`
  display: none;

  ${media.md} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space["1"]};
  }
`

export const NavItem = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["2"]};
  height: 40px;
  padding: 0 ${({ theme }) => theme.space["3"]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space["2"]};
`
