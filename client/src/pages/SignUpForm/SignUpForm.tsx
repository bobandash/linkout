import { Link } from 'react-router-dom';
import RequiredAsterisk from '../../components/RequiredAsterisk';
import useSignUp from './__hooks__/useSignUp';
import NetworkIcon from '../../assets/network.png';

const SignUpForm = () => {
  const { errors, success, handleInputChange, handleSubmit } = useSignUp();

  return (
    <div className="flex w-full flex-col justify-center overflow-hidden bg-white">
      <div className="mx-auto flex w-10/12 max-w-[600px] flex-col gap-4">
        <img
          src={NetworkIcon}
          alt="Linkout Icon"
          className="mx-auto mb-2 block w-16"
        />
        <h1 className="text-outline text-center font-play text-6xl font-bold uppercase text-black md:hidden">
          Linkout
        </h1>
        <h1 className="text-outline hidden text-center font-play text-6xl font-bold uppercase text-black md:mb-12 md:block">
          Sign Up
        </h1>
        <form
          autoComplete="off"
          noValidate
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            await handleSubmit(e);
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="sm:text-xl">
              Email: <RequiredAsterisk />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded-md border-2 border-black bg-zinc-200 pl-2 pr-2 text-lg sm:text-2xl"
              autoComplete="xyz"
              required
              autoFocus
              onChange={handleInputChange}
            />
            {errors.email.msg && (
              <p className="text-sm text-error">{errors.email.msg}</p>
            )}
            {errors.userExists.msg && (
              <p className="text-sm text-error">{errors.userExists.msg}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="displayName" className="sm:text-xl">
              Display Name:
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              className="rounded-md border-2 border-black bg-zinc-200 pl-2 pr-2 text-lg sm:text-2xl"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="sm:text-xl">
              Password: <RequiredAsterisk />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="rounded-md border-2 border-black bg-zinc-200 pl-2 pr-2 text-lg sm:text-2xl"
              onChange={handleInputChange}
            />
            {errors.password.msg && (
              <p className="text-sm text-error">{errors.password.msg}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="sm:text-xl">
              Confirm Password: <RequiredAsterisk />
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              className="rounded-md border-2 border-black bg-zinc-200 pl-2 pr-2 text-lg sm:text-2xl"
              onChange={handleInputChange}
            />
            {errors.confirmPassword.msg && (
              <p className="text-sm text-error">{errors.confirmPassword.msg}</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-primary p-2 text-lg font-bold uppercase text-white transition-all hover:bg-opacity-80 sm:text-2xl"
          >
            Sign Up
          </button>
          {success && (
            <p className="text-success">
              Your account was successfully created.
            </p>
          )}
        </form>
        <p className="sm:text-xl">
          Have an account?{' '}
          <Link className="text-blue-400" to={'/'}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
