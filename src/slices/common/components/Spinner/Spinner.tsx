import * as S from "./Spinner.styles"

export interface SpinnerProps {
  size?: number
  color?: string
  label?: string
}

export function Spinner({ size = 20, color, label = "Cargando" }: SpinnerProps) {
  return (
    <S.Root $size={size} $color={color} role="status" aria-live="polite">
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </S.Root>
  )
}
