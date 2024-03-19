import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useUserContext } from '../../../context/useUserContext';
const useSignIn = () => {
  const { setIsSignedIn } = useUserContext();
  const [sampleFormData] = useState({
    email: '',
    password: '',
  });

  const [formData, setFormData] = useState(sampleFormData);
  const [hasErrors, setHasErrors] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasErrors(false);
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      setHasErrors(false);
      e.preventDefault();
      try {
        const response = await axios.post('/api/users/login', formData);
        if (response.status === 200) {
          setIsSignedIn(true);
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setHasErrors(true);
        }
      }
    },
    [formData, setIsSignedIn],
  );

  const loginDemoUser = async () => {
    try {
      const response = await axios.post('/api/users/login', {
        email: 'demouser@gmail.com',
        password: 'Randompassword123!',
      });
      if (response.status === 200) {
        setIsSignedIn(true);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setHasErrors(true);
      }
    }
  };

  return { hasErrors, handleInputChange, handleSubmit, loginDemoUser };
};
export default useSignIn;
