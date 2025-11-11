import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from '@/modules/common/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
