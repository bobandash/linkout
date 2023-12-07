import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUpForm from './pages/SignUpForm/index.tsx';
import EditProfile from './pages/OwnProfile/EditProfile.tsx';
import ViewProfile from './pages/OwnProfile/ViewProfile.tsx';
import Communities from './pages/Communities/index.tsx';
import CreateCommunity from './pages/CreateCommunity/index.tsx';
import CommunityMessage from './pages/CommunityMessageBoard/index.tsx';
import MyCommunities from './pages/MyCommunities/index.tsx';
import DirectMessage from './pages/DirectMessageBoard/index.tsx';
import ErrorPage from './pages/Error/index.tsx';
import MessagesPage from './pages/Messages/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Communities />,
      },
      {
        path: '/messages',
        element: <MessagesPage />,
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
        path: '/profile/edit',
        element: <EditProfile />,
      },
      {
        path: '/profile/view',
        element: <ViewProfile />,
      },
      {
        path: '/profile/:profileId/view',
        element: <ViewProfile />,
      },
      {
        path: '/communities',
        element: <MyCommunities />,
      },
      {
        path: '/conversation/:conversationId',
        element: <DirectMessage />,
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUpForm />,
  },
  {
    path: '/404',
    element: <ErrorPage />,
  },
]);

export default router;
