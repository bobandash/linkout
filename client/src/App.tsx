import SignInForm from './pages/SignInForm/index';
import LoadingScreen from './pages/Loading/index';
import { useNavigate } from 'react-router';
import { useAuthContext } from './context/useAuthContext';

function App() {
  const { isSignedIn, isAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  if (isSignedIn) {
    navigate('/dashboard');
  }

  return <SignInForm />;
}

export default App;
