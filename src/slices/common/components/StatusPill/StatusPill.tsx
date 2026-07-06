import type { HTMLAttributes } from "react"
import * as S from "./StatusPill.styles"
import type { StatusTone } from "./StatusPill.styles"

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone
  label: string
}

export function StatusPill({ tone = "neutral", label, ...rest }: StatusPillProps) {
  return (
    <S.Root $tone={tone} {...rest}>
      <S.Dot $tone={tone} aria-hidden="true" />
      {label}
    </S.Root>
  )
}
