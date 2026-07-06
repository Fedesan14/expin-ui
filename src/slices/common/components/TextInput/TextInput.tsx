import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import * as S from './TextInput.styles'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  iconBefore?: ReactNode
  iconAfter?: ReactNode
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ error = false, iconBefore, iconAfter, ...rest }, ref) {
    return (
      <S.Root>
        {iconBefore ? <S.Adornment $position="start">{iconBefore}</S.Adornment> : null}
        <S.Input
          ref={ref}
          $hasStartIcon={Boolean(iconBefore)}
          $hasEndIcon={Boolean(iconAfter)}
          $invalid={error}
          aria-invalid={error || undefined}
          {...rest}
        />
        {iconAfter ? <S.Adornment $position="end">{iconAfter}</S.Adornment> : null}
      </S.Root>
    )
  },
)
