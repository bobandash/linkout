import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import DefaultServer from './Server/DefaultServer';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import UserServer from './Server/UserServer';

const ServersComponent = () => {
  const { communities } = useContext(UserContext);
  return (
    <div className="scrollbar-none flex max-h-screen flex-col items-center gap-2 overflow-scroll bg-color_1 p-4">
      <DefaultServer icon={<FontAwesomeIcon icon={faHouse} />} link={'/'} />
      {communities !== null &&
        communities.map((community) => (
          <UserServer key={community._id} community={community} />
        ))}

      <DefaultServer
        icon={<FontAwesomeIcon icon={faPlus} />}
        link={'/communities/create'}
      />
    </div>
  );
};

export default ServersComponent;
