import axios from 'axios';
import { useEffect, useState } from 'react';
import CommunityProps from '../../../interface/community';
import MessageProps from '../interface/message';
import { useParams } from 'react-router';
import socket from '../../../socket';
// custom hook to render message board
const useMessagePage = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState<null | CommunityProps>(null);
  const [communityMessages, setCommunityMessages] = useState<
    Array<MessageProps>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  socket.on('receive_message', (message) => {
    setCommunityMessages([...communityMessages, message]);
  });

  useEffect(() => {
    async function getCommunity() {
      const response = await axios.get(`/api/community/${communityId}`);
      setCommunity(response.data);
    }

    async function getMessages() {
      const response = await axios.get(
        `/api/community/${communityId}/messages`,
      );
      setCommunityMessages(response.data);
    }

    async function main() {
      try {
        await Promise.all([getCommunity(), getMessages()]);
        socket.emit('join_chatroom', communityId);
        setIsLoading(false);
      } catch {
        console.error('There are an error');
      }
    }

    main();
  }, [communityId]);

  return { community, communityMessages, isLoading };
};

export default useMessagePage;
