import { baseApi } from '../../../app/api/baseApi'
import type {
  CreateEventExpenseRequest,
  CreateEventRequest,
  EventExpenseResponse,
  EventResponse,
  EventSummaryResponse,
  UpdateEventExpenseRequest,
  UpdateEventRequest,
} from '../model/types'

type EventIdArg = {
  eventId: string
}

type EventExpenseIdArg = EventIdArg & {
  expenseId: string
}

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventSummaryResponse[], void>({
      query: () => '/events',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Events' as const, id })),
              { type: 'Events' as const, id: 'LIST' },
            ]
          : [{ type: 'Events' as const, id: 'LIST' }],
    }),
    createEvent: builder.mutation<EventResponse, CreateEventRequest>({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),
    getEvent: builder.query<EventResponse, EventIdArg>({
      query: ({ eventId }) => `/events/${eventId}`,
      providesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
      ],
    }),
    updateEvent: builder.mutation<EventResponse, EventIdArg & { body: UpdateEventRequest }>({
      query: ({ eventId, body }) => ({
        url: `/events/${eventId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
        { type: 'Events', id: 'LIST' },
      ],
    }),
    deleteEvent: builder.mutation<void, EventIdArg>({
      query: ({ eventId }) => ({
        url: `/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
        { type: 'Events', id: 'LIST' },
      ],
    }),
    createEventExpense: builder.mutation<
      EventExpenseResponse,
      EventIdArg & { body: CreateEventExpenseRequest }
    >({
      query: ({ eventId, body }) => ({
        url: `/events/${eventId}/expenses`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
      ],
    }),
    getEventExpense: builder.query<EventExpenseResponse, EventExpenseIdArg>({
      query: ({ eventId, expenseId }) => `/events/${eventId}/expenses/${expenseId}`,
      providesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
      ],
    }),
    updateEventExpense: builder.mutation<
      EventExpenseResponse,
      EventExpenseIdArg & { body: UpdateEventExpenseRequest }
    >({
      query: ({ eventId, expenseId, body }) => ({
        url: `/events/${eventId}/expenses/${expenseId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
      ],
    }),
    deleteEventExpense: builder.mutation<void, EventExpenseIdArg>({
      query: ({ eventId, expenseId }) => ({
        url: `/events/${eventId}/expenses/${expenseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
      ],
    }),
  }),
})

export const {
  useCreateEventExpenseMutation,
  useCreateEventMutation,
  useDeleteEventExpenseMutation,
  useDeleteEventMutation,
  useGetEventExpenseQuery,
  useGetEventQuery,
  useGetEventsQuery,
  useUpdateEventExpenseMutation,
  useUpdateEventMutation,
} = eventsApi
