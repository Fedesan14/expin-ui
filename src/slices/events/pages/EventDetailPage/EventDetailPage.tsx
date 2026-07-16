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
  useCalculateEventSettlementMutation,
  useCloseEventMutation,
  useDeleteEventExpenseMutation,
  useDeleteEventMutation,
  useGetEventQuery,
} from '../../api/eventsApi'
import { getApiStatus, getEventsErrorMessage } from '../../model/apiErrors'
import {
  formatAmount,
  formatDateRange,
} from '../../model/formatters'
import type { EventExpenseResponse } from '../../model/types'
import * as S from '../../components/EventControls/EventControls.styles'
import Settlement from '../../components/Settlement/Settlement'
import ExpenseCard from '../../components/ExpenseCard/ExpenseCard'

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
  const [showExpenses, setShowExpenses] = useState(false)
  const [showSettlementBalances, setShowSettlementBalances] = useState(false)
  const { data: event, error, isLoading } = useGetEventQuery(
    { eventId: eventId ?? '' },
    { skip: !eventId },
  )
  const [calculateSettlement, calculateSettlementState] = useCalculateEventSettlementMutation()
  const [deleteEvent, deleteEventState] = useDeleteEventMutation()
  const [deleteExpense, deleteExpenseState] = useDeleteEventExpenseMutation()
  const [closeEvent] = useCloseEventMutation();

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

  const handleCalculateSettlement = () => {
    setMessage(null)
    setShowSettlementBalances(false)
    calculateSettlement({
      eventId,
      body: { strategy: 'OWNER_CENTRIC' },
    }).catch(() => undefined)
  }

  const handleCompleteEvent = () => {
    if (!window.confirm('Cerrar evento? No podras agregar nuevos gastos.')) {
      return
    }    

    setMessage(null)
    closeEvent({eventId})
      .unwrap()
      .then(() => {
        setExpenseToDelete(null)
        setMessage({ tone: 'success', text: 'Evento cerrado.' })
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

  const EventDetailHeader = () => {
    return (
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
    )
  }

  return (
    <Page maxWidth="wide">
      <EventDetailHeader />
      {message ? <Alert tone={message.tone}>{message.text}</Alert> : null}

      <S.DetailGrid>
        <S.DetailColumn>
          <Section
            title="Liquidacion"
            action={
              event.status === 'COMPLETED' ? null : <Button
                loading={calculateSettlementState.isLoading}
                size="sm"
                type="button"
                onClick={handleCalculateSettlement}
              >
                Calcular
              </Button>
            }
          >
            {calculateSettlementState.error ? (
              <Alert tone="danger">
                {getEventsErrorMessage(calculateSettlementState.error)}
              </Alert>
            ) : null}

              <Settlement 
                settlement={calculateSettlementState.data || event.eventSettlementResponse} 
                showSettlementBalances={showSettlementBalances} 
                setShowSettlementBalances={setShowSettlementBalances} 
              />
          </Section>

          <S.Collapsible>
            <S.CollapsibleButton
              aria-controls="event-expenses"
              aria-expanded={showExpenses}
              type="button"
              onClick={() => setShowExpenses((current) => !current)}
            >
              <S.CollapsibleTitle>
                <S.CollapsibleLabel>Gastos</S.CollapsibleLabel>
                <S.CollapsibleHint>
                  {showExpenses
                    ? 'Ocultar gastos registrados'
                    : `${event.expenses.length} gastos registrados`}
                </S.CollapsibleHint>
              </S.CollapsibleTitle>
              <S.CollapsibleIcon $open={showExpenses} aria-hidden="true">
                +
              </S.CollapsibleIcon>
            </S.CollapsibleButton>

            {showExpenses ? (
              event.expenses.length === 0 ? (
                <S.EmptyState id="event-expenses">
                  <S.CardTitle>Sin gastos todavia</S.CardTitle>
                  <S.MutedText>
                    Carga el primer gasto y selecciona quien lo pago.
                  </S.MutedText>
                </S.EmptyState>
              ) : (
                <S.CardGrid id="event-expenses">
                  {event.expenses.map((expense) => (
                    <ExpenseCard 
                      event={event} 
                      expense={expense} 
                      isLoadingDelete={deleteEventState.isLoading} 
                      setExpenseToDelete={setExpenseToDelete} 
                    />
                  ))}
                </S.CardGrid>
              )
            ) : null}
          </S.Collapsible>

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
        </S.DetailColumn>
      </S.DetailGrid>

      <S.FloatingActionBar aria-label="Acciones del evento">
        <S.FloatingActionLink to={`/eventos/${event.id}/gastos/nuevo`}>
          Gasto
        </S.FloatingActionLink>
        <S.FloatingActionButton type="button" onClick={handleCopyShareLink}>
          Compartir
        </S.FloatingActionButton>
        { (event.status !== 'COMPLETED') && (
          <S.FloatingActionButton
            disabled={deleteEventState.isLoading}
            type="button"
            onClick={handleCompleteEvent}
          >
            Completar
          </S.FloatingActionButton>
        )
        }
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
