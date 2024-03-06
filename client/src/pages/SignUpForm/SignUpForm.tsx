import { Link } from 'react-router-dom';
import RequiredAsterisk from '../../components/RequiredAsterisk';
import useSignUp from './__hooks__/useSignUp';

const SignUpForm = () => {
  const { errors, success, handleInputChange, handleSubmit } = useSignUp();

  return (
    <div className="w-full overflow-hidden bg-white p-8 md:w-1/2">
      <h1 className="text-outline text-center font-play text-6xl font-bold uppercase text-black md:hidden">
        Linkout
      </h1>
      <h1 className="text-outline hidden text-center font-play text-6xl font-bold uppercase text-black md:block">
        Sign Up
      </h1>
      <form
        autoComplete="off"
        noValidate
        className="my-5 flex flex-col"
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <label htmlFor="email" className="text-lg">
          Email: <RequiredAsterisk />
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
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
        <label htmlFor="displayName" className="mt-4 text-lg">
          Display Name:
        </label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          onChange={handleInputChange}
        />
        <label htmlFor="password" className="mt-4 text-lg">
          Password: <RequiredAsterisk />
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          onChange={handleInputChange}
        />
        {errors.password.msg && (
          <p className="text-sm text-error">{errors.password.msg}</p>
        )}
        <label htmlFor="confirmPassword" className="mt-4 text-lg">
          Confirm Password: <RequiredAsterisk />
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          onChange={handleInputChange}
        />
        {errors.confirmPassword.msg && (
          <p className="text-sm text-error">{errors.confirmPassword.msg}</p>
        )}
        <button
          type="submit"
          className="mt-5 w-full rounded-md bg-primary p-2 text-3xl font-bold uppercase text-white"
        >
          Sign Up
        </button>
        {success && (
          <p className="text-success">Your account was successfully created.</p>
        )}
      </form>
      <p>
        Have an account?{' '}
        <Link className="text-blue-400" to={'/'}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
