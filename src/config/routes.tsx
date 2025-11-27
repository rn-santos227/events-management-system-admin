
import AuditLogsPage from '@/modules/audit/pages/AuditLogsPage'
import DashboardHomePage from '@/modules/dashboard/pages/DashboardHomePage'
import LoginPage from '@/modules/auth/pages/LoginPage'
import NotFoundPage from '@/modules/common/pages/NotFoundPage'

import { ROUTES } from '@/constants/routes'
import { PRIVILEGE_ACTIONS } from '@/constants/privileges'
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
    name: 'audit-logs-page',
    path: ROUTES.AUDIT_LOGS,
    element: <AuditLogsPage />,
    protected: true,
    requiredPrivileges: [
      PRIVILEGE_ACTIONS.AUDIT_LOGS.READ,
      PRIVILEGE_ACTIONS.AUDIT_LOGS.READ_OWN,
    ],
    privilegeMode: 'any',
    meta: { title: 'Audit Trail' },
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
