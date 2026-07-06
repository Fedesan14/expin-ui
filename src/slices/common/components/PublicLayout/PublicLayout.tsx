import { Outlet } from 'react-router-dom'
import * as S from './PublicLayout.styles'

export function PublicLayout() {
  return (
    <S.Shell>
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Shell>
  )
}
