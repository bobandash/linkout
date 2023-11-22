import { FC } from 'react';
import camelize from '../../../utils/camelize';

interface EditProfileInputProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditProfileTextArea: FC<EditProfileInputProps> = ({
  name,
  value,
  handleChange,
}) => {
  const nameCamelized = camelize(name);
  return (
    <div className="relative mt-4 w-full">
      <label
        htmlFor={nameCamelized}
        className="text-outline absolute left-0 top-0 -translate-x-1 -translate-y-1/2 bg-primary pb-1 pr-2 font-fingerPaint text-xl uppercase text-white"
      >
        {name}
      </label>
      <textarea
        className="w-full border-2 border-black bg-primary px-2 py-3 text-xl text-white focus:outline-none"
        name={nameCamelized}
        id={`${name}`}
        onChange={handleChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default EditProfileTextArea;
