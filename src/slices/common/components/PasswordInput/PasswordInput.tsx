import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { TextInput } from '../TextInput'

export type PasswordInputProps = Omit<
  ComponentPropsWithoutRef<typeof TextInput>,
  'type'
>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    return <TextInput ref={ref} type="password" {...props} />
  },
)
