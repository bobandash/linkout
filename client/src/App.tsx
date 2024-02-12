import SignInForm from './pages/SignInForm/index';
/* import { UserContext } from './context/UserContext'; */
import { useUserContext } from './context/useUserContext';
import PageTemplate from './components/PageTemplate';
import { Outlet } from 'react-router';
import LoadingScreen from './pages/Loading/index';

function App() {
  const { isSignedIn, isLoading } = useUserContext();
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isSignedIn) {
    return (
      <PageTemplate>
        <Outlet />
      </PageTemplate>
    );
  }

  return <SignInForm />;
}

export default App;
