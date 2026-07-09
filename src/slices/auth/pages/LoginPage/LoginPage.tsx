import { useEffect, useRef, useState } from 'react'
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
import { useAutologinMutation, useLoginMutation } from '../../api/authApi'
import { storeSession } from '../../model/authSlice'
import {
  canUsePlatformBiometrics,
  clearQuickLoginCredential,
  readQuickLoginCredential,
  registerQuickLoginCredential,
  verifyQuickLoginCredential,
} from '../../model/quickLogin'
import {
  clearRememberedUsername,
  readRememberedUsername,
  writeLastLoginUsername,
  writeRememberedUsername,
} from '../../model/rememberedLogin'
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
  const [quickLoginEnabled, setQuickLoginEnabled] = useState(false)
  const [quickLoginAvailable, setQuickLoginAvailable] = useState(false)
  const [rememberUsername, setRememberUsername] = useState(() =>
    Boolean(readRememberedUsername()),
  )
  const quickLoginAttemptedRef = useRef(false)
  const [login, loginState] = useLoginMutation()
  const [autologin, autologinState] = useAutologinMutation()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginRequest>({
    defaultValues: {
      identifier: readRememberedUsername(),
      password: '',
    },
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    canUsePlatformBiometrics().then(setQuickLoginAvailable)
  }, [])

  useEffect(() => {
    if (quickLoginAttemptedRef.current || !quickLoginAvailable) {
      return
    }

    if (!readQuickLoginCredential()) {
      return
    }

    quickLoginAttemptedRef.current = true

    verifyQuickLoginCredential()
      .then((credential) => {
        if (!credential) {
          return null
        }

        return autologin({
          autologinHash: credential.autologinHash,
          username: credential.username,
        }).unwrap()
      })
      .then((session) => {
        if (!session) {
          return
        }

        dispatch(storeSession(session))
        navigate(redirectTo, { replace: true })
      })
      .catch((error) => {
        const status =
          typeof error === 'object' && error !== null && 'status' in error
            ? Number((error as { status: unknown }).status)
            : null

        if (status === 401) {
          clearQuickLoginCredential()
          setMessage({
            tone: 'danger',
            text: 'El ingreso rápido ya no es válido. Inicia sesión nuevamente.',
          })
          return
        }

        setMessage({
          tone: 'danger',
          text: 'No pudimos validar el ingreso rápido. Inicia sesión manualmente.',
        })
      })
  }, [autologin, dispatch, navigate, quickLoginAvailable, redirectTo])

  const handleLogin = (values: LoginRequest) => {
    setMessage(null)

    const identifier = values.identifier.trim()
    const quickLoginRegistration = quickLoginEnabled
      ? registerQuickLoginCredential(identifier)
      : Promise.resolve(null)

    quickLoginRegistration
      .then((credential) =>
        login({
          identifier,
          password: values.password,
          autologinHash: credential?.autologinHash,
        }).unwrap(),
      )
      .then((session) => {
        writeLastLoginUsername(identifier)

        if (rememberUsername) {
          writeRememberedUsername(identifier)
        } else {
          clearRememberedUsername()
        }

        dispatch(storeSession(session))
        reset()
        navigate(redirectTo, { replace: true })
      })
      .catch((error) => {
        if (quickLoginEnabled) {
          clearQuickLoginCredential()
        }

        if (error instanceof Error && error.message === 'BIOMETRICS_UNAVAILABLE') {
          setMessage({
            tone: 'danger',
            text: 'Este dispositivo no permite activar el ingreso rápido.',
          })
          return
        }

        if (
          error instanceof DOMException &&
          (error.name === 'AbortError' || error.name === 'NotAllowedError')
        ) {
          setMessage({
            tone: 'danger',
            text: 'No se activó el ingreso rápido porque se canceló la validación.',
          })
          return
        }

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
              label="Contraseña"
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
            <S.QuickLoginOption>
              <span>Recordar usuario</span>
              <S.SwitchInput
                checked={rememberUsername}
                onChange={(event) =>
                  setRememberUsername(event.currentTarget.checked)
                }
                type="checkbox"
              />
              <S.SwitchTrack $checked={rememberUsername} aria-hidden="true" />
            </S.QuickLoginOption>
            {quickLoginAvailable ? (
              <S.QuickLoginOption>
                <span>Activar tu ingreso rápido</span>
                <S.SwitchInput
                  checked={quickLoginEnabled}
                  onChange={(event) =>
                    setQuickLoginEnabled(event.currentTarget.checked)
                  }
                  type="checkbox"
                />
                <S.SwitchTrack $checked={quickLoginEnabled} aria-hidden="true" />
              </S.QuickLoginOption>
            ) : null}
            <Button
              fullWidth
              loading={loginState.isLoading || autologinState.isLoading}
              type="submit"
            >
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
