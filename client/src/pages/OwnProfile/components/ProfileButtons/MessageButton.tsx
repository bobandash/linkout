import axios from 'axios.config';
import { useNavigate, useParams } from 'react-router';

const MessageButton = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();

  async function createConversation() {
    try {
      const response = await axios.post(
        'https://linkout.onrender.com/conversations/create',
        {
          profileId: profileId,
        },
      );
      return response.data.conversation._id;
    } catch (err) {
      console.error('There was an error creating the conversation');
      throw err;
    }
  }

  async function getConversationId() {
    try {
      const response = await axios.get(
        'https://linkout.onrender.com/conversations/conversation',
        {
          params: {
            profileId: profileId,
          },
        },
      );
      if (response.status === 200) {
        return response.data.conversation._id;
      }
    } catch {
      return null;
    }
  }

  async function navigateToConversation() {
    let conversationId = await getConversationId();
    if (!conversationId) {
      conversationId = await createConversation();
    }
    navigate(`/conversation/${conversationId}`);
  }

  return (
    <button
      onClick={async () => {
        await navigateToConversation();
      }}
      className="'text-outline mx-auto mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0"
    >
      Message
    </button>
  );
};

export default MessageButton;
