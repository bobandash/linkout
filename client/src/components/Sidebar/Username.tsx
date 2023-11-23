import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const UsernameComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Username');
  function handleEditProfile() {
    navigate('/profile');
  }

  useEffect(() => {
    async function getUserName() {
      try {
        const response = await axios.get('/api/users/user/username', {
          withCredentials: true,
        });
        const username = response.data.username;
        setUsername(username);
      } catch {
        setUsername('Cannot find');
      }
    }
    getUserName();
  }, []);

  return (
    <div className="grid-in-sidebar-header flex w-full flex-row gap-x-4 border-b-4 border-black bg-secondary p-5">
      <div className="flex items-center justify-center">
        <div className="aspect-square min-w-[60px] rounded-full bg-white 2xl:min-w-[80px]"></div>
      </div>
      <div className="flex flex-col justify-center overflow-hidden">
        <h1 className="text-outline xl:text-1xl overflow-ellipsis font-play font-bold uppercase text-white md:max-w-[10ch] md:overflow-hidden md:overflow-ellipsis md:text-xl">
          {username}
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

export default UsernameComponent;
