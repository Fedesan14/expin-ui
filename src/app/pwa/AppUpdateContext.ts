import { createContext } from 'react'

export type AppUpdateContextValue = {
  currentVersion: string
  availableVersion?: string
  updateAvailable: boolean
  updating: boolean
  error?: string
  applyUpdate: () => void
}

export const AppUpdateContext = createContext<AppUpdateContextValue | null>(null)
