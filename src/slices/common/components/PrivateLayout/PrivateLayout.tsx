import type { SVGProps } from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNavigation } from '../BottomNavigation'
import { Header } from '../Header'
import * as S from './PrivateLayout.styles'

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4v-8.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function HistoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 7h14M5 12h14M5 17h9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function EventsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 8h10M7 12h10M9 4v3M15 4v3M6 6h12v14H6V6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

const navItems = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/historial', label: 'Historial', icon: HistoryIcon },
  { to: '/eventos', label: 'Eventos', icon: EventsIcon },
]

export function PrivateLayout() {
  return (
    <S.Shell>
      <Header navItems={navItems} />
      <S.Main>
        <Outlet />
      </S.Main>
      <BottomNavigation items={navItems} />
    </S.Shell>
  )
}
