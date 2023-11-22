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
        className="text-outline absolute left-0 top-0 -translate-x-1 -translate-y-1/2 bg-primary pb-1 pr-2 font-fingerPaint text-xl uppercase text-white"
      >
        {name}
      </label>
      <input
        autoFocus={autoFocus ? true : false}
        type="text"
        className="w-full border-2 border-black bg-primary px-2 py-3 text-xl text-white focus:outline-none"
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
