export type ExpenseCategory = {
  id: string
  name: string
  parentId?: string
}

export type MoneyMovementType = 'expense' | 'income'

export type MoneyMovement = {
  id: string
  amount: number
  categoryId: string
  description: string
  occurredAt: string
  type: MoneyMovementType
}
