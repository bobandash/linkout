import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useRef, FC } from 'react';
import useAutosizeTextArea from '../__hooks__/useAutosizeTextArea';

interface FormTextProps {
  handleMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  message: string;
}

const FormText: FC<FormTextProps> = ({
  handleMessage,
  handleSubmitMessage,
  message,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutosizeTextArea(textAreaRef.current, message);

  return (
    <form
      onSubmit={async (e) => {
        await handleSubmitMessage(e);
      }}
      encType="multipart/form-data"
      className="relative mt-auto flex flex-grow flex-row bg-color_1"
    >
      <textarea
        ref={textAreaRef}
        className="flex-grow resize-none bg-color_2 p-3 text-xl text-white focus:outline-none"
        placeholder="Write a message"
        rows={1}
        onChange={handleMessage}
      ></textarea>
      <button className="flex items-start justify-center bg-color_2 p-3">
        <FontAwesomeIcon icon={faPaperPlane} color={'#FFF'} size={'xl'} />
      </button>
    </form>
  );
};

export default FormText;
