import type { SetStateAction } from 'react'
import { Button } from '../../../common/components/Button'
import { LinkButton } from '../../../common/components/LinkButton'
import * as S from '../../components/EventControls/EventControls.styles'
import { formatAmount, getParticipantName } from '../../model/formatters'
import type { EventExpenseResponse, EventParticipantResponse, EventResponse } from '../../model/types'

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

interface ExpenseCardProp {
    event: EventResponse;
    expense: EventExpenseResponse;
    setExpenseToDelete: (value: SetStateAction<EventExpenseResponse | null>) => void;
    isLoadingDelete: boolean;
}

const ExpenseCard = ({event, expense, setExpenseToDelete, isLoadingDelete}: ExpenseCardProp) => {

    return (
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
                loading={isLoadingDelete}
                size="sm"
                type="button"
                variant="tertiary"
                onClick={() => setExpenseToDelete(expense)}
            >
                Eliminar
            </Button>
            </S.Actions>
        </S.Card>
    )
}

export default ExpenseCard;