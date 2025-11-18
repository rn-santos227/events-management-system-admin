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
  const profile = useAppSelector((state) => state.user.profile)

  const welcomeMessage = useMemo(() => {
    if (!profile) return 'Welcome to EMS Admin'
    const name = getUserFullName(profile)
    return `Welcome back, ${name || profile.email}`
  }, [profile])

  return (
    <section className="bg-slate-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wide text-slate-900">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">{welcomeMessage}</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-900">
            This is your starting point for managing upcoming events, tracking approvals, and staying on top of
            organizer activity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sampleHighlights.map((highlight) => (
            <Card key={highlight.title} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-medium text-slate-500">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-900">{highlight.value}</p>
                <p className="mt-1 text-sm text-slate-500">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-sm">
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
