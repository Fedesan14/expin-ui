import type { HTMLAttributes } from "react"
import * as S from "./Page.styles"

export interface PageProps extends HTMLAttributes<HTMLDivElement> {
  /** Ancho máximo del contenido */
  maxWidth?: "narrow" | "wide" | "full"
}

export function Page({ maxWidth = "wide", children, ...rest }: PageProps) {
  return (
    <S.Root $maxWidth={maxWidth} {...rest}>
      {children}
    </S.Root>
  )
}
