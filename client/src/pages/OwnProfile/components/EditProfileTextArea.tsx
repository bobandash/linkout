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
        className="text-outline bg-color_3 absolute left-0 top-0 -translate-x-1 -translate-y-1/2 pb-1 pr-2 font-play text-xl uppercase text-white"
      >
        {name}
      </label>
      <textarea
        className="bg-color_3 w-full border-2 border-black px-2 py-3 text-xl text-white focus:outline-none"
        name={nameCamelized}
        id={`${name}`}
        onChange={handleChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default EditProfileTextArea;
