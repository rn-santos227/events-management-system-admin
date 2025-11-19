import { NavLink } from 'react-router-dom'

import { DrawerLink } from '@/types/drawer'

import { 
  getUserFullName,
  type UserProfile
} from '@/types/user'
import {
  HiOutlineArrowsRightLeft,
} from 'react-icons/hi2'

const statusCopy: Record<NonNullable<DrawerLink['status']>, string> = {
  beta: 'Beta',
  soon: 'Coming soon',
}

export default function NavigationDrawer({ userProfile }: NavigationDrawerProps) {
  const [isCondensed, setIsCondensed] = useState(false)
  const userName = getUserFullName(userProfile)
  const userInitials = useMemo(() => {
    const target = userName || userProfile.email
    if (!target) return 'EM'

    const matches = target
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((token) => token.charAt(0).toUpperCase())
      .join('')

    return matches || 'EM'
  }, [userName, userProfile.email])

  const toggleCondensed = () => {
    setIsCondensed((prev) => !prev)
  }

  return (
    <aside
      aria-label="Primary navigation"
      data-condensed={isCondensed ? 'true' : 'false'}
      className={[
        'hidden flex-col border-r border-slate-200 bg-white/90 text-sm text-slate-600 transition-[width] duration-200 ease-out lg:flex',
        isCondensed ? 'w-24 px-3 py-6 items-center text-center' : 'w-[var(--sidebar-width)] p-6',
      ].join(' ')}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className={isCondensed ? 'sr-only' : 'text-left'}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">EMS Admin</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">Sidekick navigation</p>
          <p className="mt-2 text-xs text-slate-500">Quick links to the core admin surfaces.</p>
        </div>
      </div>
    </aside>
  )
}
