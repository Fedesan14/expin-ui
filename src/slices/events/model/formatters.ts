import type {
  CreateEventExpenseRequest,
  CreateEventRequest,
  EventExpenseFormValues,
  EventFormValues,
  EventParticipantRequest,
  EventParticipantResponse,
  EventSettlementStrategy,
} from './types'

function formatLocalDate(value: string) {
  const [year, month, day] = value.split('-')

  if (!year || !month || !day) {
    return value
  }

  return `${day}/${month}/${year}`
}

export function formatDateRange(startDate: string | null, endDate: string | null) {
  if (!startDate && !endDate) {
    return 'Sin fechas definidas'
  }

  if (startDate && endDate) {
    return `${formatLocalDate(startDate)} - ${formatLocalDate(endDate)}`
  }

  if (startDate) {
    return `Desde ${formatLocalDate(startDate)}`
  }

  return `Hasta ${formatLocalDate(endDate ?? '')}`
}

export function formatAmount(amount: string | number) {
  const numericAmount = typeof amount === 'number' ? amount : Number(amount)

  if (!Number.isFinite(numericAmount)) {
    return `$ ${amount}`
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 2,
  }).format(numericAmount)
}

export function formatSettlementStrategy(strategy: EventSettlementStrategy) {
  if (strategy === 'OWNER_CENTRIC') {
    return 'Division equitativa'
  }

  return strategy
}

export function getParticipantName(
  participants: EventParticipantResponse[],
  participantId: string,
) {
  return (
    participants.find((participant) => participant.id === participantId)
      ?.displayName ?? 'Participante eliminado'
  )
}

export function toEventRequest(
  values: EventFormValues,
  preservedParticipants: EventParticipantRequest[] = [],
): CreateEventRequest {
  const guestParticipants = values.participants
    .map((participant) => participant.guestName.trim())
    .filter(Boolean)
    .map((guestName) => ({ guestName }))

  const participants = [...preservedParticipants, ...guestParticipants]

  return {
    title: values.title.trim(),
    description: values.description.trim() || null,
    startDate: values.startDate || null,
    endDate: values.endDate || null,
    participants: participants.length > 0 ? participants : null,
  }
}

export function toEventExpenseRequest(
  values: EventExpenseFormValues,
): CreateEventExpenseRequest {
  return {
    title: values.title.trim(),
    description: values.description.trim() || null,
    amount: values.amount.replace(',', '.'),
    paidByParticipantId: values.paidByParticipantId,
    owedByParticipantIds: values.owedByParticipantIds,
  }
}
