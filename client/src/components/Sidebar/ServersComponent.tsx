import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import DefaultServer from './Server/DefaultServer';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';

const ServersComponent = () => {
  return (
    <div className="flex flex-col border-r-4 p-4">
      <DefaultServer icon={<FontAwesomeIcon icon={faHouse} />} link={'/'} />
      <DefaultServer
        icon={<FontAwesomeIcon icon={faComment} />}
        link={'/messages'}
      />
    </div>
  );
};

export default ServersComponent;
