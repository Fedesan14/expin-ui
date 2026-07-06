import { forwardRef } from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Spinner } from "../Spinner"
import * as S from "./Button.styles"
import type { ButtonVariant, ButtonSize } from "./Button.styles"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  iconBefore?: ReactNode
  iconAfter?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    iconBefore,
    iconAfter,
    disabled,
    children,
    ...rest
  },
  ref,
) {
  const spinnerColor =
    variant === "primary" || variant === "danger" || variant === "success"
      ? "currentColor"
      : undefined

  return (
    <S.Root
      ref={ref}
      type={rest.type ?? "button"}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <S.Content $hidden={loading}>
        {iconBefore}
        {children}
        {iconAfter}
      </S.Content>
      {loading && (
        <S.LoaderOverlay>
          <Spinner size={size === "lg" ? 22 : 18} color={spinnerColor} />
        </S.LoaderOverlay>
      )}
    </S.Root>
  )
})
