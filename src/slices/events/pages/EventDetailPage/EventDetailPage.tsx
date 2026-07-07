import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../common/components/Alert'
import { Button } from '../../../common/components/Button'
import { LinkButton } from '../../../common/components/LinkButton'
import { Modal } from '../../../common/components/Modal'
import { Page } from '../../../common/components/Page'
import { PageHeader } from '../../../common/components/PageHeader'
import { Section } from '../../../common/components/Section'
import { Spinner } from '../../../common/components/Spinner'
import { useToast } from '../../../common/components/Toast'
import {
  useDeleteEventExpenseMutation,
  useDeleteEventMutation,
  useGetEventQuery,
} from '../../api/eventsApi'
import { getApiStatus, getEventsErrorMessage } from '../../model/apiErrors'
import {
  formatAmount,
  formatDateRange,
  getParticipantName,
} from '../../model/formatters'
import type { EventExpenseResponse } from '../../model/types'
import * as S from '../../components/EventControls/EventControls.styles'

type Message = {
  tone: 'danger' | 'success'
  text: string
} | null

function getAbsoluteShareLink(shareLink: string) {
  if (shareLink.startsWith('http')) {
    return shareLink
  }

  return `${window.location.origin}${shareLink.startsWith('/') ? '' : '/'}${shareLink}`
}

export function EventDetailPage() {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const toast = useToast()
  const [message, setMessage] = useState<Message>(null)
  const [expenseToDelete, setExpenseToDelete] =
    useState<EventExpenseResponse | null>(null)
  const [showParticipants, setShowParticipants] = useState(false)
  const { data: event, error, isLoading } = useGetEventQuery(
    { eventId: eventId ?? '' },
    { skip: !eventId },
  )
  const [deleteEvent, deleteEventState] = useDeleteEventMutation()
  const [deleteExpense, deleteExpenseState] = useDeleteEventExpenseMutation()

  if (!eventId) {
    return <Navigate to="/eventos" replace />
  }

  const handleCopyShareLink = () => {
    if (!event) {
      return
    }

    const absoluteLink = getAbsoluteShareLink(event.shareLink)

    navigator.clipboard
      .writeText(absoluteLink)
      .then(() => {
        toast.success({
          title: 'Link copiado',
          description: 'Ya puedes compartir la invitacion del evento.',
        })
      })
      .catch(() => {
        toast.error({
          title: 'No pudimos copiar el link',
          description: 'Intenta nuevamente desde la accion Compartir.',
        })
      })
  }

  const handleDeleteEvent = () => {
    if (!window.confirm('Eliminar este evento? Esta accion no se puede deshacer.')) {
      return
    }

    setMessage(null)
    deleteEvent({ eventId })
      .unwrap()
      .then(() => {
        navigate('/eventos', { replace: true })
      })
      .catch((requestError) => {
        setMessage({ tone: 'danger', text: getEventsErrorMessage(requestError) })
      })
  }

  const handleDeleteExpense = () => {
    if (!expenseToDelete) {
      return
    }

    setMessage(null)
    deleteExpense({ eventId, expenseId: expenseToDelete.id })
      .unwrap()
      .then(() => {
        setExpenseToDelete(null)
        setMessage({ tone: 'success', text: 'Gasto eliminado.' })
      })
      .catch((requestError) => {
        setMessage({ tone: 'danger', text: getEventsErrorMessage(requestError) })
      })
  }

  if (isLoading) {
    return (
      <Page maxWidth="wide">
        <S.EmptyState>
          <Spinner />
          <S.MutedText>Cargando evento...</S.MutedText>
        </S.EmptyState>
      </Page>
    )
  }

  if (error && getApiStatus(error) === 404) {
    return (
      <Page maxWidth="wide">
        <PageHeader
          title="Evento no encontrado"
          actions={<LinkButton to="/eventos">Volver a eventos</LinkButton>}
        />
        <Alert tone="warning">
          No encontramos el evento solicitado o ya no esta disponible.
        </Alert>
      </Page>
    )
  }

  if (error) {
    return (
      <Page maxWidth="wide">
        <PageHeader
          title="No pudimos cargar el evento"
          actions={<LinkButton to="/eventos">Volver a eventos</LinkButton>}
        />
        <Alert tone="danger">{getEventsErrorMessage(error)}</Alert>
      </Page>
    )
  }

  if (!event) {
    return <Navigate to="/eventos" replace />
  }

  return (
    <Page maxWidth="wide">
      <S.CompactHeader>
        <S.CompactTitleRow>
          <S.DetailTitle>{event.title}</S.DetailTitle>
          <LinkButton to="/eventos">Volver</LinkButton>
        </S.CompactTitleRow>
        <S.Meta>
          <S.Pill>{formatDateRange(event.startDate, event.endDate)}</S.Pill>
          <S.Pill>
            {event.participants.length === 1
              ? '1 participante'
              : `${event.participants.length} participantes`}
          </S.Pill>
        </S.Meta>
        {event.description ? (
          <S.DescriptionText>{event.description}</S.DescriptionText>
        ) : null}
      </S.CompactHeader>

      {message ? <Alert tone={message.tone}>{message.text}</Alert> : null}

      <S.DetailGrid>
        <S.DetailColumn>
          <S.Collapsible>
            <S.CollapsibleButton
              aria-controls="event-participants"
              aria-expanded={showParticipants}
              type="button"
              onClick={() => setShowParticipants((current) => !current)}
            >
              <S.CollapsibleTitle>
                <S.CollapsibleLabel>Participantes</S.CollapsibleLabel>
                <S.CollapsibleHint>
                  {showParticipants
                    ? 'Ocultar participantes'
                    : 'Ver quienes forman parte del evento'}
                </S.CollapsibleHint>
              </S.CollapsibleTitle>
              <S.CollapsibleIcon $open={showParticipants} aria-hidden="true">
                +
              </S.CollapsibleIcon>
            </S.CollapsibleButton>

            {showParticipants ? (
              <S.Card id="event-participants">
                <S.ParticipantList>
                  {event.participants.map((participant) => (
                    <S.ParticipantItem key={participant.id}>
                      <span>{participant.displayName}</span>
                      <S.Pill>
                        {participant.type === 'USER' ? 'Usuario' : 'Invitado'}
                      </S.Pill>
                    </S.ParticipantItem>
                  ))}
                </S.ParticipantList>
              </S.Card>
            ) : null}
          </S.Collapsible>

          <Section
            title="Gastos"
            description="Gastos registrados dentro del evento."
          >
            {event.expenses.length === 0 ? (
              <S.EmptyState>
                <S.CardTitle>Sin gastos todavia</S.CardTitle>
                <S.MutedText>
                  Carga el primer gasto y selecciona quien lo pago.
                </S.MutedText>
              </S.EmptyState>
            ) : (
              <S.CardGrid>
                {event.expenses.map((expense) => (
                  <S.Card key={expense.id}>
                    <S.CardHeader>
                      <S.CardTitle>{expense.title}</S.CardTitle>
                      <S.MutedText>
                        {expense.description || 'Sin descripcion'}
                      </S.MutedText>
                    </S.CardHeader>
                    <S.Meta>
                      <S.Pill>{formatAmount(expense.amount)}</S.Pill>
                      <S.Pill>
                        {getParticipantName(
                          event.participants,
                          expense.paidByParticipantId,
                        )}
                      </S.Pill>
                    </S.Meta>
                    <S.Actions>
                      <LinkButton
                        tone="neutral"
                        to={`/eventos/${event.id}/gastos/${expense.id}/editar`}
                      >
                        Editar
                      </LinkButton>
                      <Button
                        loading={deleteExpenseState.isLoading}
                        size="sm"
                        type="button"
                        variant="tertiary"
                        onClick={() => setExpenseToDelete(expense)}
                      >
                        Eliminar
                      </Button>
                    </S.Actions>
                  </S.Card>
                ))}
              </S.CardGrid>
            )}
          </Section>
        </S.DetailColumn>
      </S.DetailGrid>

      <S.FloatingActionBar aria-label="Acciones del evento">
        <S.FloatingActionLink to={`/eventos/${event.id}/gastos/nuevo`}>
          Gasto
        </S.FloatingActionLink>
        <S.FloatingActionButton type="button" onClick={handleCopyShareLink}>
          Compartir
        </S.FloatingActionButton>
        <S.FloatingActionLink to={`/eventos/${event.id}/editar`}>
          Editar
        </S.FloatingActionLink>
        <S.FloatingActionButton
          $danger
          disabled={deleteEventState.isLoading}
          type="button"
          onClick={handleDeleteEvent}
        >
          Eliminar
        </S.FloatingActionButton>
      </S.FloatingActionBar>

      <Modal
        open={Boolean(expenseToDelete)}
        title="Eliminar gasto"
        footer={
          <>
            <Button
              disabled={deleteExpenseState.isLoading}
              type="button"
              variant="secondary"
              onClick={() => setExpenseToDelete(null)}
            >
              Cancelar
            </Button>
            <Button
              loading={deleteExpenseState.isLoading}
              type="button"
              variant="danger"
              onClick={handleDeleteExpense}
            >
              Eliminar
            </Button>
          </>
        }
        onClose={() => setExpenseToDelete(null)}
      >
        {expenseToDelete ? (
          <>
            Vas a eliminar el gasto <strong>{expenseToDelete.title}</strong> por{' '}
            {formatAmount(expenseToDelete.amount)}. Esta accion no se puede
            deshacer.
          </>
        ) : null}
      </Modal>
    </Page>
  )
}
