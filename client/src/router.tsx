import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUpForm from './pages/SignUpForm/index.tsx';
import EditProfile from './pages/OwnProfile/EditProfile.tsx';
import ViewProfile from './pages/OwnProfile/ViewProfile.tsx';
import Communities from './pages/Communities/index.tsx';
import CreateCommunity from './pages/CreateCommunity/index.tsx';
import CommunityMessage from './pages/CommunityMessageBoard/index.tsx';
import MyCommunitiesPage from './pages/MyCommunities/index.tsx';

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
        path: 'profile/edit',
        element: <EditProfile />,
      },
      {
        path: 'profile/view',
        element: <ViewProfile />,
      },
      {
        path: 'profile/:profileId/view',
        element: <ViewProfile />,
      },
      {
        path: 'communities',
        element: <MyCommunitiesPage />,
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
