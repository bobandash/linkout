import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SignUpForm = () => {
  return (
    <div className="w-full overflow-hidden bg-white p-8 md:w-1/2">
      <h1 className="text-outline text-center font-fingerPaint text-6xl text-white md:hidden">
        Linkout
      </h1>
      <h1 className="text-outline hidden text-center font-fingerPaint text-6xl text-white md:block">
        Sign Up
      </h1>
      <form className="my-5 flex flex-col">
        <label htmlFor="email" className="text-lg">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          autoComplete="off"
        />
        <label htmlFor="password" className="mt-4 text-lg">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
        />
        <label htmlFor="confirmPassword" className="mt-4 text-lg">
          Confirm Password:
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
        />
        <button
          type="submit"
          className="mt-5 w-full rounded-md bg-primary p-2 text-3xl font-bold uppercase text-white"
        >
          Sign Up
        </button>
      </form>
      <div className="relative">
        <div className="border-t-1 absolute top-1/2 w-full border border-black"></div>
        <p className="relative z-10 mx-auto w-fit bg-white p-2 text-xl font-bold">
          or sign up with
        </p>
      </div>
      <div className="mb-2 flex flex-col">
        <button className="mb-2 w-full rounded-md bg-secondary p-2 text-lg font-bold uppercase text-white">
          <FontAwesomeIcon icon={faGoogle} /> Google
        </button>
        <button className="w-full rounded-md bg-secondary p-2 text-lg font-bold uppercase text-white">
          <FontAwesomeIcon icon={faLinkedin} /> Linkedin
        </button>
      </div>
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
