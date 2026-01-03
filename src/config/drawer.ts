import { ROUTES } from '@/constants/routes'
import { DrawerSection } from '@/types/drawer'
import {
  HiOutlineCalendarDays,
  HiOutlineClipboardDocumentList,
  HiOutlineKey,
  HiOutlineRectangleStack,
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

export const navigationSections: DrawerSection[] = [
  {
    title: 'Overview',
    links: [
      {
        label: 'Dashboard',
        description: 'High-level insight into events and approvals',
        to: ROUTES.DASHBOARD,
        icon: HiOutlineSquares2X2,
      },
      {
        label: 'Audit Trail',
        description: 'Review authenticated request activity',
        to: ROUTES.AUDIT_LOGS,
        icon: HiOutlineClipboardDocumentList,
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
        icon: HiOutlineRectangleStack,
      },
      {
        label: 'Venue Availability',
        description: 'Monitor venue holds and conflicts',
        status: 'soon',
        disabled: true,
        icon: HiOutlineCalendarDays,
      },
    ],
  },
  {
    title: 'Collaboration',
    links: [
      {
        label: 'Organizer Directory',
        description: 'Reference organizer profiles and contacts',
        status: 'soon',
        disabled: true,
        icon: HiOutlineUserGroup,
      },
      {
        label: 'Approvals',
        description: 'Coordinate approvals with internal teams',
        status: 'soon',
        disabled: true,
        icon: HiOutlineShieldCheck,
      },
    ],
  },
  {
    title: 'Access Control',
    links: [
      {
        label: 'Privileges',
        description: 'Review and activate system privileges',
        to: ROUTES.PRIVILEGES,
        icon: HiOutlineKey,
      },
    ],
  },
]
