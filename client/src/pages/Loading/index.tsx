import { Audio } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="relative min-h-screen w-full bg-color_3">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Audio height="80" width="80" color="white" ariaLabel="loading" />
      </div>
    </div>
  );
};

export default Loading;
