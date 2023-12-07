import { useNavigate } from 'react-router';
import { FC } from 'react';

interface ErrorPageProps {
  errorCode?: number;
}

// List of all error codes covered //
const NotAuthorizedText = () => {
  return (
    <>
      <h1 className="text-9xl font-bold">401</h1>
      <div className="text-center">
        <p className="text-3xl text-slate-100">Unauthorized</p>
        <p>You are not authorized to view this page.</p>
      </div>
    </>
  );
};

const NotFoundText = () => {
  return (
    <>
      <h1 className="text-9xl font-bold">404</h1>
      <div className="text-center">
        <p className="text-3xl text-slate-100">Page Not Found</p>
        <p>The page that you are searching does not exist.</p>
      </div>
    </>
  );
};

const InternalServerErrorText = () => {
  return (
    <>
      <h1 className="text-9xl font-bold">500</h1>
      <div className="text-center">
        <p className="text-3xl text-slate-100">Internal Server Error</p>
        <p>There was an internal server error. Please try again later.</p>
      </div>
    </>
  );
};

const ErrorPage: FC<ErrorPageProps> = ({ errorCode = 404 }) => {
  const navigate = useNavigate();
  function navigateHome() {
    navigate('/');
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-color_1 text-white">
      <div className="mx-14 flex flex-col items-center justify-center gap-3">
        {errorCode === 401 && <NotAuthorizedText />}
        {errorCode === 404 && <NotFoundText />}
        {errorCode === 500 && <InternalServerErrorText />}
        <button
          onClick={navigateHome}
          className="w-full border-2 border-white bg-color_3 p-3 text-2xl uppercase"
        >
          Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
