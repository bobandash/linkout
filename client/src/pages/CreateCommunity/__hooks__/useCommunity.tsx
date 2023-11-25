import { useCallback, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

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
      setCommunity(newCommunity);
    }
  }, [username]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(sampleErrors);
      const { name, value } = e.target;
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

      const response = await axios.post('/api/community/create', data);
      if (response.status === 200) {
        /*         const communityId = response.data.community.id;
        navigate(`/community/${communityId}`); */
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
  };
};

export default useCommunity;
