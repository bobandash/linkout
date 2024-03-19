import { Outlet, useNavigate } from 'react-router';
import PageTemplate from '../../components/PageTemplate';
import { useAuthContext } from '../../context/useAuthContext';
import { useEffect } from 'react';
import { UserContextProvider } from '../../context/UserContext';

const Dashboard = () => {
  const { isSignedIn, isAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && !isAuthLoading) {
      navigate('/');
    }
  }, [isSignedIn, navigate, isAuthLoading]);

  return (
    <UserContextProvider>
      <PageTemplate>
        <Outlet />
      </PageTemplate>
    </UserContextProvider>
  );
};

export default Dashboard;
