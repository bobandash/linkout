import { FC, useRef, useState, useEffect } from 'react';
import camelize from '../../utils/camelize';

interface FormIconInputProps {
  centered?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  defaultValue?: string;
}

const FormIconInput: FC<FormIconInputProps> = ({
  centered,
  handleInputChange,
  name,
  defaultValue,
}) => {
  const nameCamelized = camelize(name);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [defaultValueIsImage, setDefaultValueIsImage] = useState(false);

  // TO-DO: Change hacky way of presenting whether or not the default value is image
  useEffect(() => {
    if (defaultValue) {
      if (
        defaultValue?.includes('images') ||
        defaultValue?.includes('uploads')
      ) {
        setDefaultValueIsImage(true);
      }
    }
  }, [defaultValue]);

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageRef.current !== null && e.target.files !== null) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
      setHasImage(true);
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
      <img className="flex-grow hover:cursor-pointer" ref={imageRef} />
      {defaultValue && !hasImage && !defaultValueIsImage && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          {defaultValue.toUpperCase()}
        </p>
      )}
      {defaultValue && !hasImage && defaultValueIsImage && (
        <img
          className="absolute h-full w-full hover:cursor-pointer"
          src={defaultValue}
        />
      )}
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
