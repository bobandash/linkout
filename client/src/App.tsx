import SignInForm from './pages/SignInForm/index';
import LoadingScreen from './pages/Loading/index';
// import { useNavigate } from 'react-router';
// import { useEffect } from 'react';
import { useAuthContext } from './context/useAuthContext';

function App() {
  // const { isSignedIn, isAuthLoading } = useAuthContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthLoading && isSignedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [isAuthLoading, isSignedIn, navigate]);

  const { isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return <SignInForm />;
}

export default App;
