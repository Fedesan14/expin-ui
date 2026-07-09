import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../common/components/Alert'
import { LinkButton } from '../../../common/components/LinkButton'
import { Page } from '../../../common/components/Page'
import { PageHeader } from '../../../common/components/PageHeader'
import { Section } from '../../../common/components/Section'
import { Spinner } from '../../../common/components/Spinner'
import { EventForm } from '../../components/EventForm'
import type { EventFormSubmitValues } from '../../components/EventForm'
import {
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
} from '../../api/eventsApi'
import { getApiStatus, getEventsErrorMessage } from '../../model/apiErrors'
import { toEventRequest } from '../../model/formatters'
import type { EventFormValues, EventResponse } from '../../model/types'
import * as S from '../../components/EventControls/EventControls.styles'

type EventFormPageProps = {
  mode: 'create' | 'edit'
}

function getEventFormValues(event: EventResponse): EventFormValues {
  return {
    title: event.title,
    description: event.description ?? '',
    startDate: event.startDate ?? '',
    endDate: event.endDate ?? '',
    participants: event.participants.map((participant) => ({
      email: '',
      guestName: participant.displayName,
      userId: participant.userId ?? '',
      username: participant.type === 'USER' ? participant.displayName : '',
    })),
  }
}

export function EventFormPage({ mode }: EventFormPageProps) {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const isEditing = mode === 'edit'
  const [message, setMessage] = useState<string | null>(null)
  const [createEvent, createState] = useCreateEventMutation()
  const [updateEvent, updateState] = useUpdateEventMutation()
  const eventQuery = useGetEventQuery(
    { eventId: eventId ?? '' },
    { skip: !isEditing || !eventId },
  )

  if (isEditing && !eventId) {
    return <Navigate to="/eventos" replace />
  }

  const handleSubmit = ({ values }: EventFormSubmitValues) => {
    setMessage(null)
    const body = toEventRequest(values)

    const request =
      isEditing && eventId
        ? updateEvent({ eventId, body }).unwrap()
        : createEvent(body).unwrap()

    request
      .then((event) => {
        navigate(`/eventos/${event.id}`, { replace: true })
      })
      .catch((error) => {
        setMessage(getEventsErrorMessage(error))
      })
  }

  const title = isEditing ? 'Editar evento' : 'Crear evento'

  return (
    <Page maxWidth="narrow">
      <PageHeader
        title={title}
        subtitle="Define los datos principales y los invitados del evento."
        actions={<LinkButton to={eventId ? `/eventos/${eventId}` : '/eventos'}>Volver</LinkButton>}
      />

      {message ? <Alert tone="danger">{message}</Alert> : null}

      {eventQuery.error && getApiStatus(eventQuery.error) === 404 ? (
        <Alert tone="warning" title="Evento no encontrado">
          No encontramos el evento solicitado.
        </Alert>
      ) : null}

      {eventQuery.error && getApiStatus(eventQuery.error) !== 404 ? (
        <Alert tone="danger">{getEventsErrorMessage(eventQuery.error)}</Alert>
      ) : null}

      {isEditing && eventQuery.isLoading ? (
        <S.EmptyState>
          <Spinner />
          <S.MutedText>Cargando evento...</S.MutedText>
        </S.EmptyState>
      ) : null}

      {(!isEditing || eventQuery.data) && !eventQuery.error ? (
        <Section>
          <EventForm
            defaultValues={eventQuery.data ? getEventFormValues(eventQuery.data) : undefined}
            loading={createState.isLoading || updateState.isLoading}
            submitLabel={isEditing ? 'Guardar cambios' : 'Crear evento'}
            onSubmit={handleSubmit}
          />
        </Section>
      ) : null}
    </Page>
  )
}
