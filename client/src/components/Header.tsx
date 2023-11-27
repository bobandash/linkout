import { FC } from 'react';
import he from 'he';

interface HeaderProps {
  name: string;
  children?: React.ReactNode;
  image?: string;
}

const Header: FC<HeaderProps> = ({ name, image, children }) => {
  return (
    <header className="bg-color_1 p-7 text-3xl md:p-10 md:py-5 lg:flex lg:items-center lg:border-b-0 lg:bg-color_3 2xl:p-16 2xl:py-7">
      {image && image.length <= 2 && (
        <div className="mr-3 hidden aspect-square h-[60px] overflow-hidden rounded-full bg-white md:my-auto lg:flex lg:items-center lg:justify-center 2xl:mr-5 2xl:h-[80px]">
          <p className="font-bold uppercase">{image}</p>
        </div>
      )}
      {image && image.length > 2 && (
        <div className="mr-3 hidden aspect-square h-[60px] overflow-hidden rounded-full bg-white md:my-auto lg:flex lg:items-center lg:justify-center 2xl:mr-5 2xl:h-[80px]">
          <img src={`/api/${image}`} alt={`${he.decode(name)} picture`} />
        </div>
      )}
      <h1 className="text-outline mx-auto max-w-[16ch] overflow-hidden text-ellipsis whitespace-nowrap text-center font-play text-4xl uppercase text-white md:max-w-[16ch] lg:mx-0 lg:text-left xl:text-6xl">
        {he.decode(name)}
      </h1>
      {children && children}
    </header>
  );
};

export default Header;
