import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import ProfilePic from '../../ProfilePic';

interface ConversationSidebarProps {
  user: {
    _id: string;
    username: string;
    status: string;
    profilePic: string;
  };
  _id: string;
  isRequest: boolean;
}

interface UserMessageProps {
  data: ConversationSidebarProps;
}

const Messages = () => {
  const { conversations } = useContext(UserContext);
  // stores relevant data needed for conversation sidebar
  const [filteredSidebarData, setFilteredSidebarData] = useState<
    ConversationSidebarProps[] | null
  >(conversations);

  useEffect(() => {
    if (conversations) {
      setFilteredSidebarData([...conversations]);
    }
  }, [conversations]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const lowerQuery = query.toLowerCase();
    if (conversations) {
      const newData = conversations.filter((data) => {
        const lowerCaseUsername = data.user.username.toLowerCase();
        return lowerCaseUsername.includes(lowerQuery);
      });
      setFilteredSidebarData(newData);
    } else {
      setFilteredSidebarData(conversations);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col overflow-y-scroll p-4 scrollbar-none md:flex-grow">
      <h2 className="font-play text-3xl text-white">Messages</h2>
      <form
        className="mt-2 w-full rounded-xl border-2 border-black bg-color_4 p-3"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <input
            onChange={handleChange}
            className="rounded-1 w-full border-2 px-1 font-play focus:outline-none"
          />
          <button
            className="absolute right-2 top-1/2 w-fit -translate-y-1/2"
            type="submit"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      <div className="mt-3">
        {filteredSidebarData &&
          filteredSidebarData.map((data) => (
            <UserMessage key={data._id} data={data} />
          ))}
      </div>
    </div>
  );
};

// renders conversation icon with the user that you're communicating with
const UserMessage: FC<UserMessageProps> = ({ data }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/dashboard/conversation/' + data._id);
  }
  const { profilePic, username, status } = data.user;

  return (
    <div
      onClick={handleNavigate}
      role="button"
      aria-label={`Navigate to conversations with ${username}`}
      className="mb-1 grid grid-cols-desktop_sidebar_profile gap-2 rounded-lg bg-color_4 p-2 hover:cursor-pointer"
    >
      <div className="flex items-center justify-center">
        <ProfilePic size="x-small" image={profilePic} name={username} />
      </div>
      <div className="flex flex-col justify-center text-white">
        <p className="overflow-hidden overflow-ellipsis text-xl font-bold">
          {username}
        </p>
        <p className="max-w-[12ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
          {status}
        </p>
      </div>
    </div>
  );
};

export default Messages;
