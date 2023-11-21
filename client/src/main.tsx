import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { SignedInContextProvider } from './context/SignedInContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SignedInContextProvider>
      <RouterProvider router={router} />
    </SignedInContextProvider>
  </React.StrictMode>,
);
