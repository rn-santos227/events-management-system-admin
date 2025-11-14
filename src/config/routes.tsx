import type { Route } from '@/types/route'
import LoginPage from '@/modules/auth/pages/LoginPage'
import NotFoundPage from '@/modules/common/pages/NotFoundPage'

export const routes: Route[] = [
  {
    name: 'login-page',
    path: '/',
    element: <LoginPage />,
    meta: { title: 'Sign In' },
  },
  {
    name: 'not-found-page',
    path: '*',
    element: <NotFoundPage />,
    meta: { title: 'Page Not Found' },
  },
]