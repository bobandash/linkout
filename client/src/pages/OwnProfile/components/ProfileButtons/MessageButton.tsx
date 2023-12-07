import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router';

const MessageButton = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  async function getConversationId() {
    try {
      const response = await axios.get('/api/conversations/conversation', {
        params: {
          profileId: profileId,
        },
      });
      return response.data.conversation._id;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        return null;
      }
      throw err;
    }
  }

  async function createConversation() {
    try {
      const response = await axios.post('/api/conversations/create', {
        profileId: profileId,
      });
      return response.data.conversation._id;
    } catch (err) {
      console.error('There was an error creating the conversation');
      throw err;
    }
  }

  // get conversation if exists
  // create conversation if doesn't exist
  async function navigateToConversation() {
    let conversationId;

    try {
      conversationId = await getConversationId();
    } catch (err) {
      return;
    }

    if (!conversationId) {
      try {
        conversationId = await createConversation();
      } catch (err) {
        console.error('Error while creating conversation:');
        return;
      }
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
