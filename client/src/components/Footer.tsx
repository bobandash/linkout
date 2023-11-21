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
    <footer className="sticky bottom-0 flex justify-around bg-secondary p-3  md:hidden">
      <div onClick={navHome} className={'hover:cursor-pointer'}>
        <FontAwesomeIcon icon={faHomeUser} size={'xl'} />
      </div>
      <div onClick={navProfile} className={'hover:cursor-pointer'}>
        <FontAwesomeIcon icon={faUser} size={'xl'} />
      </div>
      <div onClick={navServers} className={'hover:cursor-pointer'}>
        <FontAwesomeIcon icon={faNetworkWired} size={'xl'} />
      </div>
      <div onClick={navMessages} className={'hover:cursor-pointer'}>
        <FontAwesomeIcon icon={faMessage} size={'xl'} />
      </div>
      <div onClick={navFriends} className={'hover:cursor-pointer'}>
        <FontAwesomeIcon icon={faUsers} size={'xl'} />
      </div>
    </footer>
  );
};

export default Footer;