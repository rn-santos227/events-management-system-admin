import type { ReactNode } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { routes } from '@/config/routes'
import PrivilegeGuard from '@/modules/auth/components/PrivilegeGuard'
import ProtectedRoute from '@/modules/auth/components/ProtectedRoute'
import type { Route } from '@/types/route'
import { AppLayout } from './layouts'

function convertRoutes(customRoutes: Route[]): RouteObject[] {
  return customRoutes.map((r) => {
    let element: ReactNode | undefined

    if (r.element && typeof r.element !== 'function') {
      element = r.element
    }

    if (typeof r.element === 'function') {
      const Component = r.element
      element = <Component />
    }

    if (element && r.requiredPrivileges?.length) {
      element = (
        <PrivilegeGuard
          required={r.requiredPrivileges}
          mode={r.privilegeMode}
          redirectTo={r.unauthorizedRedirect}
          fallback={r.unauthorizedFallback}
        >
          {element}
        </PrivilegeGuard>
      )
    }

    if (element && r.protected) {
      element = <ProtectedRoute>{element}</ProtectedRoute>
    }

    const routeObject: RouteObject = {
      path: r.path,
      element,
      children: r.children ? convertRoutes(r.children) : undefined,
    }

    return routeObject
  })
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: convertRoutes(routes),
  },
])
