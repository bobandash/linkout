import LinkOutSlogan from '../../components/LinkOutSlogan';
import SignUpForm from './SignUpForm';

const index = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <LinkOutSlogan />
      <SignUpForm />
    </div>
  );
};

export default index;
