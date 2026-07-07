import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button } from '../../../common/components/Button'
import { FormField } from '../../../common/components/FormField'
import { TextInput } from '../../../common/components/TextInput'
import { eventExpenseSchema } from '../../model/schemas'
import type {
  EventExpenseFormValues,
  EventParticipantResponse,
} from '../../model/types'
import * as S from '../EventControls/EventControls.styles'

type EventExpenseFormProps = {
  defaultValues?: EventExpenseFormValues
  loading?: boolean
  participants: EventParticipantResponse[]
  submitLabel: string
  onSubmit: (values: EventExpenseFormValues) => void
}

const emptyValues: EventExpenseFormValues = {
  title: '',
  description: '',
  amount: '',
  paidByParticipantId: '',
}

export function EventExpenseForm({
  defaultValues = emptyValues,
  loading = false,
  participants,
  submitLabel,
  onSubmit,
}: EventExpenseFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EventExpenseFormValues>({
    defaultValues,
    resolver: yupResolver(eventExpenseSchema),
  })

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Titulo" error={errors.title?.message} required>
        <TextInput
          error={Boolean(errors.title)}
          maxLength={255}
          type="text"
          {...register('title')}
        />
      </FormField>

      <FormField label="Descripcion" error={errors.description?.message}>
        <S.TextArea
          $invalid={Boolean(errors.description)}
          maxLength={1000}
          {...register('description')}
        />
      </FormField>

      <S.FieldRow>
        <FormField label="Monto" error={errors.amount?.message} required>
          <TextInput
            error={Boolean(errors.amount)}
            inputMode="decimal"
            min="0"
            step="0.01"
            type="number"
            {...register('amount')}
          />
        </FormField>
        <FormField
          label="Pagado por"
          error={errors.paidByParticipantId?.message}
          required
        >
          <S.Select
            $invalid={Boolean(errors.paidByParticipantId)}
            {...register('paidByParticipantId')}
          >
            <option value="">Selecciona participante</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.displayName}
              </option>
            ))}
          </S.Select>
        </FormField>
      </S.FieldRow>

      <S.Actions>
        <Button loading={loading} type="submit">
          {submitLabel}
        </Button>
      </S.Actions>
    </S.Form>
  )
}
