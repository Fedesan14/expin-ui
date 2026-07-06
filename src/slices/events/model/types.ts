export type EventParticipant = {
  id: string
  name: string
}

export type ExpenseEvent = {
  id: string
  name: string
  participants: EventParticipant[]
  createdAt: string
}
