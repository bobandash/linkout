import { Outlet, useNavigate } from 'react-router';
import PageTemplate from '../../components/PageTemplate';
import { useAuthContext } from '../../context/useAuthContext';

const Dashboard = () => {
  const { isSignedIn } = useAuthContext();
  const navigate = useNavigate();

  if (!isSignedIn) {
    navigate('/');
  }

  return (
    <PageTemplate>
      <Outlet />
    </PageTemplate>
  );
};

export default Dashboard;
