import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { UserContextProvider } from './context/UserContext.tsx';
import socket from './socket.ts';
import { AuthContextProvider } from './context/AuthContext.tsx';
socket.connect();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);

const cleanup = () => {
  socket.disconnect();
};

window.addEventListener('beforeunload', cleanup);
