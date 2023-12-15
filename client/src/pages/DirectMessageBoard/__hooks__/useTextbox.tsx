import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios-config';
import socket from '../../../socket';

// TO-DO: Deal with presenting line breaks
const useTextbox = () => {
  const { conversationId } = useParams();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isLoading) {
      setMessage(e.target.value);
    }
  };

  async function handleSubmitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // prevent double form submission
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://linkout.onrender.com/conversations/${conversationId}/add-message`,
        {
          message,
        },
      );
      const target = e.target as HTMLFormElement;
      target.reset();
      setMessage('');
      const messageObj = response.data.message;
      socket.emit('send_message', {
        id: conversationId,
        message: messageObj,
      });
    } catch {
      console.error('There was an error sending the message');
    } finally {
      setIsLoading(false);
    }
  }

  return { message, handleMessage, handleSubmitMessage };
};

export default useTextbox;
