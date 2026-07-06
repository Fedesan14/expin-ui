import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { media } from "../../../../app/theme/theme"

export const Root = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  z-index: ${({ theme }) => theme.zIndex.bottomNav};
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: env(safe-area-inset-bottom);

  ${media.md} {
    display: none;
  }
`

export const List = styled.ul`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  height: ${({ theme }) => theme.sizes.bottomNavHeight};
  margin: 0;
  padding: 0;
  list-style: none;
`

export const Item = styled.li`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
`

export const ItemLink = styled(NavLink)`
  position: relative;
  flex: 1;
  width: 100%;
  min-width: ${({ theme }) => theme.sizes.touch};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: ${({ theme }) => theme.space["1"]} 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.base};

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 50%;
    width: min(44px, 70%);
    height: 2px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: transparent;
    transform: translateX(-50%);
  }

  & svg {
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active::before {
    background: ${({ theme }) => theme.colors.primary};
  }

  &.active svg {
    transform: translateY(-1px);
  }
`

export const Label = styled.span`
  line-height: 1;
`
