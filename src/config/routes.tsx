import DashboardHomePage from '@/modules/dashboard/pages/DashboardHomePage'
import LoginPage from '@/modules/auth/pages/LoginPage'
import NotFoundPage from '@/modules/common/pages/NotFoundPage'

import { ROUTES } from '@/constants/routes'
import type { Route } from '@/types/route'

export const routes: Route[] = [
  {
    name: 'login-page',
    path: ROUTES.LOGIN,
    protected: false,
    element: <LoginPage />,
    meta: { title: 'Sign In' },
  },
  {
    name: 'dashboard-home-page',
    path: ROUTES.DASHBOARD,
    element: <DashboardHomePage />,
    protected: true,
    meta: { title: 'Dashboard' },
  },
  {
    name: 'not-found-page',
    path: ROUTES.NOT_FOUND,
    protected: false,
    element: <NotFoundPage />,
    meta: { title: 'Page Not Found' },
  },
]
