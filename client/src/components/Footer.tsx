import { faMessage } from '@fortawesome/free-regular-svg-icons/faMessage';
import { faHomeUser } from '@fortawesome/free-solid-svg-icons/faHomeUser';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();
  function navHome() {
    navigate('/');
  }
  function navProfile() {
    navigate('/profile');
  }

  function navServers() {
    navigate('/servers');
  }

  function navMessages() {
    navigate('messages');
  }

  function navFriends() {
    navigate('/friends');
  }

  return (
    <footer className="sticky bottom-0 flex justify-around bg-color_1 p-3  lg:hidden">
      <div onClick={navHome} className={'flex flex-col hover:cursor-pointer'}>
        <FontAwesomeIcon icon={faHomeUser} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Home</p>
      </div>
      <div
        onClick={navServers}
        className={'flex flex-col hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faNetworkWired} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Communities</p>
      </div>
      <div
        onClick={navMessages}
        className={'flex flex-col hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faMessage} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Messages</p>
      </div>
      <div
        onClick={navFriends}
        className={'flex flex-col hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faUsers} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Friends</p>
      </div>
      <div
        onClick={navProfile}
        className={'flex flex-col hover:cursor-pointer'}
      >
        <FontAwesomeIcon icon={faUser} size={'xl'} color={'#FFF'} />
        <p className="text-sm text-white">Profile</p>
      </div>
    </footer>
  );
};

export default Footer;
