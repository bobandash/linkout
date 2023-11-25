import { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

interface profileProps {
  username: string;
  status: string;
  profilePic: null | File;
  aboutMe: string;
  link: string;
  interests: string;
  skills: object;
  socialMediaUrls: {
    instagram: string;
    facebook: string;
    twitter: string;
    tiktok: string;
  };
}

const useProfile = () => {
  const mockProfile = {
    username: '',
    status: '',
    profilePic: null,
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

  const [profile, setProfile] = useState<profileProps>(mockProfile);
  const [success, setSuccess] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const response = await axios.get('/api/users/user/profile');
      setProfile(response.data.profile);
    }

    getProfile();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasErrors(false);
      setSuccess(false);
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    },
    [profile],
  );

  const handleSocialMediaInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasErrors(false);
      setSuccess(false);
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
      setHasErrors(false);
      setSuccess(false);
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    },
    [profile],
  );

  const handleProfilePicChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasErrors(false);
      setSuccess(false);
      if (e.target.files) {
        const file = e.target.files[0];
        setProfile({ ...profile, profilePic: file });
      }
    },
    [profile],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (profile.profilePic !== null) {
        formData.append('profilePic', profile.profilePic);
      }

      const response = await axios.put('/api/users/user/profile', formData);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setHasErrors(true);
      }
    }
  };

  return {
    profile,
    handleInputChange,
    handleTextAreaChange,
    handleSocialMediaInputChange,
    handleProfilePicChange,
    success,
    hasErrors,
    handleSubmit,
  };
};

export default useProfile;
