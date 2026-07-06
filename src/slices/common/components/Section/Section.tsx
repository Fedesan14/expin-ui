import type { HTMLAttributes, ReactNode } from "react"
import * as S from "./Section.styles"

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function Section({ title, description, action, children, ...rest }: SectionProps) {
  return (
    <S.Root {...rest}>
      {(title || description || action) && (
        <S.Head>
          <S.Titles>
            {title && <S.Title>{title}</S.Title>}
            {description && <S.Description>{description}</S.Description>}
          </S.Titles>
          {action && <S.Action>{action}</S.Action>}
        </S.Head>
      )}
      {children}
    </S.Root>
  )
}
