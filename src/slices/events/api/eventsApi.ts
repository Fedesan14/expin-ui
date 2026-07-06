import { baseApi } from '../../../app/api/baseApi'
import type { ExpenseEvent } from '../model/types'

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ExpenseEvent[], void>({
      query: () => '/events',
      providesTags: ['Events'],
    }),
  }),
})

export const { useGetEventsQuery } = eventsApi
