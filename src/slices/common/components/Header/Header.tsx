import type { ComponentType, ReactNode } from "react"
import * as S from "./Header.styles"

type NavIcon = ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" | "false" }>

export interface HeaderNavItem {
  to: string
  label: string
  icon?: NavIcon
  end?: boolean
}

export interface HeaderProps {
  /** Rutas mostradas en la navegación de escritorio */
  navItems?: HeaderNavItem[]
  /** Acciones al extremo derecho (perfil, notificaciones, etc.) */
  actions?: ReactNode
  brandName?: string
}

export function Header({ navItems = [], actions, brandName = "Expin" }: HeaderProps) {
  return (
    <S.Root>
      <S.Bar>
        <S.Brand>
          <S.Mark aria-hidden="true">E</S.Mark>
          <S.BrandName>{brandName}</S.BrandName>
        </S.Brand>

        {navItems.length > 0 && (
          <S.DesktopNav aria-label="Navegación principal">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <S.NavItem key={to} to={to} end={end}>
                {Icon && <Icon size={18} aria-hidden="true" />}
                {label}
              </S.NavItem>
            ))}
          </S.DesktopNav>
        )}

        {actions && <S.Actions>{actions}</S.Actions>}
      </S.Bar>
    </S.Root>
  )
}
