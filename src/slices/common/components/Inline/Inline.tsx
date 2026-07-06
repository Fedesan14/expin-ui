import type { HTMLAttributes } from "react"
import type { AppTheme } from "../../../../app/theme/theme"
import * as S from "./Inline.styles"

type SpaceKey = keyof AppTheme["space"]

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: SpaceKey
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between"
  wrap?: boolean
}

export function Inline({
  gap = "3",
  align = "center",
  justify = "start",
  wrap = false,
  children,
  ...rest
}: InlineProps) {
  return (
    <S.Root $gap={gap} $align={align} $justify={justify} $wrap={wrap} {...rest}>
      {children}
    </S.Root>
  )
}
