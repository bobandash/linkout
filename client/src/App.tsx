import SignInForm from './pages/SignInForm/index';
import { SignedInContext } from './context/SignedInContext';
import { useContext } from 'react';
import PageTemplate from './components/PageTemplate';
import { Outlet } from 'react-router';

function App() {
  const { isSignedIn } = useContext(SignedInContext);
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
