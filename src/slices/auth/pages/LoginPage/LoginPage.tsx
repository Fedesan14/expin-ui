import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/store/hooks'
import { Alert } from '../../../common/components/Alert'
import { Button } from '../../../common/components/Button'
import { FormField } from '../../../common/components/FormField'
import { LinkButton } from '../../../common/components/LinkButton'
import { Page } from '../../../common/components/Page'
import { PasswordInput } from '../../../common/components/PasswordInput'
import { TextInput } from '../../../common/components/TextInput'
import { AuthForm as S } from '../../components/AuthForm'
import { useLoginMutation } from '../../api/authApi'
import { storeSession } from '../../model/authSlice'
import { loginSchema } from '../../model/schemas'
import type { LoginRequest } from '../../model/types'

type Message = {
  tone: 'danger' | 'success'
  text: string
} | null

type LocationState = {
  signupCompleted?: boolean
  from?: {
    pathname?: string
    search?: string
    hash?: string
  }
}

function getLoginErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as { status: unknown }).status)

    if (status === 401) {
      return 'El usuario o la contrasena no son validos.'
    }
  }

  return 'No pudimos iniciar sesion.'
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const locationState = location.state as LocationState | null
  const redirectTo = `${locationState?.from?.pathname ?? '/home'}${locationState?.from?.search ?? ''}${locationState?.from?.hash ?? ''}`
  const [message, setMessage] = useState<Message>(
    locationState?.signupCompleted
      ? { tone: 'success', text: 'Cuenta creada. Ya puedes iniciar sesion.' }
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

  const handleLogin = (values: LoginRequest) => {
    setMessage(null)

    login({ identifier: values.identifier.trim(), password: values.password })
      .unwrap()
      .then((session) => {
        dispatch(storeSession(session))
        reset()
        navigate(redirectTo, { replace: true })
      })
      .catch((error) => {
        setMessage({ tone: 'danger', text: getLoginErrorMessage(error) })
      })
  }

  return (
    <Page maxWidth="narrow">
      <S.AuthLayout>
        <S.AuthPanel>
          {message ? <Alert tone={message.tone}>{message.text}</Alert> : null}

          <S.Form onSubmit={handleSubmit(handleLogin)}>
            <FormField
              label="Usuario o email"
              error={errors.identifier?.message}
              required
            >
              <TextInput
                autoComplete="username"
                error={Boolean(errors.identifier)}
                maxLength={255}
                type="text"
                {...register('identifier')}
              />
            </FormField>
            <FormField
              label="Contrasena"
              error={errors.password?.message}
              required
            >
              <PasswordInput
                autoComplete="current-password"
                error={Boolean(errors.password)}
                maxLength={72}
                minLength={8}
                {...register('password')}
              />
            </FormField>
            <Button fullWidth loading={loginState.isLoading} type="submit">
              Iniciar sesion
            </Button>
            <S.SwitchPrompt>
              No tienes cuenta? <LinkButton to="/registro">Registrate</LinkButton>
            </S.SwitchPrompt>
          </S.Form>
        </S.AuthPanel>
      </S.AuthLayout>
    </Page>
  )
}
