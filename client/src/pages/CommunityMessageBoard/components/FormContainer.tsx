import FormImage from './FormImage';
import FormText from './FormText';
import { FC } from 'react';

interface FormContainerProps {
  handleMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  message: string;
}

const FormContainer: FC<FormContainerProps> = ({
  handleMessage,
  handleSubmitMessage,
  message,
}) => {
  return (
    <div className="mt-auto flex flex-row bg-color_1 p-5 pb-3 xl:pb-5 2xl:p-7">
      <FormImage />
      <FormText
        handleMessage={handleMessage}
        handleSubmitMessage={handleSubmitMessage}
        message={message}
      />
    </div>
  );
};

export default FormContainer;
