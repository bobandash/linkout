import SignInForm from './pages/SignInForm/index';
import LoadingScreen from './pages/Loading/index';
import { useNavigate } from 'react-router';
import { useAuthContext } from './context/useAuthContext';
import { useEffect } from 'react';

function App() {
  const { isSignedIn, isAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && isSignedIn) {
      navigate('/dashboard');
    }
  }, [isAuthLoading, isSignedIn, navigate]);

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return <SignInForm />;
}

export default App;
