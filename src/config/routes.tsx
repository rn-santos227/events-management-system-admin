import type { Route } from '@/types/route';
import NotFoundPage from '@/modules/common/pages/NotFoundPage';

export const routes: Route[] = [
  {
    name: "not-found-page",
    path: '*',
    element: <NotFoundPage />,
    meta: { title: 'Page Not Found' },
  }
]