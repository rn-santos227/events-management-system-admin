import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Header, NavigationDrawer } from '@/components'
import { Button, useDialog } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { logoutUser } from '@/modules/auth/store/AuthSlice'
import { getUserFullName } from '@/types/user'

interface AppLayoutProps {
  children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const dispatch = useAppDispatch()
  const { showDialog } = useDialog()

  const authState = useAppSelector((state) => state.auth)
  const userProfile = useAppSelector((state) => state.user.profile)
  const isAuthenticated = authState.status === 'authenticated' && Boolean(authState.token)
  const content = children ?? <Outlet />
  const displayName = userProfile ? getUserFullName(userProfile) || userProfile.email : null

  const handleLogout = () => {
    showDialog({
      type: 'question',
      title: 'Confirm sign out',
      description: 'Are you sure you want to sign out of your account?',
      onConfirm: () => {
        void dispatch(logoutUser())
      },
    })
  }

  const headerActions =
    isAuthenticated ? (
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span className="flex flex-col gap-0.5 text-left text-xs uppercase tracking-wide text-slate-500">
          <span className="text-[10px] font-semibold text-slate-400">Signed in</span>
          <span className="text-sm font-semibold text-slate-900">
            {displayName ?? 'Administrator'}
          </span>
        </span>
        <Button size="sm" variant="outline" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
    ) : undefined
    
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header title={undefined} actions={headerActions} />
        <main className="flex-1">{content}</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <NavigationDrawer userProfile={userProfile} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header title="EMS Admin Dashboard" actions={headerActions} />
        <main className="flex-1">{content}</main>
        <Footer />
      </div>
    </div>
  )
}
