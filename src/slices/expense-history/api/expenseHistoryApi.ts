import { baseApi } from '../../../app/api/baseApi'
import type { ExpenseCategory, MoneyMovement } from '../model/types'

export const expenseHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoneyMovements: builder.query<MoneyMovement[], void>({
      query: () => '/expense-history/movements',
      providesTags: ['ExpenseHistory'],
    }),
    getExpenseCategories: builder.query<ExpenseCategory[], void>({
      query: () => '/expense-history/categories',
      providesTags: ['ExpenseHistory'],
    }),
  }),
})

export const { useGetExpenseCategoriesQuery, useGetMoneyMovementsQuery } =
  expenseHistoryApi
