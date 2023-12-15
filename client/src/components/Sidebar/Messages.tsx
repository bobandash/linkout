import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserMessage from './components/UserMessage';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import ConversationProps from '../../interface/conversation';
import ConversationSidebarProps from './interface/ConversationSidebarProps';

const MessagesNavSidebar = () => {
  const { username } = useContext(UserContext);
  // stores relevant data needed for conversation sidebar
  const [conversationSidebarData, setConversationSidebarData] = useState<
    Array<ConversationSidebarProps>
  >([]);
  const [filteredSidebarData, setFilteredSidebarData] = useState<
    Array<ConversationSidebarProps>
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const lowerQuery = query.toLowerCase();
    const newData = conversationSidebarData.filter((data) => {
      const lowerCaseUsername = data.user.username.toLowerCase();
      return lowerCaseUsername.includes(lowerQuery);
    });
    setFilteredSidebarData(newData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    async function getConversations() {
      try {
        const response = await axios.get(
          'https://linkout.onrender.com/conversations',
        );
        const conversationData: ConversationProps[] = response.data;
        // filter the raw conversation data to the necessary params to display
        const userData = conversationData.map((conversation) => {
          const otherUser = conversation.users.filter(
            (user) => user.profile.username !== username,
          )[0].profile;
          const { _id, isRequest } = conversation;
          return {
            user: otherUser,
            _id,
            isRequest,
          };
        });
        setConversationSidebarData(userData);
        setFilteredSidebarData(userData);
      } catch {
        console.error('There was an error fetching the conversations');
      }
    }
    getConversations();
  }, [username]);

  return (
    <div className="flex flex-col overflow-scroll p-4 scrollbar-thin md:flex-grow">
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
      <div className="mt-5">
        {filteredSidebarData.map((data) => (
          <UserMessage key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default MessagesNavSidebar;
