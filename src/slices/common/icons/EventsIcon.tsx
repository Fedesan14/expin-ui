import type { IconProps } from './types'

export function EventsIcon({
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
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      {...props}
    >
      <path d="M7 8h10M7 12h10M9 4v3M15 4v3M6 6h12v14H6V6Z" />
    </svg>
  )
}
