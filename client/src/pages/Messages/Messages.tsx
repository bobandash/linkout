import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserMessage from './components/UserMessage';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios.config';
import { UserContext } from '../../context/UserContext';
import ConversationProps from '../../interface/conversation';
import MessagesProps from './interface/MessagesProp';

const Messages = () => {
  const { username } = useContext(UserContext);
  // stores relevant data needed for conversation sidebar
  const [messagesDataData, setMessagesDataData] = useState<
    Array<MessagesProps>
  >([]);
  const [filteredMessagesData, setFilteredMessages] = useState<
    Array<MessagesProps>
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const lowerQuery = query.toLowerCase();
    const newData = messagesDataData.filter((data) => {
      const lowerCaseUsername = data.user.username.toLowerCase();
      return lowerCaseUsername.includes(lowerQuery);
    });
    setFilteredMessages(newData);
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
        setMessagesDataData(userData);
        setFilteredMessages(userData);
      } catch {
        console.error('There was an error fetching the conversations');
      }
    }
    getConversations();
  }, [username]);

  return (
    <div className="flex flex-grow flex-col overflow-y-scroll bg-color_3 p-5 scrollbar-thin md:p-7 lg:p-10 lg:pt-0 2xl:p-16 2xl:pt-0">
      <form
        className="w-full rounded-xl border-2 border-black bg-color_4 p-3"
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
        {filteredMessagesData.map((data) => (
          <UserMessage key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
