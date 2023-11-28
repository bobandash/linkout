import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUpForm from './pages/SignUpForm/index.tsx';
import Profile from './pages/OwnProfile/index.tsx';
import Communities from './pages/Communities/index.tsx';
import CreateCommunity from './pages/CreateCommunity/index.tsx';
import CommunityMessage from './pages/CommunityMessageBoard/index.tsx';

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
        path: '/communities/:communityId',
        element: <CommunityMessage />,
      },
      {
        path: '/communities/create',
        element: <CreateCommunity />,
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
