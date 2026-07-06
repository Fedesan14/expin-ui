import type { IconProps } from './types'

export function HistoryIcon({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      {...props}
    >
      <path d="M5 7h14M5 12h14M5 17h9" />
    </svg>
  )
}
