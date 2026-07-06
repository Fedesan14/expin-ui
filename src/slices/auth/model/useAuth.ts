import { useAppSelector } from '../../../app/store/hooks'
import { isAuthenticated } from './authStorage'

export function useAuth() {
  const auth = useAppSelector((state) => state.auth)

  return {
    auth,
    isAuthenticated: isAuthenticated(auth),
  }
}
