import type { HTMLAttributes, ReactNode } from "react"
import * as S from "./Badge.styles"
import type { BadgeTone, BadgeVariant } from "./Badge.styles"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  variant?: BadgeVariant
  icon?: ReactNode
}

export function Badge({
  tone = "neutral",
  variant = "soft",
  icon,
  children,
  ...rest
}: BadgeProps) {
  return (
    <S.Root $tone={tone} $variant={variant} {...rest}>
      {icon}
      {children}
    </S.Root>
  )
}
