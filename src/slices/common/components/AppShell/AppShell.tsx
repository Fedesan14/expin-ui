import { Outlet } from 'react-router-dom'
import * as S from './AppShell.styles'

export function AppShell() {
  return (
    <S.Shell>
      <S.Header>
        <S.HeaderInner>
          <S.Brand to="/">
            <S.BrandMark>E</S.BrandMark>
            Expin
          </S.Brand>
          <S.Nav aria-label="Modulos principales">
            <S.NavLink to="/historial">Historial</S.NavLink>
            <S.NavLink to="/eventos">Eventos</S.NavLink>
            <S.NavLink to="/auth">Auth</S.NavLink>
          </S.Nav>
        </S.HeaderInner>
      </S.Header>
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Shell>
  )
}
