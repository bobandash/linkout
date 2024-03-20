import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import CommunityProps from '../../../interface/community';
import MessageProps from '../interface/message';
import { useParams } from 'react-router';
import socket from '../../../socket';
// custom hook to render message board
const useMessagePage = () => {
  const { communityId } = useParams();
  const [errorCode, setErrorCode] = useState(0);
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
      try {
        const response = await axios.get(
          `https://linkout-1.onrender.com/communities/${communityId}`,
        );
        setCommunity(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response) {
            setErrorCode(err.response?.status);
          }
        }
      }
    }

    async function getMessages() {
      try {
        const response = await axios.get(
          `https://linkout-1.onrender.com/communities/${communityId}/messages`,
        );
        setCommunityMessages(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response) {
            setErrorCode(err.response?.status);
          }
        }
      }
    }

    async function main() {
      try {
        setErrorCode(0);
        setIsLoading(true);
        await Promise.all([getCommunity(), getMessages()]);
        socket.emit('join_chatroom', communityId);
        setIsLoading(false);
      } catch {
        console.error('There are errors');
      }
    }

    main();
  }, [communityId]);

  return { community, communityMessages, isLoading, errorCode };
};

export default useMessagePage;
