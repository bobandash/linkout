import { useNavigate } from 'react-router';
const ErrorPage = () => {
  const navigate = useNavigate();
  function navigateHome() {
    navigate('/');
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-color_1 text-white">
      <div className="mx-14 flex flex-col items-center justify-center gap-3">
        <h1 className="text-9xl font-bold">404</h1>
        <div className="text-center">
          <p className="text-3xl text-slate-100">Page Not Found</p>
          <p>The page that you are searching does not exist.</p>
        </div>
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
