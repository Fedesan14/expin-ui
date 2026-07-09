import * as yup from 'yup'
import type { EventExpenseFormValues, EventFormValues } from './types'

const optionalDate = yup.string().trim().default('')

export const eventSchema: yup.ObjectSchema<EventFormValues> = yup.object({
  title: yup
    .string()
    .trim()
    .max(255, 'El titulo no puede superar 255 caracteres.')
    .required('El titulo es requerido.'),
  description: yup
    .string()
    .trim()
    .max(1000, 'La descripcion no puede superar 1000 caracteres.')
    .default(''),
  startDate: optionalDate,
  endDate: optionalDate.test(
    'end-after-start',
    'La fecha de fin no puede ser anterior a la fecha de inicio.',
    (endDate, context) => {
      const startDate = context.parent.startDate as string

      if (!startDate || !endDate) {
        return true
      }

      return endDate >= startDate
    },
  ),
  participants: yup
    .array(
      yup.object({
        userId: yup.string().default(''),
        username: yup.string().default(''),
        email: yup.string().default(''),
        guestName: yup
          .string()
          .trim()
          .max(255, 'El nombre no puede superar 255 caracteres.')
          .default(''),
      }),
    )
    .default([]),
})

export const eventExpenseSchema: yup.ObjectSchema<EventExpenseFormValues> =
  yup.object({
    title: yup
      .string()
      .trim()
      .max(255, 'El titulo no puede superar 255 caracteres.')
      .required('El titulo es requerido.'),
    description: yup
      .string()
      .trim()
      .max(1000, 'La descripcion no puede superar 1000 caracteres.')
      .default(''),
    amount: yup
      .string()
      .trim()
      .required('Ingresa un monto.')
      .test('positive-amount', 'El monto debe ser mayor a cero.', (value) => {
        if (!value) {
          return false
        }

        const normalized = value.replace(',', '.')
        return Number.isFinite(Number(normalized)) && Number(normalized) > 0
      }),
    paidByParticipantId: yup
      .string()
      .required('Selecciona quien pago el gasto.'),
    owedByParticipantIds: yup
      .array(yup.string().required())
      .min(1, 'Selecciona al menos un participante que deba este gasto.')
      .required('Selecciona quienes deben este gasto.'),
  })
