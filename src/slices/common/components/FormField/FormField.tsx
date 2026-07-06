import { cloneElement, useId } from 'react'
import type { ReactElement, ReactNode } from 'react'
import * as S from './FormField.styles'

export interface FormFieldProps {
  label: ReactNode
  children: ReactElement<{
    id?: string
    'aria-describedby'?: string
    'aria-invalid'?: boolean
  }>
  id?: string
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
}

export function FormField({
  label,
  children,
  id,
  hint,
  error,
  required = false,
}: FormFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const hintId = hint ? `${fieldId}-hint` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <S.Root>
      <S.Label htmlFor={fieldId}>
        {label} {required ? <S.RequiredMark aria-hidden="true">*</S.RequiredMark> : null}
      </S.Label>
      {cloneElement(children, {
        id: fieldId,
        'aria-describedby': describedBy,
        'aria-invalid': Boolean(error) || undefined,
      })}
      {hint ? <S.Hint id={hintId}>{hint}</S.Hint> : null}
      {error ? <S.Error id={errorId}>{error}</S.Error> : null}
    </S.Root>
  )
}
