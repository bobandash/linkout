import { Link } from 'react-router-dom';
import useSignIn from './__hooks__/useSignIn';

const SignInForm = () => {
  const { hasErrors, handleInputChange, handleSubmit } = useSignIn();
  return (
    <div className="flex w-full flex-col justify-center overflow-hidden bg-white">
      <div className="mx-auto flex w-10/12 max-w-[600px] flex-col gap-4">
        <h1 className="text-outline text-center font-play text-6xl font-bold uppercase text-black md:hidden">
          Linkout
        </h1>
        <h1 className="text-outline hidden text-center font-play text-6xl font-bold uppercase text-black md:mb-12 md:block">
          Sign In
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col">
            <label htmlFor="password" className="sm:text-xl">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded-md border-2 border-black bg-white pl-2 pr-2 text-lg sm:text-2xl"
              autoComplete="xyz"
              autoFocus
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="sm:text-xl">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="rounded-md border-2 border-black bg-white pl-2 pr-2 text-lg sm:text-2xl"
              onChange={handleInputChange}
            />
            {hasErrors && (
              <p className="text-sm text-error">
                Your credientials are invalid
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-primary p-2 text-lg font-bold uppercase text-white transition-all hover:bg-opacity-80 sm:text-2xl"
          >
            Sign In
          </button>
        </form>
        <button
          type="button"
          className="w-full rounded-md bg-black p-2 text-lg font-bold uppercase text-white transition-all hover:bg-opacity-80 sm:text-2xl"
        >
          User Demo
        </button>
        <p className="sm:text-xl">
          Don't have an account?{' '}
          <Link className="text-blue-400" to={'/signup'}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
