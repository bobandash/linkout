import axios from 'axios-config';
import { useEffect, useState } from 'react';
import DirectMessageProps from '../interface/DirectMessage';
import { useParams } from 'react-router';
import socket from '../../../socket';
// custom hook to render message board

const useMessagePage = () => {
  const { conversationId } = useParams();
  const [conversationDetails, setConversationDetails] = useState({
    name: '',
    profilePic: '',
  });
  const [messages, setMessages] = useState<Array<DirectMessageProps>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  socket.on('receive_message', (message) => {
    setMessages([...messages, message]);
  });

  useEffect(() => {
    async function getConversationDetails() {
      try {
        const response = await axios.get(
          `https://linkout.onrender.com/conversations/${conversationId}/details`,
        );
        const data = response.data;
        setConversationDetails(data);
      } catch {
        setHasError(true);
      }
    }

    async function getMessages() {
      try {
        const response = await axios.get(
          `https://linkout.onrender.com/conversations/${conversationId}/messages`,
        );
        const messages = response.data.messages;
        setMessages(messages);
      } catch {
        setHasError(true);
      }
    }

    async function main() {
      try {
        setHasError(false);
        setIsLoading(true);
        await Promise.all([getConversationDetails(), getMessages()]);
        socket.emit('join_chatroom', conversationId);
        setIsLoading(false);
      } catch {
        setHasError(true);
      }
    }

    main();
  }, [conversationId]);

  return { conversationDetails, messages, isLoading, hasError };
};

export default useMessagePage;
