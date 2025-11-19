import type { ComponentType, ReactNode } from 'react'

declare module 'flowbite-react' {
  export interface BadgeProps {
    color?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
    className?: string
    children?: ReactNode
  }

  export const Badge: ComponentType<BadgeProps>
}
