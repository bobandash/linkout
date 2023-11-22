import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useProfile = () => {
  const mockProfile = {
    username: '',
    status: '',
    profilePic: '',
    aboutMe: '',
    link: '',
    interests: '',
    skills: {},
    socialMediaUrls: {
      instagram: '',
      facebook: '',
      twitter: '',
      tiktok: '',
    },
  };

  const [profile, setProfile] = useState(mockProfile);

  useEffect(() => {
    async function getProfile() {
      const response = await axios.get('/api/users/user/profile');
      setProfile(response.data.profile);
    }

    getProfile();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    },
    [profile],
  );

  const handleSocialMediaInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile({
        ...profile,
        socialMediaUrls: { ...profile.socialMediaUrls, [name]: value },
      });
    },
    [profile],
  );

  const handleTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    },
    [profile],
  );
  return {
    profile,
    handleInputChange,
    handleTextAreaChange,
    handleSocialMediaInputChange,
  };
};

export default useProfile;
