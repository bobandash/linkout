import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const LinkOutBtn = () => {
  const navigate = useNavigate();
  const communityId = useParams();
  function navLinkOut() {
    navigate(`/communities/${communityId}/linkout`);
  }

  return (
    <button
      onClick={navLinkOut}
      className={
        'text-outline mx-auto mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0'
      }
    >
      Link Out
    </button>
  );
};

export default LinkOutBtn;
