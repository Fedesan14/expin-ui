import type { IconProps } from './types'

export function HomeIcon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      {...props}
    >
      <path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4v-8.5Z" />
    </svg>
  )
}
