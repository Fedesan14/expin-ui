import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/store/hooks'
import { clearSession } from '../../../auth/model/authSlice'
import {
  EventsIcon,
  HistoryIcon,
  HomeIcon,
  LogOutIcon,
} from '../../icons'
import { BottomNavigation } from '../BottomNavigation'
import { Header } from '../Header'
import { IconButton } from '../IconButton'
import * as S from './PrivateLayout.styles'

const navItems = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/historial', label: 'Historial', icon: HistoryIcon },
  { to: '/eventos', label: 'Eventos', icon: EventsIcon },
]

export function PrivateLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearSession())
    navigate('/login', { replace: true })
  }

  return (
    <S.Shell>
      <Header
        navItems={navItems}
        actions={
          <IconButton
            icon={<LogOutIcon size={20} aria-hidden="true" />}
            label="Cerrar sesion"
            type="button"
            variant="secondary"
            onClick={handleLogout}
          />
        }
      />
      <S.Main>
        <Outlet />
      </S.Main>
      <BottomNavigation items={navItems} />
    </S.Shell>
  )
}
