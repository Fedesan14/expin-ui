import styled from 'styled-components'
import { NavLink as RouterNavLink, Link } from 'react-router-dom'

export const Shell = styled.div`
  min-height: 100vh;
  min-height: 100svh;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), transparent 320px),
    ${({ theme }) => theme.colors.background};
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

export const HeaderInner = styled.div`
  width: min(1120px, calc(100% - 24px));
  min-height: 64px;
  margin: 0 auto;
  padding-top: env(safe-area-inset-top);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    width: min(1120px, calc(100% - 32px));
    min-height: 72px;
  }
`

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
  text-decoration: none;
`

export const BrandMark = styled.span`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: inline-grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 900;
`

export const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  @media (min-width: 768px) {
    display: flex;
  }
`

export const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  font-weight: 700;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Main = styled.main`
  width: min(1120px, calc(100% - 24px));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0
    calc(${({ theme }) => theme.spacing.xxl} + env(safe-area-inset-bottom));

  @media (min-width: 768px) {
    width: min(1120px, calc(100% - 32px));
    padding-top: ${({ theme }) => theme.spacing.xxl};
  }
`
