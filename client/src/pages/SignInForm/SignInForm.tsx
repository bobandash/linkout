import { Link } from 'react-router-dom';
import useSignIn from './__hooks__/useSignIn';

const SignInForm = () => {
  const { hasErrors, handleInputChange, handleSubmit } = useSignIn();
  return (
    <div className="w-full overflow-hidden bg-white p-8 md:w-1/2">
      <h1 className="text-outline text-center font-play text-6xl font-bold uppercase text-black md:hidden">
        Linkout
      </h1>
      <h1 className="text-outline hidden text-center font-play text-6xl font-bold uppercase text-black md:block">
        Sign In
      </h1>
      <form className="my-5 flex flex-col" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className="text-lg">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          autoComplete="xyz"
          autoFocus
          onChange={handleInputChange}
        />
        <label htmlFor="password" className="mt-4 text-lg">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          onChange={handleInputChange}
        />
        {hasErrors && (
          <p className="text-sm text-error">Your credientials are invalid</p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-md bg-primary p-2 text-3xl font-bold uppercase text-white"
        >
          Sign In
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link className="text-blue-400" to={'/signup'}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
