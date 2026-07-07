import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '../../../common/components/Button'
import { FormField } from '../../../common/components/FormField'
import { TextInput } from '../../../common/components/TextInput'
import { eventSchema } from '../../model/schemas'
import type {
  EventFormValues,
  EventParticipantRequest,
  EventParticipantResponse,
} from '../../model/types'
import * as S from '../EventControls/EventControls.styles'

export type EventFormSubmitValues = {
  values: EventFormValues
  preservedParticipants: EventParticipantRequest[]
}

type EventFormProps = {
  defaultValues?: EventFormValues
  existingParticipants?: EventParticipantResponse[]
  loading?: boolean
  submitLabel: string
  onSubmit: (data: EventFormSubmitValues) => void
}

const emptyValues: EventFormValues = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  participants: [],
}

export function EventForm({
  defaultValues = emptyValues,
  existingParticipants = [],
  loading = false,
  submitLabel,
  onSubmit,
}: EventFormProps) {
  const userParticipants = existingParticipants.filter(
    (participant) => participant.userId,
  )
  const preservedParticipants = userParticipants.map((participant) => ({
    userId: participant.userId,
  }))
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EventFormValues>({
    defaultValues,
    resolver: yupResolver(eventSchema),
  })
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'participants',
  })

  return (
    <S.Form
      onSubmit={handleSubmit((values) =>
        onSubmit({ values, preservedParticipants }),
      )}
    >
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
        <FormField label="Fecha de inicio" error={errors.startDate?.message}>
          <TextInput
            error={Boolean(errors.startDate)}
            type="date"
            {...register('startDate')}
          />
        </FormField>
        <FormField label="Fecha de fin" error={errors.endDate?.message}>
          <TextInput
            error={Boolean(errors.endDate)}
            type="date"
            {...register('endDate')}
          />
        </FormField>
      </S.FieldRow>

      {userParticipants.length > 0 ? (
        <S.CopyBox>
          <S.MutedText>
            Los participantes con usuario se conservaran al guardar.
          </S.MutedText>
          <S.ParticipantList>
            {userParticipants.map((participant) => (
              <S.ParticipantItem key={participant.id}>
                <span>{participant.displayName}</span>
                <S.Pill>Usuario</S.Pill>
              </S.ParticipantItem>
            ))}
          </S.ParticipantList>
        </S.CopyBox>
      ) : null}

      <S.CopyBox>
        <S.CardHeader>
          <S.CardTitle>Invitados</S.CardTitle>
          <S.MutedText>
            Agrega invitados por nombre. No se enviaran campos vacios.
          </S.MutedText>
        </S.CardHeader>

        <S.ParticipantList>
          {fields.map((field, index) => (
            <S.InlineField key={field.id}>
              <FormField
                label={`Invitado ${index + 1}`}
                error={errors.participants?.[index]?.guestName?.message}
              >
                <TextInput
                  error={Boolean(errors.participants?.[index]?.guestName)}
                  maxLength={255}
                  type="text"
                  {...register(`participants.${index}.guestName`)}
                />
              </FormField>
              <Button
                aria-label={`Quitar invitado ${index + 1}`}
                size="sm"
                type="button"
                variant="tertiary"
                onClick={() => remove(index)}
              >
                Quitar
              </Button>
            </S.InlineField>
          ))}
        </S.ParticipantList>

        <S.Actions>
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={() => append({ guestName: '' })}
          >
            Agregar invitado
          </Button>
        </S.Actions>
      </S.CopyBox>

      <S.Actions>
        <Button loading={loading} type="submit">
          {submitLabel}
        </Button>
      </S.Actions>
    </S.Form>
  )
}
