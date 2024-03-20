import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../../context/useAuthContext';
const useSignIn = () => {
  const navigate = useNavigate();
  const { setIsSignedIn } = useAuthContext();
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
        const response = await axios.post('/api/auth/login', formData);
        if (response.status === 200) {
          setIsSignedIn(true);
          navigate('/dashboard');
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setHasErrors(true);
        }
      }
    },
    [formData, setIsSignedIn, navigate],
  );

  const loginDemoUser = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: 'demouser123@gmail.com',
        password: 'Randompassword123!',
      });
      if (response.status === 200) {
        setIsSignedIn(true);
        navigate('/dashboard');
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
