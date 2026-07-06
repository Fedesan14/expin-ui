import styled from "styled-components"
import { media } from "../../../../app/theme/theme"

export const Root = styled.div<{ $maxWidth: "narrow" | "wide" | "full" }>`
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space["4"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space["5"]};

  max-width: ${({ theme, $maxWidth }) =>
    $maxWidth === "narrow"
      ? theme.sizes.maxContentNarrow
      : $maxWidth === "wide"
        ? theme.sizes.maxContent
        : "100%"};

  ${media.md} {
    padding: ${({ theme }) => `${theme.space["6"]} ${theme.space["6"]}`};
    gap: ${({ theme }) => theme.space["6"]};
  }
`
