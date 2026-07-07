export function getApiStatus(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return Number((error as { status: unknown }).status)
  }

  return null
}

export function getEventsErrorMessage(error: unknown) {
  const status = getApiStatus(error)

  if (status === 401) {
    return 'Tu sesion ya no es valida. Vuelve a iniciar sesion.'
  }

  if (status === 403) {
    return 'No tienes permisos para realizar esta accion.'
  }

  if (status === 404) {
    return 'No encontramos el recurso solicitado.'
  }

  if (status === 409) {
    return 'No se puede remover un participante que ya pago un gasto.'
  }

  if (status === 400) {
    return 'Revisa los datos ingresados e intenta nuevamente.'
  }

  return 'No pudimos completar la accion. Intenta nuevamente.'
}
