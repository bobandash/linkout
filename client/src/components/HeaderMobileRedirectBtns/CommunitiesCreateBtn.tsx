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
        'text-outline mx-auto mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0'
      }
    >
      Create Your Own
    </button>
  );
};

export default CommunitiesCreateBtn;
