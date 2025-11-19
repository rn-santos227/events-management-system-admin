import { NavLink } from 'react-router-dom'

import { DrawerLink } from '@/types/drawer'
import { 
  getUserFullName,
  type UserProfile
} from '@/types/user'

const statusCopy: Record<NonNullable<DrawerLink['status']>, string> = {
  beta: 'Beta',
  soon: 'Coming soon',
}


