import SignInForm from './pages/SignInForm/index';
import { SignedInContext } from './context/SignedInContext';
import { useContext } from 'react';
import PageTemplate from './components/PageTemplate';
import Communities from './pages/Communities/index';

function App() {
  const { isSignedIn } = useContext(SignedInContext);
  if (isSignedIn) {
    return (
      <PageTemplate>
        <Communities />
      </PageTemplate>
    );
  } else {
    return <SignInForm />;
  }
}

export default App;
