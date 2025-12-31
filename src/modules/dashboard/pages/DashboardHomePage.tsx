import { useMemo } from 'react'

import { useUserProfile } from '@/hooks'
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
  const profile = useUserProfile()

  const welcomeMessage = useMemo(() => {
    if (!profile) return 'Welcome to EMS Admin'
    const name = getUserFullName(profile)
    return `Welcome back, ${name || profile.email}`
  }, [profile])

  return (
    <section className="page-section">
      <div className="page-container page-container-narrow">
        <div className="page-hero">
          <p className="page-hero-kicker">Dashboard</p>
          <h1 className="page-hero-title">{welcomeMessage}</h1>
          <p className="page-hero-body">
            This is your starting point for managing upcoming events, tracking approvals,
            and staying on top of organizer activity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sampleHighlights.map((highlight) => (
            <Card key={highlight.title} className="page-card">
              <CardHeader>
                <CardTitle className="page-card-title-muted">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-900">{highlight.value}</p>
                <p className="page-card-body-muted">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="page-card">
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-600">
            <p>
              Use the navigation to manage events, review venue availability, and collaborate with organizers. As new
              modules are connected, insights will appear here automatically.
            </p>
            <p className="text-sm text-slate-500">
              You are signed in with the <span className="font-medium text-slate-700">{profile?.role.name ?? 'admin'}</span>{' '}
              role. Only authenticated administrators can access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
