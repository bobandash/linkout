import { FC } from 'react';
import camelize from '../../utils/camelize';
import RequiredAsterisk from '../RequiredAsterisk';

interface EditProfileInputProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

const FormTextArea: FC<EditProfileInputProps> = ({
  name,
  value,
  handleChange,
  rows,
  required,
}) => {
  const nameCamelized = camelize(name);
  return (
    <div className="relative mt-7 w-full">
      <label
        htmlFor={nameCamelized}
        className="text-outline absolute left-0 top-0 -translate-x-1 -translate-y-1/2 bg-color_3  pb-1 pr-2 font-play text-xl uppercase text-white"
      >
        {name}
        {required && <RequiredAsterisk />}
      </label>
      <textarea
        className="w-full resize-none border-2 border-black bg-color_3 px-2 py-3 text-xl text-white focus:outline-none"
        name={nameCamelized}
        id={nameCamelized}
        onChange={handleChange}
        value={value}
        rows={rows && rows}
        required={required ? true : false}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
