import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import socket from '../../../../socket';

const MessageButton = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();

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

  async function getConversationId() {
    try {
      const response = await axios.get('/api/conversations/conversation', {
        params: {
          profileId: profileId,
        },
      });
      if (response.status === 200) {
        return response.data.conversation._id;
      }
    } catch {
      return null;
    }
  }

  async function getOtherUserInformation() {
    try {
      const response = await axios.get(`/api/users/user/${profileId}/profile`);
      const profile = response.data.profile;
      const userInfo = {
        _id: profile._id,
        profilePic: profile.profilePic,
        status: profile.status,
        username: profile.username,
      };
      return userInfo;
    } catch {
      console.error('Error fetching user profile');
    }
  }

  // TODO: refactor routes to fetch individual conversations and/or conversations per user
  async function navigateToConversation() {
    try {
      let conversationId = await getConversationId();
      if (!conversationId) {
        conversationId = await createConversation();
        const userInfo = await getOtherUserInformation();
        // information to return to add the direct message in the sidebar
        const conversationSidebarInfo = {
          user: userInfo,
          _id: conversationId,
          isRequest: true,
        };
        socket.emit('create_new_conversation', conversationSidebarInfo);
      }
      navigate(`/dashboard/conversation/${conversationId}`);
    } catch {
      console.log('There was an error creating the conversation');
    }
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
