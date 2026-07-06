import styled from "styled-components"
import type { AppTheme } from "../../../../app/theme/theme"

type SpaceKey = keyof AppTheme["space"]
type Align = "start" | "center" | "end" | "stretch"
type Justify = "start" | "center" | "end" | "between"

const alignMap: Record<Align, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
}

const justifyMap: Record<Justify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
}

export const Root = styled.div<{
  $gap: SpaceKey
  $align: Align
  $justify: Justify
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $gap }) => theme.space[$gap]};
  align-items: ${({ $align }) => alignMap[$align]};
  justify-content: ${({ $justify }) => justifyMap[$justify]};
`
