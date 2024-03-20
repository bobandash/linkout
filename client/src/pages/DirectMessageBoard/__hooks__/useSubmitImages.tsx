import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import socket from '../../../socket';

const useSubmitImages = () => {
  const { conversationId } = useParams();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const fileToUpload = e.target.files[0];
      const formData = new FormData();
      formData.append('image', fileToUpload);
      try {
        const response = await axios.post(
          `https://linkout-1.onrender.com/conversations/${conversationId}/add-image`,
          formData,
        );
        const message = response.data.message;
        socket.emit('send_message', {
          id: conversationId,
          message: message,
        });
        e.target.value = '';
      } catch {
        console.error('Could not add image');
      }
    }
  };

  return { handleChange };
};

export default useSubmitImages;
