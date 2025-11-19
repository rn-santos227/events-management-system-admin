import { ROUTES } from '@/constants/routes'
import { DrawerSection } from '@/types/drawer'

export const navigationSections: DrawerSection[] = [
  {
    title: 'Overview',
    links: [
      {
        label: 'Dashboard',
        description: 'High-level insight into events and approvals',
        to: ROUTES.DASHBOARD,
      },
    ],
  },
]
