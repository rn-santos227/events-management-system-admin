import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './store';
import { router } from './router';
import './index.css';

import { Footer, Header } from '@/components';
import { DialogProvider } from '@/components/ui';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
       <DialogProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <RouterProvider router={router} />
          </div>
          <Footer />
        </div>
      </DialogProvider>
    </Provider>
  </React.StrictMode>,
);
