import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../../../common/components/Alert'
import { Button } from '../../../common/components/Button'
import { FormField } from '../../../common/components/FormField'
import { LinkButton } from '../../../common/components/LinkButton'
import { Page } from '../../../common/components/Page'
import { PasswordInput } from '../../../common/components/PasswordInput'
import { TextInput } from '../../../common/components/TextInput'
import { AuthForm as S } from '../../components/AuthForm'
import { useSignupMutation } from '../../api/authApi'
import { signupSchema } from '../../model/schemas'
import type { SignupRequest } from '../../model/types'

type Message = {
  tone: 'danger' | 'success'
  text: string
} | null

function getSignupErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = Number((error as { status: unknown }).status)

    if (status === 400) {
      return 'Revisa los datos ingresados.'
    }

    if (status === 409) {
      return 'Ese usuario o email ya existen.'
    }
  }

  return 'No pudimos crear la cuenta.'
}

export function SignupPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState<Message>(null)
  const [signup, signupState] = useSignupMutation()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SignupRequest>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    resolver: yupResolver(signupSchema),
  })

  const handleSignup = (values: SignupRequest) => {
    setMessage(null)

    const request: SignupRequest = {
      username: values.username.trim(),
      password: values.password,
      email: values.email.trim().toLowerCase(),
    }

    signup(request)
      .unwrap()
      .then(() => {
        reset()
        navigate('/login', { state: { signupCompleted: true } })
      })
      .catch((error) => {
        setMessage({ tone: 'danger', text: getSignupErrorMessage(error) })
      })
  }

  return (
    <Page maxWidth="narrow">
      <S.AuthLayout>
        <S.AuthPanel>
          {message ? <Alert tone={message.tone}>{message.text}</Alert> : null}

          <S.Form onSubmit={handleSubmit(handleSignup)}>
            <FormField label="Usuario" error={errors.username?.message} required>
              <TextInput
                autoComplete="username"
                error={Boolean(errors.username)}
                maxLength={30}
                type="text"
                {...register('username')}
              />
            </FormField>
            <FormField label="Email" error={errors.email?.message} required>
              <TextInput
                autoComplete="email"
                error={Boolean(errors.email)}
                maxLength={255}
                type="email"
                {...register('email')}
              />
            </FormField>
            <FormField
              label="Contraseña"
              error={errors.password?.message}
              hint="Usa al menos 8 caracteres."
              required
            >
              <PasswordInput
                autoComplete="new-password"
                error={Boolean(errors.password)}
                maxLength={72}
                minLength={8}
                {...register('password')}
              />
            </FormField>
            <Button fullWidth loading={signupState.isLoading} type="submit">
              Crear cuenta
            </Button>
            <S.SwitchPrompt>
              ¿Ya tienes cuenta? <LinkButton to="/login">Inicia sesión</LinkButton>
            </S.SwitchPrompt>
          </S.Form>
        </S.AuthPanel>
      </S.AuthLayout>
    </Page>
  )
}
