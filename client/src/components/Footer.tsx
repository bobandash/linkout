import { faMessage } from '@fortawesome/free-regular-svg-icons/faMessage';
import { faHomeUser } from '@fortawesome/free-solid-svg-icons/faHomeUser';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();
  function navHome() {
    navigate('/');
  }
  function navProfile() {
    navigate('/profile/edit');
  }

  function navCommunities() {
    navigate('/communities');
  }

  function navMessages() {
    navigate('/messages');
  }

  return (
    <footer className="sticky bottom-0 flex justify-around bg-color_1 p-3  lg:hidden">
      <button
        onClick={navHome}
        className={'flex flex-col items-center hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faHomeUser} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Home</p>
      </button>
      <button
        onClick={navCommunities}
        className={'flex flex-col items-center hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faNetworkWired} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Communities</p>
      </button>
      <button
        onClick={navMessages}
        className={'flex flex-col items-center hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faMessage} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Messages</p>
      </button>
      <button
        onClick={navProfile}
        className={'flex flex-col items-center hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faUser} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Profile</p>
      </button>
    </footer>
  );
};

export default Footer;
