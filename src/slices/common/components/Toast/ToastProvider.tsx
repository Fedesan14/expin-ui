import { useCallback, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { ToastContext } from './ToastContext'
import type { ToastInput, ToastMessage, ToastTone } from './ToastContext'
import * as S from './Toast.styles'

const DEFAULT_DURATION = 2600
const iconByTone: Record<ToastTone, string> = {
  success: 'OK',
  danger: '!',
  info: 'i',
}

function createToastId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const timeoutsRef = useRef<Record<string, number>>({})

  const dismiss = useCallback((id: string) => {
    window.clearTimeout(timeoutsRef.current[id])
    delete timeoutsRef.current[id]
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const show = useCallback(
    (tone: ToastTone, input: ToastInput) => {
      const id = createToastId()
      const duration = input.duration ?? DEFAULT_DURATION

      setToasts((current) => [
        ...current,
        {
          id,
          tone,
          title: input.title,
          description: input.description,
        },
      ])

      timeoutsRef.current[id] = window.setTimeout(() => {
        dismiss(id)
      }, duration)
    },
    [dismiss],
  )

  const value = useMemo(
    () => ({
      success: (toast: ToastInput) => show('success', toast),
      error: (toast: ToastInput) => show('danger', toast),
      info: (toast: ToastInput) => show('info', toast),
      dismiss,
    }),
    [dismiss, show],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <S.Viewport aria-live="polite" aria-relevant="additions">
        {toasts.map((toast) => (
          <S.Toast key={toast.id} $tone={toast.tone} role="status">
            <S.Icon $tone={toast.tone} aria-hidden="true">
              {iconByTone[toast.tone]}
            </S.Icon>
            <S.Body>
              <S.Title>{toast.title}</S.Title>
              {toast.description ? (
                <S.Description>{toast.description}</S.Description>
              ) : null}
            </S.Body>
            <S.CloseButton
              aria-label="Cerrar notificacion"
              type="button"
              onClick={() => dismiss(toast.id)}
            >
              x
            </S.CloseButton>
          </S.Toast>
        ))}
      </S.Viewport>
    </ToastContext.Provider>
  )
}
