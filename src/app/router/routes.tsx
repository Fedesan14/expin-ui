import { Navigate, createBrowserRouter } from 'react-router-dom'
import { PrivateRoute, PublicRoute } from './RouteGuards'
import { PrivateLayout } from '../../slices/common/components/PrivateLayout'
import { PublicLayout } from '../../slices/common/components/PublicLayout'
import { LoginPage } from '../../slices/auth/pages/LoginPage'
import { SignupPage } from '../../slices/auth/pages/SignupPage'
import { HomePage } from '../../slices/common/pages/HomePage'
import { EventsPage } from '../../slices/events/pages/EventsPage'
import { ExpenseHistoryPage } from '../../slices/expense-history/pages/ExpenseHistoryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
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
        path: 'auth',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
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
        path: '*',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
