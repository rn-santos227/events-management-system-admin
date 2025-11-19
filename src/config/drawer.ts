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
  {
    title: 'Operations',
    links: [
      {
        label: 'Event Pipeline',
        description: 'Track upcoming event proposals and scheduling',
        status: 'beta',
        disabled: true,
      },
      {
        label: 'Venue Availability',
        description: 'Monitor venue holds and conflicts',
        status: 'soon',
        disabled: true,
      },
    ],
  },
]
