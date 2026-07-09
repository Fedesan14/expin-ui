import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import type {
  Control,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { Button } from '../../../common/components/Button'
import { FormField } from '../../../common/components/FormField'
import { TextInput } from '../../../common/components/TextInput'
import { useLazyFindUserByIdentifierQuery } from '../../api/eventsApi'
import { eventSchema } from '../../model/schemas'
import type {
  EventFormValues,
  UserResponse,
  UserSearchResponse,
} from '../../model/types'
import * as S from '../EventControls/EventControls.styles'

export type EventFormSubmitValues = {
  values: EventFormValues
}

type EventFormProps = {
  defaultValues?: EventFormValues
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

function getUserSearchResults(response?: UserSearchResponse) {
  if (!response) {
    return []
  }

  if (Array.isArray(response)) {
    return response
  }

  if ('content' in response) {
    return response.content
  }

  return [response]
}

type ParticipantLookupFieldProps = {
  control: Control<EventFormValues>
  error?: string
  index: number
  onRemove: () => void
  register: UseFormRegister<EventFormValues>
  setValue: UseFormSetValue<EventFormValues>
}

function ParticipantLookupField({
  control,
  error,
  index,
  onRemove,
  register,
  setValue,
}: ParticipantLookupFieldProps) {
  const [findUser, findUserState] = useLazyFindUserByIdentifierQuery()
  const blurTimeoutRef = useRef<number | null>(null)
  const [lookupActive, setLookupActive] = useState(false)
  const participant = useWatch({
    control,
    name: `participants.${index}`,
  })
  const guestName = participant?.guestName
  const selectedUserId = participant?.userId
  const selectedUsername = participant?.username
  const selectedEmail = participant?.email
  const participantInput = register(`participants.${index}.guestName`)
  const identifier = typeof guestName === 'string' ? guestName.trim() : ''
  const canSearch = identifier.length >= 3 && !selectedUserId
  const lookupMatchesCurrentIdentifier =
    findUserState.originalArgs?.identifier === identifier
  const foundUsers = lookupMatchesCurrentIdentifier
    ? getUserSearchResults(findUserState.data)
    : []
  const shouldShowLookup = lookupActive && !selectedUserId
  const shouldShowGuestPill =
    !selectedUserId && !lookupActive && identifier.length > 0

  useEffect(() => {
    if (!canSearch) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      void findUser({ identifier })
    }, 600)

    return () => window.clearTimeout(timeoutId)
  }, [canSearch, findUser, identifier])

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        window.clearTimeout(blurTimeoutRef.current)
      }
    }
  }, [])

  const handleSelectUser = (user: UserResponse) => {
    if (blurTimeoutRef.current) {
      window.clearTimeout(blurTimeoutRef.current)
    }

    setLookupActive(false)
    setValue(`participants.${index}.userId`, user.id, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setValue(`participants.${index}.username`, user.username, {
      shouldDirty: true,
    })
    setValue(`participants.${index}.email`, user.email, {
      shouldDirty: true,
    })
    setValue(`participants.${index}.guestName`, user.username, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const handleChange: typeof participantInput.onChange = async (event) => {
    setLookupActive(true)
    const changeResult = await participantInput.onChange(event)

    if (selectedUserId) {
      setValue(`participants.${index}.userId`, '', {
        shouldDirty: true,
        shouldValidate: true,
      })
      setValue(`participants.${index}.username`, '', { shouldDirty: true })
      setValue(`participants.${index}.email`, '', { shouldDirty: true })
    }

    return changeResult
  }

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      window.clearTimeout(blurTimeoutRef.current)
    }

    setLookupActive(true)
  }

  const handleBlur: typeof participantInput.onBlur = async (event) => {
    const blurResult = await participantInput.onBlur(event)

    blurTimeoutRef.current = window.setTimeout(() => {
      setLookupActive(false)
    }, 120)

    return blurResult
  }

  if (selectedUserId) {
    const displayName = selectedUsername || identifier
    const detail = selectedEmail || 'Usuario'

    return (
      <S.ParticipantEntry>
        <S.SelectedParticipantPill>
          <S.UserLookupBody>
            <S.UserLookupName>{displayName}</S.UserLookupName>
            <S.UserLookupEmail>{detail}</S.UserLookupEmail>
          </S.UserLookupBody>
          <S.CompactButtonSlot>
            <Button
              aria-label={`Quitar ${displayName || 'usuario'}`}
              size="sm"
              type="button"
              variant="tertiary"
              onClick={onRemove}
            >
              Quitar
            </Button>
          </S.CompactButtonSlot>
        </S.SelectedParticipantPill>
      </S.ParticipantEntry>
    )
  }

  if (shouldShowGuestPill) {
    return (
      <S.ParticipantEntry>
        <S.SelectedParticipantPill>
          <S.UserLookupBody>
            <S.UserLookupName>{identifier}</S.UserLookupName>
            <S.UserLookupEmail>Invitado</S.UserLookupEmail>
          </S.UserLookupBody>
          <S.CompactButtonSlot>
            <Button
              aria-label={`Quitar ${identifier}`}
              size="sm"
              type="button"
              variant="tertiary"
              onClick={onRemove}
            >
              Quitar
            </Button>
          </S.CompactButtonSlot>
        </S.SelectedParticipantPill>
      </S.ParticipantEntry>
    )
  }

  return (
    <S.ParticipantEntry>
      <S.InlineField>
        <S.LookupField>
          <FormField label={`Invitado ${index + 1}`} error={error}>
            <TextInput
              error={Boolean(error)}
              maxLength={255}
              type="text"
              {...participantInput}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </FormField>

          {shouldShowLookup && findUserState.isFetching ? (
            <S.LookupStatus>Buscando usuario...</S.LookupStatus>
          ) : null}

          {shouldShowLookup && foundUsers.length > 0 ? (
            <S.UserLookupList>
              {foundUsers.map((user) => (
                <S.UserLookupCard key={user.id}>
                  <S.UserLookupBody>
                    <S.UserLookupName>{user.username}</S.UserLookupName>
                    <S.UserLookupEmail>{user.email}</S.UserLookupEmail>
                  </S.UserLookupBody>
                  <S.CompactButtonSlot>
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      onClick={() => handleSelectUser(user)}
                    >
                      Seleccionar
                    </Button>
                  </S.CompactButtonSlot>
                </S.UserLookupCard>
              ))}
            </S.UserLookupList>
          ) : null}

          {shouldShowLookup &&
          lookupMatchesCurrentIdentifier &&
          findUserState.isError ? (
            <S.LookupStatus>
              No encontramos un usuario para ese identificador.
            </S.LookupStatus>
          ) : null}
        </S.LookupField>
        <S.CompactButtonSlot>
          <Button
            aria-label={`Quitar invitado ${index + 1}`}
            size="sm"
            type="button"
            variant="tertiary"
            onClick={onRemove}
          >
            Quitar
          </Button>
        </S.CompactButtonSlot>
      </S.InlineField>
    </S.ParticipantEntry>
  )
}

export function EventForm({
  defaultValues = emptyValues,
  loading = false,
  submitLabel,
  onSubmit,
}: EventFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
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
      onSubmit={handleSubmit((values) => onSubmit({ values }))}
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

      <S.CopyBox>
        <S.CardHeader>
          <S.CardTitle>Invitados</S.CardTitle>
          <S.MutedText>
            Escribe un nombre de invitado o busca por usuario/email para asociar
            un usuario existente.
          </S.MutedText>
        </S.CardHeader>

        <S.ParticipantList>
          {fields.map((field, index) => (
            <ParticipantLookupField
              key={field.id}
              control={control}
              error={errors.participants?.[index]?.guestName?.message}
              index={index}
              onRemove={() => remove(index)}
              register={register}
              setValue={setValue}
            />
          ))}
        </S.ParticipantList>

        <S.Actions>
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={() =>
              append({ email: '', guestName: '', userId: '', username: '' })
            }
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
