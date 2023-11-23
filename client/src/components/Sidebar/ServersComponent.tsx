import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import DefaultServer from './Server/DefaultServer';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const ServersComponent = () => {
  return (
    <div className="bg-color_1 flex flex-col p-4">
      <DefaultServer icon={<FontAwesomeIcon icon={faHouse} />} link={'/'} />
      <DefaultServer
        icon={<FontAwesomeIcon icon={faComment} />}
        link={'/messages'}
      />
      <DefaultServer
        icon={<FontAwesomeIcon icon={faPlus} />}
        link={'/communities/create'}
      />
    </div>
  );
};

export default ServersComponent;
