import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks'
import { AuthForm as S } from '../../components/AuthForm'
import { useLoginMutation } from '../../api/authApi'
import { clearSession, storeSession } from '../../model/authSlice'
import { loginSchema } from '../../model/schemas'
import type { LoginRequest } from '../../model/types'

type Message = {
  tone: 'danger' | 'success'
  text: string
} | null

type LocationState = {
  signupCompleted?: boolean
}

function getLoginErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as { status: unknown }).status)

    if (status === 401) {
      return 'El usuario o la contraseña no son válidos.'
    }
  }

  return 'No pudimos iniciar sesión.'
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const location = useLocation()
  const navigate = useNavigate()
  const locationState = location.state as LocationState | null
  const [message, setMessage] = useState<Message>(
    locationState?.signupCompleted
      ? { tone: 'success', text: 'Cuenta creada. Ya puedes iniciar sesión.' }
      : null,
  )
  const [login, loginState] = useLoginMutation()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginRequest>({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })
  const hasSession = Boolean(auth.sessionToken)

  const handleLogin = (values: LoginRequest) => {
    setMessage(null)

    login({ identifier: values.identifier.trim(), password: values.password })
      .unwrap()
      .then((session) => {
        dispatch(storeSession(session))
        reset()
        navigate('/home', { replace: true })
      })
      .catch((error) => {
        setMessage({ tone: 'danger', text: getLoginErrorMessage(error) })
      })
  }

  return (
    <S.AuthLayout>
      <S.AuthPanel>
        {message ? (
          <S.StatusMessage $tone={message.tone}>{message.text}</S.StatusMessage>
        ) : null}

        <S.Form onSubmit={handleSubmit(handleLogin)}>
          <S.Field>
            Usuario o email
            <S.Input
              autoComplete="username"
              maxLength={255}
              type="text"
              {...register('identifier')}
            />
            {errors.identifier?.message ? (
              <S.ErrorText>{errors.identifier.message}</S.ErrorText>
            ) : null}
          </S.Field>
          <S.Field>
            Contraseña
            <S.Input
              autoComplete="current-password"
              maxLength={72}
              minLength={8}
              type="password"
              {...register('password')}
            />
            {errors.password?.message ? (
              <S.ErrorText>{errors.password.message}</S.ErrorText>
            ) : null}
          </S.Field>
          <S.SubmitButton disabled={loginState.isLoading} type="submit">
            {loginState.isLoading ? 'Ingresando...' : 'Iniciar sesión'}
          </S.SubmitButton>
          <S.SwitchPrompt>
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </S.SwitchPrompt>
        </S.Form>

        {hasSession ? (
          <S.SessionPanel>
            <S.SessionText>
              Sesión activa hasta {auth.sessionTokenExpiresAt}.
            </S.SessionText>
            <S.SessionText>Tu acceso quedó listo para operar.</S.SessionText>
            <S.SecondaryButton
              type="button"
              onClick={() => dispatch(clearSession())}
            >
              Cerrar sesión local
            </S.SecondaryButton>
          </S.SessionPanel>
        ) : null}
      </S.AuthPanel>
    </S.AuthLayout>
  )
}
