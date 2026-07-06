import type { HTMLAttributes } from "react"
import type { AppTheme } from "../../../../app/theme/theme"
import * as S from "./Stack.styles"

type SpaceKey = keyof AppTheme["space"]

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Espacio vertical entre elementos (token de spacing) */
  gap?: SpaceKey
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between"
}

export function Stack({
  gap = "4",
  align = "stretch",
  justify = "start",
  children,
  ...rest
}: StackProps) {
  return (
    <S.Root $gap={gap} $align={align} $justify={justify} {...rest}>
      {children}
    </S.Root>
  )
}
