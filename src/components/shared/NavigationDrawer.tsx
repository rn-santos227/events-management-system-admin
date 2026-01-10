import { useMemo, useState } from 'react'
import { Badge } from 'flowbite-react'
import { NavLink } from 'react-router-dom'

import { DrawerLink } from '@/@types/drawer'
import { navigationSections } from '@/config/drawer'
import type { UserProfile } from '@/@types/user'
import { getUserFullName } from '@/@types/user'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import {
  HiOutlineArrowsRightLeft,
} from 'react-icons/hi2'

import './index.css'
import { classNames } from '@/utils/classNames'

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
      className={classNames(
        'navigation-drawer',
        isCondensed ? 'navigation-drawer--condensed' : 'navigation-drawer--expanded',
      )}
    >
      <div className="navigation-drawer__header">
        <div
          className={classNames(
            isCondensed ? 'sr-only' : 'navigation-drawer__intro',
          )}
        >
          <p className="navigation-drawer__eyebrow">EMS Admin</p>
          <p className="navigation-drawer__title">Sidekick navigation</p>
          <p className="navigation-drawer__subtitle">Quick links to the core admin surfaces.</p>
        </div>
        <button
          type="button"
          onClick={toggleCondensed}
          aria-pressed={isCondensed}
          className="navigation-drawer__toggle"
        >
          <span className="sr-only">{isCondensed ? 'Expand navigation drawer' : 'Collapse navigation drawer'}</span>
          <HiOutlineArrowsRightLeft
            className={classNames(
              'navigation-drawer__toggle-icon',
              isCondensed && 'navigation-drawer__toggle-icon--rotated',
            )}
          />
        </button>
      </div>

      <div
        className={classNames(
          'navigation-drawer__profile',
          isCondensed && 'navigation-drawer__profile--condensed',
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="navigation-drawer__avatar">{userInitials}</div>
          <div className={isCondensed ? 'sr-only' : 'navigation-drawer__identity'}>
            <p className="navigation-drawer__signed-in">Signed in</p>
            <p className="navigation-drawer__name">{userName || userProfile?.email || 'Administrator'}</p>
            <p className="navigation-drawer__role">{userProfile?.role.name ?? 'EMS admin'}</p>
          </div>
        </div>
      </div>

      <nav className="navigation-drawer__nav">
        {navigationSections.map((section) => (
          <section key={section.title} aria-label={section.title} className="navigation-drawer__section">
            <p
              className={classNames(
                isCondensed ? 'sr-only' : 'navigation-drawer__section-title',
              )}
            >
              {section.title}
            </p>
            <div className="navigation-drawer__links">
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
                      className={classNames(
                        'navigation-drawer__link-disabled',
                        isCondensed
                          ? 'navigation-drawer__link-disabled--condensed'
                          : 'navigation-drawer__link-disabled--expanded',
                      )}
                      aria-disabled
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="navigation-drawer__pill">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div
                          className={classNames(
                            isCondensed ? 'sr-only' : 'navigation-drawer__link-meta',
                          )}
                        >
                          <p className="navigation-drawer__link-label">{link.label}</p>
                          <p className="navigation-drawer__link-description">{link.description}</p>
                          {statusLabel ? (
                            <Badge color="gray" className="navigation-drawer__badge" size="xs">
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
                      classNames(
                        'navigation-drawer__link',
                        isCondensed
                          ? 'navigation-drawer__link--condensed'
                          : 'navigation-drawer__link--expanded',
                        isActive
                          ? 'navigation-drawer__link--active'
                          : 'navigation-drawer__link--inactive',
                      )
                    }
                  >
                    <span className="navigation-drawer__link-icon">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span
                      className={classNames(
                        isCondensed ? 'sr-only' : 'navigation-drawer__link-text',
                      )}
                    >
                      <span className="navigation-drawer__link-text-label">{link.label}</span>
                      <span className="navigation-drawer__link-text-description">{link.description}</span>
                    </span>
                  </NavLink>
                )
              })}
            </div>
          </section>
        ))}
      </nav>

      <div
        className={classNames('navigation-drawer__support', isCondensed && 'sr-only')}
      >
        <p className="navigation-drawer__support-title">Need anything?</p>
        <p className="navigation-drawer__support-description">
          This drawer will grow with additional modules. Use the dashboard to start reviewing activity today.
        </p>
      </div>
    </aside>
  )
}
