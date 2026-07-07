export type EventParticipantRequest = {
  userId?: string | null
  guestName?: string | null
}

export type EventParticipantResponse = {
  id: string
  userId: string | null
  guestName: string | null
  displayName: string
  type: 'USER' | 'GUEST'
}

export type EventExpenseResponse = {
  id: string
  title: string
  description: string | null
  amount: string | number
  paidByParticipantId: string
}

export type EventSummaryResponse = {
  id: string
  title: string
  description: string | null
  startDate: string | null
  endDate: string | null
  shareLink: string
  ownerId: string
  participantsCount: number
}

export type EventResponse = EventSummaryResponse & {
  participants: EventParticipantResponse[]
  expenses: EventExpenseResponse[]
}

export type CreateEventRequest = {
  title: string
  description?: string | null
  startDate?: string | null
  endDate?: string | null
  participants?: EventParticipantRequest[] | null
}

export type UpdateEventRequest = CreateEventRequest

export type CreateEventExpenseRequest = {
  title: string
  description?: string | null
  amount: string | number
  paidByParticipantId: string
}

export type UpdateEventExpenseRequest = CreateEventExpenseRequest

export type EventFormValues = {
  title: string
  description: string
  startDate: string
  endDate: string
  participants: {
    guestName: string
  }[]
}

export type EventExpenseFormValues = {
  title: string
  description: string
  amount: string
  paidByParticipantId: string
}
