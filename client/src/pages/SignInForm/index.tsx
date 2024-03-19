import SignInForm from './SignInForm';
import LinkOutSlogan from '../../components/LinkOutSlogan';

const index = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <LinkOutSlogan />
      <SignInForm />
    </div>
  );
};

export default index;
