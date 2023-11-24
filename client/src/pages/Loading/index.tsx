import { Audio } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="bg-color_3 min-h-screen w-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Audio height="80" width="80" color="white" ariaLabel="loading" />
      </div>
    </div>
  );
};

export default Loading;
