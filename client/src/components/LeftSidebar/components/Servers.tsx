import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { FC } from 'react';
import { useNavigate } from 'react-router';

interface DefaultServerProps {
  icon: JSX.Element;
  link: string;
}

interface CommunitiesProp {
  community: {
    name: string;
    profilePic: string;
    description: string;
    _id: string;
  };
}

const Servers = () => {
  const { communities } = useContext(UserContext);
  return (
    <div className="flex max-h-screen flex-col items-center gap-2 overflow-scroll bg-color_1 p-4 scrollbar-none">
      <DefaultServer
        icon={<FontAwesomeIcon icon={faHouse} />}
        link={'/dashboard'}
      />
      {communities !== null &&
        communities.map((community) => (
          <UserServer key={community._id} community={community} />
        ))}

      <DefaultServer
        icon={<FontAwesomeIcon icon={faPlus} />}
        link={'/dashboard/communities/create'}
      />
    </div>
  );
};

const DefaultServer: FC<DefaultServerProps> = ({ icon, link }) => {
  const navigate = useNavigate();
  function handleNav() {
    navigate(link);
  }
  return (
    <div
      onClick={handleNav}
      className="flex aspect-square w-full min-w-[50px] items-center justify-center rounded-full border-2 bg-white hover:cursor-pointer lg:min-w-[60px]"
    >
      {icon}
    </div>
  );
};

const UserServer: FC<CommunitiesProp> = ({ community }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/dashboard/communities/' + community._id);
  }

  if (community.profilePic.length <= 2) {
    return (
      <div
        onClick={handleNavigate}
        className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full border-2 border-black bg-white hover:cursor-pointer lg:min-h-[60px] lg:min-w-[60px]"
      >
        <p className="font-bold uppercase">{community.profilePic}</p>
      </div>
    );
  }
  return (
    <div
      onClick={handleNavigate}
      className="relative flex aspect-square min-h-[50px] min-w-[50px] overflow-hidden rounded-full border-2 bg-white hover:cursor-pointer lg:min-h-[60px] lg:min-w-[60px]"
    >
      <img
        className="absolute left-0 top-0 h-full w-full"
        src={community.profilePic}
        alt="server picture"
      />
    </div>
  );
};

export default Servers;
