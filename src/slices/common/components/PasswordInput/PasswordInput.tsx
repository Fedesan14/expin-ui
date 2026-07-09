import { forwardRef, useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { EyeIcon, EyeOffIcon } from '../../icons'
import * as S from './PasswordInput.styles'

export type PasswordInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type'
> & {
  error?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ error = false, disabled, ...props }, ref) {
    const [visible, setVisible] = useState(false)
    const Icon = visible ? EyeOffIcon : EyeIcon

    return (
      <S.Root>
        <S.Input
          ref={ref}
          $invalid={error}
          aria-invalid={error || undefined}
          disabled={disabled}
          type={visible ? 'text' : 'password'}
          {...props}
        />
        <S.ToggleButton
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          disabled={disabled}
          onClick={() => setVisible((currentVisible) => !currentVisible)}
          type="button"
        >
          <Icon size={18} aria-hidden="true" />
        </S.ToggleButton>
      </S.Root>
    )
  },
)
