import { FC } from 'react';
import camelize from '../../../utils/camelize';

interface EditProfileInputProps {
  name: string;
  autoFocus?: boolean;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const EditProfileInput: FC<EditProfileInputProps> = ({
  name,
  autoFocus,
  value,
  handleInputChange,
  placeholder,
}) => {
  const nameCamelized = camelize(name);

  return (
    <div className="relative mt-5 w-full">
      <label
        htmlFor={nameCamelized}
        className="text-outline bg-color_3 absolute left-0 top-0 -translate-x-1 -translate-y-1/2 pb-1 pr-2 font-play text-xl uppercase text-white"
      >
        {name}
      </label>
      <input
        autoFocus={autoFocus ? true : false}
        type="text"
        className="bg-color_3 w-full border-2 border-black px-2 py-3 text-xl text-white focus:outline-none"
        name={nameCamelized}
        id={nameCamelized}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder ? placeholder : ''}
      />
    </div>
  );
};

export default EditProfileInput;
