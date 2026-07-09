import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../common/components/Alert'
import { LinkButton } from '../../../common/components/LinkButton'
import { Page } from '../../../common/components/Page'
import { PageHeader } from '../../../common/components/PageHeader'
import { Section } from '../../../common/components/Section'
import { Spinner } from '../../../common/components/Spinner'
import { EventExpenseForm } from '../../components/EventExpenseForm'
import {
  useCreateEventExpenseMutation,
  useGetEventExpenseQuery,
  useGetEventQuery,
  useUpdateEventExpenseMutation,
} from '../../api/eventsApi'
import { getApiStatus, getEventsErrorMessage } from '../../model/apiErrors'
import { toEventExpenseRequest } from '../../model/formatters'
import type { EventExpenseFormValues, EventExpenseResponse } from '../../model/types'
import * as S from '../../components/EventControls/EventControls.styles'

type EventExpenseFormPageProps = {
  mode: 'create' | 'edit'
}

function getExpenseFormValues(
  expense: EventExpenseResponse,
): EventExpenseFormValues {
  return {
    title: expense.title,
    description: expense.description ?? '',
    amount: String(expense.amount),
    paidByParticipantId: expense.paidByParticipantId,
    owedByParticipantIds: expense.owedByParticipantIds,
  }
}

export function EventExpenseFormPage({ mode }: EventExpenseFormPageProps) {
  const navigate = useNavigate()
  const { eventId, expenseId } = useParams()
  const isEditing = mode === 'edit'
  const [message, setMessage] = useState<string | null>(null)
  const eventQuery = useGetEventQuery(
    { eventId: eventId ?? '' },
    { skip: !eventId },
  )
  const expenseQuery = useGetEventExpenseQuery(
    { eventId: eventId ?? '', expenseId: expenseId ?? '' },
    { skip: !isEditing || !eventId || !expenseId },
  )
  const [createExpense, createState] = useCreateEventExpenseMutation()
  const [updateExpense, updateState] = useUpdateEventExpenseMutation()

  if (!eventId || (isEditing && !expenseId)) {
    return <Navigate to="/eventos" replace />
  }

  const handleSubmit = (values: EventExpenseFormValues) => {
    setMessage(null)
    const body = toEventExpenseRequest(values)
    const request =
      isEditing && expenseId
        ? updateExpense({ eventId, expenseId, body }).unwrap()
        : createExpense({ eventId, body }).unwrap()

    request
      .then(() => {
        navigate(`/eventos/${eventId}`, { replace: true })
      })
      .catch((error) => {
        setMessage(getEventsErrorMessage(error))
      })
  }

  const notFound =
    getApiStatus(eventQuery.error) === 404 ||
    getApiStatus(expenseQuery.error) === 404
  const error = eventQuery.error ?? expenseQuery.error
  const isLoading =
    eventQuery.isLoading || (isEditing && expenseQuery.isLoading)
  const canRenderForm =
    eventQuery.data && (!isEditing || expenseQuery.data) && !error
  const event = eventQuery.data

  return (
    <Page maxWidth="narrow">
      <PageHeader
        title={isEditing ? 'Editar gasto' : 'Crear gasto'}
        subtitle="Registra el monto, quien lo pago y quienes lo deben."
        actions={<LinkButton to={`/eventos/${eventId}`}>Volver</LinkButton>}
      />

      {message ? <Alert tone="danger">{message}</Alert> : null}

      {isLoading ? (
        <S.EmptyState>
          <Spinner />
          <S.MutedText>Cargando datos...</S.MutedText>
        </S.EmptyState>
      ) : null}

      {notFound ? (
        <Alert tone="warning" title="Recurso no encontrado">
          No encontramos el evento o gasto solicitado.
        </Alert>
      ) : null}

      {error && !notFound ? (
        <Alert tone="danger">{getEventsErrorMessage(error)}</Alert>
      ) : null}

      {event?.participants.length === 0 ? (
        <Alert tone="warning">
          El evento no tiene participantes disponibles para asignar el gasto.
        </Alert>
      ) : null}

      {canRenderForm && event ? (
        <Section>
          <EventExpenseForm
            defaultValues={
              expenseQuery.data ? getExpenseFormValues(expenseQuery.data) : undefined
            }
            loading={createState.isLoading || updateState.isLoading}
            participants={event.participants}
            submitLabel={isEditing ? 'Guardar gasto' : 'Crear gasto'}
            onSubmit={handleSubmit}
          />
        </Section>
      ) : null}
    </Page>
  )
}
