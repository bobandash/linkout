import { Outlet, useNavigate } from 'react-router';
import PageTemplate from '../../components/PageTemplate';
import { useAuthContext } from '../../context/useAuthContext';
import { useEffect } from 'react';

const Dashboard = () => {
  const { isSignedIn, isAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && !isAuthLoading) {
      navigate('/');
    }
  }, [isSignedIn, navigate, isAuthLoading]);

  return (
    <PageTemplate>
      <Outlet />
    </PageTemplate>
  );
};

export default Dashboard;
