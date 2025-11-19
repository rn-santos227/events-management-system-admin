import { NavLink } from 'react-router-dom'

import { DrawerLink } from '@/types/drawer'

import { 
  getUserFullName,
  type UserProfile
} from '@/types/user'
import {
  HiOutlineArrowsRightLeft,
} from 'react-icons/hi2'

const statusCopy: Record<NonNullable<DrawerLink['status']>, string> = {
  beta: 'Beta',
  soon: 'Coming soon',
}

export default function NavigationDrawer({ userProfile }: NavigationDrawerProps) {
  const [isCondensed, setIsCondensed] = useState(false)
  const userName = getUserFullName(userProfile)
}
