import { FC } from 'react';

interface FormErrorProps {
  message: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return <p className="text-sm text-error">{message}</p>;
};

export default FormError;
