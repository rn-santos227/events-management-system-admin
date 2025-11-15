import { useMemo } from 'react'

import { useAppSelector } from '@/app/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { getUserFullName } from '@/types/user'

const sampleHighlights = [
  {
    title: 'Upcoming Events',
    value: '12',
    description: 'Scheduled for the next 30 days',
  },
  {
    title: 'Pending Approvals',
    value: '5',
    description: 'Awaiting organizer confirmation',
  },
]

export default function DashboardHomePage() {

}