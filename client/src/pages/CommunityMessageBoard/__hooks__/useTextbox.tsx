import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const useTextbox = () => {
  const { communityId } = useParams();
  const [message, setMessage] = useState('');

  console.log(message);
  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  async function handleSubmitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post(`/api/community/${communityId}/add-message`, {
        message,
      });
      const target = e.target as HTMLFormElement;
      target.reset();
    } catch {
      console.error('There was an error sending the message');
    }
  }

  return { message, handleMessage, handleSubmitMessage };
};

export default useTextbox;
