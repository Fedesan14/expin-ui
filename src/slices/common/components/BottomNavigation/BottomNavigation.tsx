import type { ComponentType } from "react"
import * as S from "./BottomNavigation.styles"

type NavIcon = ComponentType<{
  size?: number
  strokeWidth?: number
  "aria-hidden"?: boolean | "true" | "false"
}>

export interface BottomNavItem {
  to: string
  label: string
  icon: NavIcon
  end?: boolean
}

export interface BottomNavigationProps {
  items: BottomNavItem[]
}

export function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <S.Root aria-label="Navegacion inferior">
      <S.List>
        {items.map(({ to, label, icon: Icon, end }) => (
          <S.Item key={to}>
            <S.ItemLink to={to} end={end}>
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.4 : 2}
                    aria-hidden="true"
                  />
                  <S.Label>{label}</S.Label>
                </>
              )}
            </S.ItemLink>
          </S.Item>
        ))}
      </S.List>
    </S.Root>
  )
}
