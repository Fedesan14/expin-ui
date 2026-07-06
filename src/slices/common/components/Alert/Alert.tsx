import type { ReactNode } from "react"
import { IconButton } from "../IconButton"
import * as S from "./Alert.styles"
import type { AlertTone } from "./Alert.styles"

export interface AlertProps {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  onClose?: () => void
  icon?: ReactNode
}

const toneLabel: Record<AlertTone, string> = {
  info: "i",
  success: "OK",
  warning: "!",
  danger: "!",
}

export function Alert({ tone = "info", title, children, onClose, icon }: AlertProps) {
  return (
    <S.Root $tone={tone} role={tone === "danger" ? "alert" : "status"}>
      <S.IconWrap $tone={tone}>
        {icon ?? <S.IconGlyph aria-hidden="true">{toneLabel[tone]}</S.IconGlyph>}
      </S.IconWrap>
      <S.Body>
        {title ? <S.Title>{title}</S.Title> : null}
        {children ? <S.Description>{children}</S.Description> : null}
      </S.Body>
      {onClose ? (
        <S.CloseWrap>
          <IconButton size="sm" variant="ghost" label="Cerrar" onClick={onClose} icon={<span aria-hidden="true">x</span>} />
        </S.CloseWrap>
      ) : null}
    </S.Root>
  )
}
