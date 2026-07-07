import { createContext } from 'react'

export type ToastTone = 'success' | 'danger' | 'info'

export type ToastMessage = {
  id: string
  tone: ToastTone
  title: string
  description?: string
}

export type ToastInput = {
  title: string
  description?: string
  duration?: number
}

export type ToastContextValue = {
  success: (toast: ToastInput) => void
  error: (toast: ToastInput) => void
  info: (toast: ToastInput) => void
  dismiss: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
