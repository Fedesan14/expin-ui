import * as yup from 'yup'
import type { LoginRequest, SignupRequest } from './types'

export const loginSchema: yup.ObjectSchema<LoginRequest> = yup.object({
  identifier: yup
    .string()
    .trim()
    .required('Ingresa tu usuario o email.'),
  password: yup.string().required('Ingresa tu contraseña.'),
  autologinHash: yup.string().optional(),
})

export const signupSchema: yup.ObjectSchema<SignupRequest> = yup.object({
  username: yup
    .string()
    .trim()
    .max(30, 'El usuario no puede superar 30 caracteres.')
    .required('El usuario es requerido.'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(72, 'La contraseña no puede superar 72 caracteres.')
    .required('La contraseña es requerida.'),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email('Ingresa un email válido.')
    .max(255, 'El email no puede superar 255 caracteres.')
    .required('El email es requerido.'),
})
