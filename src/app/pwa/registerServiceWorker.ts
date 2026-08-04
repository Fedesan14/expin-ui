export type WaitingAppUpdate = {
  version: string
  buildId: string
  worker: ServiceWorker
}

type RegisterServiceWorkerOptions = {
  onUpdate: (update: WaitingAppUpdate) => void
  onError: (error: Error) => void
}

const UPDATE_INTERVAL_MS = 30 * 60 * 1000

function readWorkerVersion(worker: ServiceWorker) {
  return new Promise<Omit<WaitingAppUpdate, 'worker'>>((resolve) => {
    const channel = new MessageChannel()
    const timeoutId = window.setTimeout(
      () => resolve({ version: __APP_VERSION__, buildId: 'unknown' }),
      2000,
    )

    channel.port1.onmessage = (event) => {
      window.clearTimeout(timeoutId)
      resolve({
        version: event.data?.version ?? __APP_VERSION__,
        buildId: event.data?.buildId ?? 'unknown',
      })
    }

    worker.postMessage({ type: 'GET_VERSION' }, [channel.port2])
  })
}

export function registerServiceWorker({
  onUpdate,
  onError,
}: RegisterServiceWorkerOptions) {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) {
    return () => undefined
  }

  let disposed = false
  let registration: ServiceWorkerRegistration | undefined
  let trackedWorker: ServiceWorker | undefined

  const reportWaitingWorker = async (worker: ServiceWorker) => {
    const version = await readWorkerVersion(worker)
    if (!disposed) {
      onUpdate({ ...version, worker })
    }
  }

  const handleWorkerStateChange = () => {
    if (
      trackedWorker?.state === 'installed' &&
      navigator.serviceWorker.controller
    ) {
      void reportWaitingWorker(trackedWorker)
    }
  }

  const handleUpdateFound = () => {
    trackedWorker?.removeEventListener('statechange', handleWorkerStateChange)
    trackedWorker = registration?.installing ?? undefined
    trackedWorker?.addEventListener('statechange', handleWorkerStateChange)
  }

  const checkForUpdate = () => {
    if (!disposed) {
      void registration?.update().catch((error: unknown) => {
        onError(error instanceof Error ? error : new Error(String(error)))
      })
    }
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      checkForUpdate()
    }
  }

  void navigator.serviceWorker
    .register('/service-worker.js', { updateViaCache: 'none' })
    .then((registered) => {
      if (disposed) {
        return
      }

      registration = registered
      registration.addEventListener('updatefound', handleUpdateFound)

      if (registration.waiting && navigator.serviceWorker.controller) {
        void reportWaitingWorker(registration.waiting)
      }

      checkForUpdate()
    })
    .catch((error: unknown) => {
      if (!disposed) {
        onError(error instanceof Error ? error : new Error(String(error)))
      }
    })

  document.addEventListener('visibilitychange', handleVisibilityChange)
  const intervalId = window.setInterval(checkForUpdate, UPDATE_INTERVAL_MS)

  return () => {
    disposed = true
    window.clearInterval(intervalId)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    registration?.removeEventListener('updatefound', handleUpdateFound)
    trackedWorker?.removeEventListener('statechange', handleWorkerStateChange)
  }
}
