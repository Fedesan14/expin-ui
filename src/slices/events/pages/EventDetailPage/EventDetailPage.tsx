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
  useDeleteEventExpenseMutation,
  useDeleteEventMutation,
  useGetEventQuery,
} from '../../api/eventsApi'
import { getApiStatus, getEventsErrorMessage } from '../../model/apiErrors'
import {
  formatAmount,
  formatDateRange,
  formatSettlementStrategy,
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

function getOwedByLabel(
  participants: EventExpenseResponse['owedByParticipantIds'],
  eventParticipants: Parameters<typeof getParticipantName>[0],
) {
  if (participants.length === 0) {
    return 'Sin deudores asignados'
  }

  return participants
    .map((participantId) => getParticipantName(eventParticipants, participantId))
    .join(', ')
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
  const [calculateSettlement, calculateSettlementState] =
    useCalculateEventSettlementMutation()
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

  const handleCalculateSettlement = () => {
    setMessage(null)
    setShowSettlementBalances(false)
    calculateSettlement({
      eventId,
      body: { strategy: 'OWNER_CENTRIC' },
    }).catch(() => undefined)
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
          <Section
            title="Liquidacion"
            action={
              <Button
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

            {calculateSettlementState.data ? (
              <S.Card>
                <S.SummaryBar>
                  <S.SummaryItem $tone="expense">
                    <S.SummaryLabel>Total</S.SummaryLabel>
                    <S.SummaryValue>
                      {formatAmount(calculateSettlementState.data.totalAmount)}
                    </S.SummaryValue>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <S.SummaryLabel>Participantes</S.SummaryLabel>
                    <S.SummaryValue>
                      {calculateSettlementState.data.participantCount}
                    </S.SummaryValue>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <S.SummaryLabel>Estrategia</S.SummaryLabel>
                    <S.SummaryValue>
                      {formatSettlementStrategy(
                        calculateSettlementState.data.strategy,
                      )}
                    </S.SummaryValue>
                  </S.SummaryItem>
                </S.SummaryBar>

                <S.CardHeader>
                  <S.CardTitle>Transferencias sugeridas</S.CardTitle>
                </S.CardHeader>
                {calculateSettlementState.data.transfers.length === 0 ? (
                  <S.EmptyState>
                    <S.CardTitle>Evento saldado</S.CardTitle>
                    <S.MutedText>No hay transferencias pendientes.</S.MutedText>
                  </S.EmptyState>
                ) : (
                  <S.ParticipantList>
                    {calculateSettlementState.data.transfers.map((transfer) => (
                      <S.TransferItem
                        key={`${transfer.fromParticipantId}-${transfer.toParticipantId}-${transfer.amount}`}
                      >
                        {transfer.fromDisplayName} debe transferir{' '}
                        <strong>{formatAmount(transfer.amount)}</strong> a{' '}
                        {transfer.toDisplayName}.
                      </S.TransferItem>
                    ))}
                  </S.ParticipantList>
                )}

                <S.Collapsible>
                  <S.CollapsibleButton
                    aria-controls="event-settlement-balances"
                    aria-expanded={showSettlementBalances}
                    type="button"
                    onClick={() =>
                      setShowSettlementBalances((current) => !current)
                    }
                  >
                    <S.CollapsibleTitle>
                      <S.CollapsibleLabel>Balances</S.CollapsibleLabel>
                      <S.CollapsibleHint>
                        {showSettlementBalances
                          ? 'Ocultar balances'
                          : 'Ver importes por participante'}
                      </S.CollapsibleHint>
                    </S.CollapsibleTitle>
                    <S.CollapsibleIcon
                      $open={showSettlementBalances}
                      aria-hidden="true"
                    >
                      +
                    </S.CollapsibleIcon>
                  </S.CollapsibleButton>

                  {showSettlementBalances ? (
                    <S.ParticipantList id="event-settlement-balances">
                      {calculateSettlementState.data.balances.map((balance) => (
                        <S.BalanceItem key={balance.participantId}>
                          <S.BalanceName>{balance.displayName}</S.BalanceName>
                          <S.BalanceMetric>
                            <S.BalanceMetricLabel>Pago</S.BalanceMetricLabel>
                            {formatAmount(balance.paidAmount)}
                          </S.BalanceMetric>
                          <S.BalanceMetric>
                            <S.BalanceMetricLabel>Debe</S.BalanceMetricLabel>
                            {formatAmount(balance.owedAmount)}
                          </S.BalanceMetric>
                          <S.BalanceMetric>
                            <S.BalanceMetricLabel>Balance</S.BalanceMetricLabel>
                            <S.BalanceAmount
                              $tone={
                                balance.balance > 0
                                  ? 'positive'
                                  : balance.balance < 0
                                    ? 'negative'
                                    : 'neutral'
                              }
                            >
                              {formatAmount(balance.balance)}
                            </S.BalanceAmount>
                          </S.BalanceMetric>
                        </S.BalanceItem>
                      ))}
                    </S.ParticipantList>
                  ) : null}
                </S.Collapsible>
              </S.Card>
            ) : (
              <S.EmptyState>
                <S.CardTitle>Sin liquidacion calculada</S.CardTitle>
                <S.MutedText>
                  Ejecuta el calculo para ver balances y transferencias sugeridas.
                </S.MutedText>
              </S.EmptyState>
            )}
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
                    <S.Card key={expense.id}>
                      <S.CardHeader>
                        <S.CardTitle>{expense.title}</S.CardTitle>
                        <S.MutedText>
                          {expense.description || 'Sin descripcion'}
                        </S.MutedText>
                      </S.CardHeader>
                      <S.Meta>
                        <S.Pill $tone="expense">
                          {formatAmount(expense.amount)}
                        </S.Pill>
                        <S.Pill>
                          {getParticipantName(
                            event.participants,
                            expense.paidByParticipantId,
                          )}
                        </S.Pill>
                      </S.Meta>
                      <S.MutedText>
                        Deben:{' '}
                        {getOwedByLabel(
                          expense.owedByParticipantIds,
                          event.participants,
                        )}
                      </S.MutedText>
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
