import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';

const useSignUp = () => {
  const [sampleFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: '',
  });

  const [sampleErrors] = useState({
    email: { msg: '' },
    password: { msg: '' },
    confirmPassword: { msg: '' },
    userExists: { msg: '' },
  });

  const [formData, setFormData] = useState(sampleFormData);
  const [errors, setErrors] = useState(sampleErrors);
  const [success, setSuccess] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrors(sampleErrors);
      setSuccess(false);
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData, sampleErrors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      setErrors(sampleErrors);
      e.preventDefault();
      try {
        await axios.post('api/users/create', formData);
        setSuccess(true);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          const errorData = err.response?.data;
          setErrors({ ...errors, ...errorData });
        }
      }
    },
    [errors, formData, sampleErrors],
  );

  return { errors, success, handleInputChange, handleSubmit };
};
export default useSignUp;
