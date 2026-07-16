import type { Dispatch, SetStateAction } from 'react'
import * as S from '../../components/EventControls/EventControls.styles'
import type { EventSettlementResponse } from '../../model/types'
import { formatAmount, formatSettlementStrategy } from '../../model/formatters'

const Settlement = (
  {settlement, showSettlementBalances, setShowSettlementBalances}: 
  { settlement?: EventSettlementResponse, showSettlementBalances: boolean, setShowSettlementBalances: Dispatch<SetStateAction<boolean>>}  
) => {
  return (
    settlement ? (
    <S.Card>
      <S.SummaryBar>
        <S.SummaryItem $tone="expense">
          <S.SummaryLabel>Total</S.SummaryLabel>
          <S.SummaryValue>
            {formatAmount(settlement.totalAmount)}
          </S.SummaryValue>
        </S.SummaryItem>
        <S.SummaryItem>
          <S.SummaryLabel>Participantes</S.SummaryLabel>
          <S.SummaryValue>
            {settlement.participantCount}
          </S.SummaryValue>
        </S.SummaryItem>
        <S.SummaryItem>
          <S.SummaryLabel>Estrategia</S.SummaryLabel>
          <S.SummaryValue>
            {formatSettlementStrategy(
              settlement.strategy,
            )}
          </S.SummaryValue>
        </S.SummaryItem>
      </S.SummaryBar>

      <S.CardHeader>
        <S.CardTitle>Transferencias sugeridas</S.CardTitle>
      </S.CardHeader>
      {settlement.transfers.length === 0 ? (
        <S.EmptyState>
          <S.CardTitle>Evento saldado</S.CardTitle>
          <S.MutedText>No hay transferencias pendientes.</S.MutedText>
        </S.EmptyState>
      ) : (
        <S.ParticipantList>
          {settlement.transfers.map((transfer) => (
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
            {settlement.balances.map((balance) => (
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
    )
  )
}

export default Settlement;