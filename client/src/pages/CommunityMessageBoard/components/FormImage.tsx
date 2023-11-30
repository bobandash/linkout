import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const FormImage = () => {
  return (
    <form
      encType="multipart/form-data"
      className="flex items-start justify-center bg-color_2 p-3"
    >
      <button className="relative hover:cursor-pointer">
        <input
          type="file"
          className="absolute left-0 top-0 h-full w-full opacity-0 hover:cursor-pointer"
          accept="image/png, image/jpeg"
        />
        <FontAwesomeIcon icon={faPlusCircle} color={'#FFF'} size={'xl'} />
      </button>
    </form>
  );
};

export default FormImage;
