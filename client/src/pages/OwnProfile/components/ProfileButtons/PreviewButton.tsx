import { useNavigate } from 'react-router';

const PreviewButton = () => {
  const navigate = useNavigate();
  function navigateView() {
    navigate('/profile/view');
  }

  return (
    <button
      onClick={navigateView}
      className="'text-outline mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0"
    >
      Preview
    </button>
  );
};

export default PreviewButton;
