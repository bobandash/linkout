import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IndividualFriend from './Friends/IndividualFriend';

const FriendsComponent = () => {
  return (
    <div className="flex flex-col border-r-4 p-4 md:flex-grow">
      <h2 className="text-outline font-fingerPaint text-3xl text-white">
        Friends
      </h2>
      <form className="mt-2 w-full rounded-xl border-2 border-black bg-secondary p-3">
        <div className="relative w-full">
          <input className="rounded-1 w-full border-2 px-1 font-play focus:outline-none" />
          <button
            className="absolute right-2 top-1/2 w-fit -translate-y-1/2"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      <div className="mt-2">
        <IndividualFriend />
      </div>
    </div>
  );
};

export default FriendsComponent;
