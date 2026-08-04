import { useAppUpdate } from '../../../../app/pwa/useAppUpdate'
import { Button } from '../Button'
import * as S from './AppUpdatePrompt.styles'

export function AppUpdatePrompt() {
  const {
    availableVersion,
    updateAvailable,
    updating,
    error,
    applyUpdate,
  } = useAppUpdate()

  if (!updateAvailable) {
    return null
  }

  return (
    <S.Positioner>
      <S.Root role="status" aria-live="polite">
        <S.Copy>
          <S.Title>Hay una nueva versión disponible</S.Title>
          <S.Description>
            {availableVersion
              ? `Versión ${availableVersion}`
              : 'Actualizá para usar la última versión de Expin.'}
          </S.Description>
          {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}
        </S.Copy>
        <Button size="sm" loading={updating} onClick={applyUpdate}>
          {updating ? 'Actualizando…' : 'Actualizar ahora'}
        </Button>
      </S.Root>
    </S.Positioner>
  )
}
