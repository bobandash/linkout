import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const useSubmitImages = () => {
  const { communityId } = useParams();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const fileToUpload = e.target.files[0];
      const formData = new FormData();
      formData.append('image', fileToUpload);
      const response = await axios.post(
        `/api/community/${communityId}/add-image`,
        formData,
      );
      console.log(response.data);
      e.target.value = '';
    }
  };

  return { handleChange };
};

export default useSubmitImages;
