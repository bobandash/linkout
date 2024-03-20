import { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { mockProfile, profileProps } from '../../../interface/profile';
import { useParams } from 'react-router';

interface uploadProfilePicProps extends profileProps {
  uploadedProfilePic?: File;
}

interface errorProps {
  username?: {
    msg: string;
  };
  profilePic?: {
    msg: string;
  };
  'socialMediaUrls.instagram'?: {
    msg: string;
  };
  'socialMediaUrls.facebook'?: {
    msg: string;
  };
  'socialMediaUrls.twitter'?: {
    msg: string;
  };
  'socialMediaUrls.tiktok'?: {
    msg: string;
  };
}

const useProfile = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState<uploadProfilePicProps>(mockProfile);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<null | errorProps>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      if (profileId) {
        const response = await axios.get(
          `https://linkout-1.onrender.com/users/profile/${profileId}`,
          { withCredentials: true },
        );
        setProfile(response.data.profile);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          'https://linkout-1.onrender.com/users/me/profile',
          { withCredentials: true },
        );
        setProfile(response.data.profile);
        setIsLoading(false);
      }
    }

    getProfile();
  }, [profileId]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(null);
      setSuccess(false);
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    },
    [profile],
  );

  const handleSocialMediaInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(null);
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
      setErrors({});
      setSuccess(false);
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    },
    [profile],
  );

  const handleProfilePicChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(null);
      setSuccess(false);
      if (e.target.files) {
        const file = e.target.files[0];
        setProfile({ ...profile, uploadedProfilePic: file });
      }
    },
    [profile],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in profile) {
        if (key !== 'uploadedProfilePic') {
          if (typeof profile[key] === 'object' && profile[key] !== null) {
            for (const nestedKey in profile[key]) {
              const nestedValue = profile[key][nestedKey];
              formData.append(`${key}.${nestedKey}`, nestedValue);
            }
          } else {
            const value = profile[key];
            formData.append(key, value);
          }
        }
      }
      if (profile.uploadedProfilePic) {
        formData.append('image', profile.uploadedProfilePic);
      }

      const response = await axios.put(
        'https://linkout-1.onrender.com/users/me/profile',
        formData,
        { withCredentials: true },
      );
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          const errors = err.response?.data.errors;
          setErrors({ ...errors });
        }
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
    errors,
    handleSubmit,
    isLoading,
  };
};

export default useProfile;
