import type { ReactNode } from 'react'

import { Footer, Header, NavigationDrawer } from '@/components'
import { Button } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { logoutUser } from '@/modules/auth/store/AuthSlice'
import { getUserFullName } from '@/types/user'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.auth)
  const userProfile = useAppSelector((state) => state.user.profile)
  const isAuthenticated = authState.status === 'authenticated' && Boolean(userProfile)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const headerActions =
    isAuthenticated && userProfile ? (
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span>
          Signed in as{' '}
          <span className="font-semibold text-slate-900">{getUserFullName(userProfile) || userProfile.email}</span>
        </span>
        <Button size="sm" variant="outline" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
    ) : undefined

  if (!isAuthenticated || !userProfile) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header title={undefined} actions={headerActions} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title={isAuthenticated ? 'EMS Admin Dashboard' : undefined} actions={headerActions} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
