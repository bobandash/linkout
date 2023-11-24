import { useCallback, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

const useCommunity = () => {
  const { username } = useContext(UserContext);
  // Methods to create a state
  const sampleCommunity = {
    name: '',
    description: '',
    profilePic: '',
  };
  const [sampleErrors] = useState({
    name: { msg: '' },
    description: { msg: '' },
  });
  const [community, setCommunity] = useState(sampleCommunity);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(sampleErrors);

  useEffect(() => {
    if (username) {
      const newCommunity = {
        name: `${username}'s Community`,
        description: '',
        profilePic: '',
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
      const response = await axios.post('/api/community/create', community);
      if (response.status === 200) {
        /*         const communityId = response.data.community.id;
        navigate(`/community/${communityId}`); */
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
        setErrors(err.response?.data);
      }
    }
  }

  return {
    community,
    handleInputChange,
    handleTextAreaChange,
    handleSubmit,
    errors,
  };
};

export default useCommunity;
