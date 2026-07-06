import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
    <S.AuthLayout>
      <S.AuthPanel>
        {message ? (
          <S.StatusMessage $tone={message.tone}>{message.text}</S.StatusMessage>
        ) : null}

        <S.Form onSubmit={handleSubmit(handleSignup)}>
          <S.Field>
            Usuario
            <S.Input
              autoComplete="username"
              maxLength={30}
              type="text"
              {...register('username')}
            />
            {errors.username?.message ? (
              <S.ErrorText>{errors.username.message}</S.ErrorText>
            ) : null}
          </S.Field>
          <S.Field>
            Email
            <S.Input
              autoComplete="email"
              maxLength={255}
              type="email"
              {...register('email')}
            />
            {errors.email?.message ? (
              <S.ErrorText>{errors.email.message}</S.ErrorText>
            ) : null}
          </S.Field>
          <S.Field>
            Contraseña
            <S.Input
              autoComplete="new-password"
              maxLength={72}
              minLength={8}
              type="password"
              {...register('password')}
            />
            {errors.password?.message ? (
              <S.ErrorText>{errors.password.message}</S.ErrorText>
            ) : null}
          </S.Field>
          <S.SubmitButton disabled={signupState.isLoading} type="submit">
            {signupState.isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </S.SubmitButton>
          <S.SwitchPrompt>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </S.SwitchPrompt>
        </S.Form>
      </S.AuthPanel>
    </S.AuthLayout>
  )
}
