import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../../slices/common/components/AppShell'
import { HomePage } from '../../slices/common/pages/HomePage'
import { AuthPage } from '../../slices/auth/pages/AuthPage'
import { EventsPage } from '../../slices/events/pages/EventsPage'
import { ExpenseHistoryPage } from '../../slices/expense-history/pages/ExpenseHistoryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
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
        element: <AuthPage />,
      },
    ],
  },
])
