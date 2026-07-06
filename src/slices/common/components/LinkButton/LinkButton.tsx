import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import * as S from "./LinkButton.styles"
import type { LinkButtonTone, LinkButtonSize } from "./LinkButton.styles"

interface CommonProps {
  tone?: LinkButtonTone
  size?: LinkButtonSize
  iconBefore?: ReactNode
  iconAfter?: ReactNode
  children: ReactNode
}

type ButtonModeProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    to?: undefined
    href?: undefined
  }

type RouterModeProps = CommonProps & { to: string }

type AnchorModeProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string
    to?: undefined
  }

export type LinkButtonProps = ButtonModeProps | RouterModeProps | AnchorModeProps

export function LinkButton(props: LinkButtonProps) {
  const {
    tone = "primary",
    size = "md",
    iconBefore,
    iconAfter,
    children,
    ...rest
  } = props as CommonProps & Record<string, unknown>

  const content = (
    <>
      {iconBefore}
      {children}
      {iconAfter}
    </>
  )

  if ("to" in props && props.to !== undefined) {
    const { to, ...routerRest } = rest as { to: string } & Record<string, unknown>
    return (
      <S.AsRouterLink to={to} $tone={tone} $size={size} {...routerRest}>
        {content}
      </S.AsRouterLink>
    )
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as { href: string } & Record<string, unknown>
    return (
      <S.AsAnchor href={href} $tone={tone} $size={size} {...anchorRest}>
        {content}
      </S.AsAnchor>
    )
  }

  return (
    <S.AsButton type="button" $tone={tone} $size={size} {...rest}>
      {content}
    </S.AsButton>
  )
}
