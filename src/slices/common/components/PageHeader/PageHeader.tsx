import type { HTMLAttributes, ReactNode } from "react"
import * as S from "./PageHeader.styles"

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, actions, ...rest }: PageHeaderProps) {
  return (
    <S.Root {...rest}>
      <S.Texts>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </S.Texts>
      {actions && <S.Actions>{actions}</S.Actions>}
    </S.Root>
  )
}
