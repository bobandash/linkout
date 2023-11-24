import SignInForm from './pages/SignInForm/index';
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import PageTemplate from './components/PageTemplate';
import { Outlet } from 'react-router';
import LoadingScreen from './pages/Loading/index';

function App() {
  const { isSignedIn, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isSignedIn) {
    return (
      <PageTemplate>
        <Outlet />
      </PageTemplate>
    );
  } else {
    return <SignInForm />;
  }
}

export default App;
