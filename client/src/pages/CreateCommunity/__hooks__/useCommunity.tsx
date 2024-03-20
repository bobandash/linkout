import { useCallback, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import socket from '../../../socket';

interface CommunityProps {
  name: string;
  description: string;
  profilePic: File | null;
}

const useCommunity = () => {
  const { username } = useContext(UserContext);
  // Methods to create a state
  const sampleCommunity = {
    name: '',
    description: '',
    profilePic: null,
  };
  const [sampleErrors] = useState({
    name: { msg: '' },
    description: { msg: '' },
  });
  const [defaultValue, setDefaultValue] = useState('');
  const [community, setCommunity] = useState<CommunityProps>(sampleCommunity);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(sampleErrors);

  useEffect(() => {
    if (username) {
      const newCommunity = {
        name: `${username}'s Community`,
        description: '',
        profilePic: null,
      };
      if (username.length > 2) {
        setDefaultValue(username.substring(0, 2));
      } else {
        setDefaultValue(username);
      }
      setCommunity(newCommunity);
    }
  }, [username]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(sampleErrors);
      const { name, value } = e.target;
      if (name === 'name') {
        if (value.length > 2) {
          setDefaultValue(value.substring(0, 2));
        } else {
          setDefaultValue(value);
        }
      }
      setCommunity({ ...community, [name]: value });
    },
    [community, sampleErrors],
  );

  const handleProfileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const { name } = e.target;
        const file = e.target.files[0];
        setErrors(sampleErrors);
        setCommunity({ ...community, [name]: file });
      }
    },
    [community, sampleErrors],
  );

  const handleTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setErrors(sampleErrors);
      const { name, value } = e.target;
      setCommunity({ ...community, [name]: value });
    },
    [community, sampleErrors],
  );
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // Need to create form data because handling images
      const data = new FormData();
      data.append('name', community.name);
      data.append('description', community.description);
      if (community.profilePic) {
        data.append('profilePic', community.profilePic);
      }

      const response = await axios.post(
        'https://linkout-1.onrender.com/communities/create',
        data,
        { withCredentials: true },
      );
      if (response.status == 200) {
        const communityData = response.data.community;
        socket.emit('join_new_community', communityData);
        const communityId = response.data.community.id;
        navigate(`/dashboard/communities/${communityId}`);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setErrors(err.response?.data);
      }
    }
  }

  return {
    community,
    handleInputChange,
    handleTextAreaChange,
    handleSubmit,
    handleProfileInputChange,
    errors,
    defaultValue,
  };
};

export default useCommunity;
