import { forwardRef } from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import * as S from "./FloatingActionButton.styles"

export interface FloatingActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  /** Etiqueta accesible; se muestra como texto si `extended` */
  label: string
  extended?: boolean
  /** Ajusta la posición para no chocar con la bottom nav */
  hasBottomNav?: boolean
}

export const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(function FloatingActionButton(
  { icon, label, extended = false, hasBottomNav = true, ...rest },
  ref,
) {
  return (
    <S.Root
      ref={ref}
      type={rest.type ?? "button"}
      $extended={extended}
      $hasBottomNav={hasBottomNav}
      aria-label={label}
      title={label}
      {...rest}
    >
      {icon}
      {extended && <S.Text>{label}</S.Text>}
    </S.Root>
  )
})
