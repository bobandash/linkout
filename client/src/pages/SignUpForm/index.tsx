import LinkOutSlogan from './LinkOutSlogan';
import SignUpForm from './SignUpForm';

const index = () => {
  return (
    <div className="relative min-h-screen min-w-full bg-primary">
      <div className="absolute left-1/2 top-1/2 w-10/12 max-w-6xl  -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative flex justify-center rounded-lg shadow-custom">
          <LinkOutSlogan />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default index;
