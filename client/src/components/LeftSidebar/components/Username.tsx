import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import profileProps, { mockProfile } from '../../../interface/profile';
import ProfilePic from '../../ProfilePic';

const Username = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<profileProps>(mockProfile);
  const [hasError, setHasError] = useState(false);
  function handleEditProfile() {
    navigate('/dashboard/profile/edit');
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios.get(
          'https://linkout-1.onrender.com/users/me/profile',
          {
            withCredentials: true,
          },
        );
        const profile = response.data.profile;
        setProfile(profile);
      } catch {
        console.error('There was an error fetching the profile');
        setHasError(true);
      }
    }
    getProfile();
  }, []);

  if (hasError) {
    return (
      <div className="bg-secondary flex w-full flex-row gap-x-4 border-b-4 border-black p-5 grid-in-sidebar-header">
        <div className="flex items-center justify-center">
          <div className="aspect-square min-w-[60px] rounded-full bg-white 2xl:min-w-[80px]"></div>
        </div>
        <div className="flex flex-col justify-center overflow-hidden">
          <h1 className="text-outline xl:text-1xl overflow-ellipsis font-play font-bold uppercase text-white md:max-w-[10ch] md:overflow-hidden md:overflow-ellipsis md:text-xl">
            ERROR LOADING
          </h1>
          <button
            onClick={handleEditProfile}
            className="w-max font-play uppercase text-white"
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary flex w-full flex-row gap-x-4 border-b-4 border-black p-5 grid-in-sidebar-header">
      <div className="flex items-center justify-center">
        <ProfilePic name={profile.username} image={profile.profilePic} />
      </div>
      <div className="flex flex-col justify-center overflow-hidden">
        <h1 className="text-outline xl:text-1xl overflow-ellipsis font-play font-bold uppercase text-white md:max-w-[10ch] md:overflow-hidden md:overflow-ellipsis md:text-xl">
          {profile.username}
        </h1>
        <button
          onClick={handleEditProfile}
          className="w-max font-play uppercase text-white"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Username;
