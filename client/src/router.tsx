import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUpForm from './pages/SignUpForm/index.tsx';
import Profile from './pages/OwnProfile/index.tsx';
import Communities from './pages/Communities/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Communities />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
  {
    path: 'signup',
    element: <SignUpForm />,
  },
]);

export default router;
