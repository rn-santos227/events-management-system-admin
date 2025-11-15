import type { Route } from '@/types/route'
import DashboardHomePage from '@/modules/dashboard/pages/DashboardHomePage'
import LoginPage from '@/modules/auth/pages/LoginPage'
import NotFoundPage from '@/modules/common/pages/NotFoundPage'

export const routes: Route[] = [
  {
    name: 'login-page',
    path: '/',
    protected: false,
    element: <LoginPage />,
    meta: { title: 'Sign In' },
  },
  {
    name: 'dashboard-home-page',
    path: '/dashboard',
    element: <DashboardHomePage />,
    protected: true,
    meta: { title: 'Dashboard' },
  },
  {
    name: 'not-found-page',
    path: '*',
    protected: false,
    element: <NotFoundPage />,
    meta: { title: 'Page Not Found' },
  },
]
