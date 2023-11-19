import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUpForm from './pages/SignUpForm/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
