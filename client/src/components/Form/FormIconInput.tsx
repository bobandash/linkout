import { FC, useRef, useEffect } from 'react';
import camelize from '../../utils/camelize';

interface FormIconInputProps {
  centered?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  /*   value: string | null; */
}

const FormIconInput: FC<FormIconInputProps> = ({
  centered,
  handleInputChange,
  name,
  /*   value, */
}) => {
  const nameCamelized = camelize(name);
  const imageRef = useRef<HTMLImageElement | null>(null);

  /*   useEffect(() => {
    if (imageRef.current) {
      imageRef.current.src = `/api/${value}`;
    }
  }, [value]); */

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageRef.current !== null && e.target.files !== null) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);

      imageRef.current.onload = function () {
        if (imageRef.current !== null) {
          URL.revokeObjectURL(imageRef.current.src);
        }
      };
    }
  };

  return (
    <div
      className={`relative flex aspect-square w-[80px] overflow-hidden rounded-full border-2 bg-white hover:cursor-pointer md:w-[100px] ${
        centered && 'mx-auto'
      }`}
    >
      <img
        alt="picture"
        className="flex-grow hover:cursor-pointer"
        ref={imageRef}
      />
      <input
        onChange={(e) => {
          loadFile(e);
          handleInputChange(e);
        }}
        type="file"
        className="absolute left-0 top-0 h-full w-full opacity-0 hover:cursor-pointer"
        name={nameCamelized}
        id={nameCamelized}
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default FormIconInput;
