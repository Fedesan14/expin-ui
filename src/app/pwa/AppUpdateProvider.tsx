import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { AppUpdatePrompt } from '../../slices/common/components/AppUpdatePrompt'
import { AppUpdateContext } from './AppUpdateContext'
import { registerServiceWorker } from './registerServiceWorker'
import type { WaitingAppUpdate } from './registerServiceWorker'

export function AppUpdateProvider({ children }: PropsWithChildren) {
  const [waitingUpdate, setWaitingUpdate] = useState<WaitingAppUpdate>()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string>()
  const reloadingRef = useRef(false)

  useEffect(
    () =>
      registerServiceWorker({
        onUpdate: (update) => {
          setWaitingUpdate(update)
          setError(undefined)
        },
        onError: (registrationError) => setError(registrationError.message),
      }),
    [],
  )

  const applyUpdate = useCallback(() => {
    if (!waitingUpdate || updating) {
      return
    }

    setUpdating(true)
    setError(undefined)

    const handleControllerChange = () => {
      if (reloadingRef.current) {
        return
      }

      reloadingRef.current = true
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange,
      { once: true },
    )

    try {
      waitingUpdate.worker.postMessage({ type: 'SKIP_WAITING' })
    } catch (updateError) {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        handleControllerChange,
      )
      setUpdating(false)
      setError(
        updateError instanceof Error
          ? updateError.message
          : 'No se pudo aplicar la actualización.',
      )
    }
  }, [updating, waitingUpdate])

  const value = useMemo(
    () => ({
      currentVersion: __APP_VERSION__,
      availableVersion: waitingUpdate?.version,
      updateAvailable: Boolean(waitingUpdate),
      updating,
      error,
      applyUpdate,
    }),
    [applyUpdate, error, updating, waitingUpdate],
  )

  return (
    <AppUpdateContext.Provider value={value}>
      {children}
      <AppUpdatePrompt />
    </AppUpdateContext.Provider>
  )
}
