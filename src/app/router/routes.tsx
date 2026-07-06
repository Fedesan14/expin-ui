import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../../slices/common/components/AppShell'
import { LoginPage } from '../../slices/auth/pages/LoginPage'
import { SignupPage } from '../../slices/auth/pages/SignupPage'
import { HomePage } from '../../slices/common/pages/HomePage'
import { EventsPage } from '../../slices/events/pages/EventsPage'
import { ExpenseHistoryPage } from '../../slices/expense-history/pages/ExpenseHistoryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'registro',
        element: <SignupPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'historial',
        element: <ExpenseHistoryPage />,
      },
      {
        path: 'eventos',
        element: <EventsPage />,
      },
      {
        path: 'auth',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
])
