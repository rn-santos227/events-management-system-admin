import type { ComponentType, SVGProps } from 'react'

declare module 'react-icons' {
  export type IconType = ComponentType<SVGProps<SVGSVGElement>>
}

declare module 'react-icons/hi2' {
  import type { IconType } from 'react-icons'

  export const HiOutlineSquares2X2: IconType
  export const HiOutlineRectangleStack: IconType
  export const HiOutlineCalendarDays: IconType
  export const HiOutlineUserGroup: IconType
  export const HiOutlineShieldCheck: IconType
  export const HiOutlineArrowsRightLeft: IconType
}
