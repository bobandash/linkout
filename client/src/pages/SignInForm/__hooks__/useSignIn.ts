import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAuthContext } from '../../../context/useAuthContext';
const useSignIn = () => {
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
        const response = await axios.post(
          'https://linkout-1.onrender.com/auth/login',
          formData,
          { withCredentials: true },
        );
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
      const response = await axios.post(
        'https://linkout-1.onrender.com/auth/login',
        {
          email: 'demouser123@gmail.com',
          password: 'Randompassword123!',
        },
        { withCredentials: true },
      );
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
