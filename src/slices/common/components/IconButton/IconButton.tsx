import { forwardRef } from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Spinner } from "../Spinner"
import * as S from "./IconButton.styles"
import type { IconButtonVariant, IconButtonSize } from "./IconButton.styles"

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Etiqueta accesible obligatoria para el botón de icono */
  label: string
  icon: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  loading?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = "ghost", size = "md", loading = false, disabled, ...rest },
  ref,
) {
  return (
    <S.Root
      ref={ref}
      type={rest.type ?? "button"}
      $variant={variant}
      $size={size}
      aria-label={label}
      title={label}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={size === "sm" ? 16 : 18} color="currentColor" /> : icon}
    </S.Root>
  )
})
