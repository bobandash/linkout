import SignInForm from './pages/SignInForm/index';
import { SignedInContext } from './context/SignedInContext';
import { useContext } from 'react';

function App() {
  const { isSignedIn } = useContext(SignedInContext);
  if (isSignedIn) {
    return <div>Signed In</div>;
  } else {
    return <SignInForm />;
  }
}

export default App;
