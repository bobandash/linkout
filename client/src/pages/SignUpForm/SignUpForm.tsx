import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import RequiredAsterisk from '../../components/RequiredAsterisk';

const SignUpForm = () => {
  const sampleFormData = {
    email: '',
    password: '',
    displayName: '',
    confirmPassword: '',
  };

  const sampleErrors = {
    email: { msg: '' },
    password: { msg: '' },
    confirmPassword: { msg: '' },
    userExists: { msg: '' },
  };

  const [formData, setFormData] = useState(sampleFormData);
  const [errors, setErrors] = useState(sampleErrors);
  const [success, setSuccess] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors(sampleErrors);
    setSuccess(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    setErrors(sampleErrors);
    e.preventDefault();
    try {
      await axios.post('api/users/create', formData);
      setSuccess(true);
    } catch (err: unknown) {
      const errorData = err.response.data;
      setErrors({ ...errors, ...errorData });
    }
  }

  return (
    <div className="w-full overflow-hidden bg-white p-8 md:w-1/2">
      <h1 className="text-outline text-center font-fingerPaint text-6xl text-white md:hidden">
        Linkout
      </h1>
      <h1 className="text-outline hidden text-center font-fingerPaint text-6xl text-white md:block">
        Sign Up
      </h1>
      <form
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
          autoComplete="off"
          onChange={handleInputChange}
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.msg}</p>
        )}
        {errors.userExists && (
          <p className="text-error text-sm">{errors.userExists.msg}</p>
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
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.msg}</p>
        )}
        <label htmlFor="confirmPassword" className="mt-4 text-lg">
          Confirm Password: <RequiredAsterisk />
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="rounded-md bg-gray pl-2 pr-2 text-2xl"
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <p className="text-error text-sm">{errors.confirmPassword.msg}</p>
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
