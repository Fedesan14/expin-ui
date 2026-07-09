import type { IconProps } from './types'

export function EyeOffIcon({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" />
      <path d="M9.9 5.2A9.3 9.3 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3 4.2" />
      <path d="M6.6 6.6C3.6 8.6 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1.1" />
    </svg>
  )
}
