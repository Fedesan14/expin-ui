import { useEffect, useId, useRef } from "react"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import { IconButton } from "../IconButton"
import * as S from "./Modal.styles"

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  /** Cierra al hacer clic en el overlay. Por defecto true */
  closeOnOverlay?: boolean
}

export function Modal({ open, onClose, title, children, footer, closeOnOverlay = true }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panelRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <S.Overlay
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) onClose()
      }}
    >
      <S.Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {title ? (
          <S.Head>
            <S.Title id={titleId}>{title}</S.Title>
            <IconButton size="sm" variant="ghost" label="Cerrar" onClick={onClose} icon={<span aria-hidden="true">x</span>} />
          </S.Head>
        ) : null}
        {children ? <S.Body>{children}</S.Body> : null}
        {footer ? <S.Footer>{footer}</S.Footer> : null}
      </S.Panel>
    </S.Overlay>,
    document.body,
  )
}
