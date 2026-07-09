import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/store/hooks'
import { clearSession } from '../../../auth/model/authSlice'
import {
  clearQuickLoginCredential,
  hasQuickLoginCredential,
} from '../../../auth/model/quickLogin'
import {
  EventsIcon,
  HistoryIcon,
  HomeIcon,
  LogOutIcon,
} from '../../icons'
import { BottomNavigation } from '../BottomNavigation'
import { Button } from '../Button'
import { Header } from '../Header'
import { IconButton } from '../IconButton'
import { Modal } from '../Modal'
import * as S from './PrivateLayout.styles'

const navItems = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/historial', label: 'Historial', icon: HistoryIcon },
  { to: '/eventos', label: 'Eventos', icon: EventsIcon },
]

export function PrivateLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [keepQuickLogin, setKeepQuickLogin] = useState(true)

  const logout = (preserveQuickLogin: boolean) => {
    if (!preserveQuickLogin) {
      clearQuickLoginCredential()
    }

    dispatch(clearSession())
    navigate('/login', { replace: true })
  }

  const handleLogout = () => {
    if (hasQuickLoginCredential()) {
      setKeepQuickLogin(true)
      setLogoutModalOpen(true)
      return
    }

    logout(false)
  }

  const handleLogoutConfirmation = () => {
    setLogoutModalOpen(false)
    logout(keepQuickLogin)
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
      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Cerrar sesión"
        footer={
          <S.LogoutActions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setLogoutModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={handleLogoutConfirmation}>
              Cerrar sesión
            </Button>
          </S.LogoutActions>
        }
      >
        <S.LogoutText>
          Puedes conservar el ingreso rápido en este dispositivo o desactivarlo
          al cerrar sesión.
        </S.LogoutText>
        <S.LogoutSwitch>
          <span>Conservar ingreso rápido</span>
          <S.SwitchInput
            checked={keepQuickLogin}
            onChange={(event) => setKeepQuickLogin(event.currentTarget.checked)}
            type="checkbox"
          />
          <S.SwitchTrack $checked={keepQuickLogin} aria-hidden="true" />
        </S.LogoutSwitch>
      </Modal>
      <S.Main>
        <Outlet />
      </S.Main>
      <BottomNavigation items={navItems} />
    </S.Shell>
  )
}
