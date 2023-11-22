import { useNavigate } from 'react-router';

const CommunitiesCreateBtn = () => {
  const navigate = useNavigate();
  function navCreateCommunities() {
    navigate('/communities/create');
  }

  return (
    <button
      onClick={navCreateCommunities}
      className={
        'text-outline mx-auto mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-fingerPaint text-xl uppercase text-white md:hidden'
      }
    >
      Create Your Own
    </button>
  );
};

export default CommunitiesCreateBtn;
