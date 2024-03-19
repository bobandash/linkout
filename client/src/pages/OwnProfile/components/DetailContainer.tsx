import { FC } from 'react';

interface DetailContainerProps {
  name: string;
  value: string;
}

const DetailContainer: FC<DetailContainerProps> = ({ name, value }) => {
  return (
    <div className="relative mt-7 w-full">
      <p className="text-outline absolute left-0 top-0 -translate-x-1 -translate-y-1/2 bg-color_3  pb-1 pr-2 font-play text-xl uppercase text-white">
        {name}
      </p>
      <div
        className={`w-full break-words border-2 border-black bg-color_3 px-2 py-3 text-xl text-white focus:outline-none ${
          name == 'Link' && `break-long-words`
        }`}
      >
        {value}
      </div>
    </div>
  );
};

export default DetailContainer;
