import { useMemo, useState } from 'react'
import { Badge } from 'flowbite-react'
import { NavLink } from 'react-router-dom'

import { DrawerLink } from '@/types/drawer'
import { navigationSections } from '@/config/drawer'
import type { UserProfile } from '@/types/user'
import { getUserFullName } from '@/types/user'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import {
  HiOutlineArrowsRightLeft,
} from 'react-icons/hi2'

interface NavigationDrawerProps {
  userProfile?: UserProfile | null
}

const statusCopy: Record<NonNullable<DrawerLink['status']>, string> = {
  beta: 'Beta',
  soon: 'Coming soon',
}

export default function NavigationDrawer({ userProfile }: NavigationDrawerProps) {
  const [isCondensed, setIsCondensed] = useState(false)
  const { hasPrivileges } = useAuthorization()
  const userName = userProfile ? getUserFullName(userProfile) : ''
  const userInitials = useMemo(() => {
    const target = userName || userProfile?.email
    if (!target) return 'EM'

    const matches = target
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((token) => token.charAt(0).toUpperCase())
      .join('')

    return matches || 'EM'
  }, [userName, userProfile?.email])

  const toggleCondensed = () => {
    setIsCondensed((prev) => !prev)
  }

  return (
    <aside
      aria-label="Primary navigation"
      data-condensed={isCondensed ? 'true' : 'false'}
      className={[
        'hidden h-screen flex-col border-r border-slate-200 bg-white/90 text-sm text-slate-600 transition-[width] duration-200 ease-out lg:sticky lg:top-0 lg:flex',
        isCondensed ? 'w-24 px-3 py-6 items-center text-center' : 'w-[var(--sidebar-width)] p-6',
      ].join(' ')}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className={isCondensed ? 'sr-only' : 'text-left'}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">EMS Admin</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">Sidekick navigation</p>
          <p className="mt-2 text-xs text-slate-500">Quick links to the core admin surfaces.</p>
        </div>
        <button
          type="button"
          onClick={toggleCondensed}
          aria-pressed={isCondensed}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900"
        >
          <span className="sr-only">{isCondensed ? 'Expand navigation drawer' : 'Collapse navigation drawer'}</span>
          <HiOutlineArrowsRightLeft className={isCondensed ? 'h-4 w-4 rotate-180' : 'h-4 w-4'} />
        </button>
      </div>

      <div
        className={[
          'mt-6 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm',
          isCondensed ? 'px-2 py-3 text-center' : '',
        ].join(' ')}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-base font-semibold text-brand-700">
            {userInitials}
          </div>
          <div className={isCondensed ? 'sr-only' : 'text-left'}>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Signed in</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{userName || userProfile?.email || 'Administrator'}</p>
            <p className="text-xs text-slate-500">{userProfile?.role.name ?? 'EMS admin'}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex w-full flex-1 flex-col space-y-6 overflow-y-auto">
        {navigationSections.map((section) => (
          <section key={section.title} aria-label={section.title} className="space-y-3">
            <p className={isCondensed ? 'sr-only' : 'text-xs font-semibold uppercase tracking-wide text-slate-400'}>
              {section.title}
            </p>
            <div className="space-y-3">
              {section.links.map((link) => {
                const statusLabel = link.status ? statusCopy[link.status] : undefined
                const Icon = link.icon
                const isAuthorized = hasPrivileges(link.requiredPrivileges, link.privilegeMode ?? 'all')

                if (!isAuthorized) {
                  return null
                }

                if (link.disabled || !link.to) {
                  return (
                    <div
                      key={link.label}
                      title={link.label}
                      className={[
                        'group rounded-xl border border-dashed border-slate-200/70 bg-slate-50/70 text-slate-400',
                        isCondensed ? 'px-2 py-4 text-center' : 'px-4 py-3 text-left',
                      ].join(' ')}
                      aria-disabled
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-400">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div className={isCondensed ? 'sr-only' : 'space-y-1 text-left'}>
                          <p className="text-sm font-medium text-slate-500">{link.label}</p>
                          <p className="text-xs">{link.description}</p>
                          {statusLabel ? (
                            <Badge color="gray" className="mt-2 w-max uppercase tracking-wide" size="xs">
                              {statusLabel}
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    title={isCondensed ? link.label : undefined}
                    aria-label={isCondensed ? link.label : undefined}
                    className={({ isActive }) =>
                      [
                        'flex rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                        isCondensed
                          ? 'flex-col items-center gap-2 px-2 py-4 text-center'
                          : 'flex-row items-center gap-3 px-4 py-3 text-left',
                        isActive
                          ? 'border-brand-100 bg-brand-50/70 text-brand-950 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                      ].join(' ')
                    }
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-base">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className={isCondensed ? 'sr-only' : 'flex flex-col text-left'}>
                      <span className="text-sm font-semibold">{link.label}</span>
                      <span className="text-xs">{link.description}</span>
                    </span>
                  </NavLink>
                )
              })}
            </div>
          </section>
        ))}
      </nav>

      <div className={['mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500', isCondensed ? 'sr-only' : ''].join(' ')}>
        <p className="font-semibold text-slate-700">Need anything?</p>
        <p className="mt-1">
          This drawer will grow with additional modules. Use the dashboard to start reviewing activity today.
        </p>
      </div>
    </aside>
  )
}
