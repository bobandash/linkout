import { FC } from 'react';
import he from 'he';

interface HeaderProps {
  name: string;
  children?: React.ReactNode;
  image?: string;
}

interface ImageComponentProps {
  image: string;
}

const ImageComponent: FC<ImageComponentProps> = ({ image }) => {
  const commonClasses =
    'mr-3 hidden aspect-square h-[60px] overflow-hidden rounded-full bg-white md:my-auto lg:flex lg:items-center lg:justify-center 2xl:mr-5 2xl:h-[80px]';

  return (
    <div className={commonClasses}>
      {image.length <= 2 && <p className="font-bold uppercase">{image}</p>}
      {image === 'images/defaultPfp.jpg' && (
        <img src={`/api/${image}`} alt="header picture" />
      )}
      {image.length > 2 && <img src={image} alt="header picture" />}
    </div>
  );
};

const Header: FC<HeaderProps> = ({ name, image, children }) => {
  return (
    <header className="bg-color_1 p-7 text-3xl md:p-10 md:py-5 lg:flex lg:items-center lg:border-b-0 lg:bg-color_3 2xl:p-16 2xl:py-7">
      {image && <ImageComponent image={image} />}
      <h1 className="text-outline mx-auto overflow-hidden text-ellipsis whitespace-nowrap text-center font-play text-3xl uppercase text-white md:text-4xl lg:mx-0 lg:text-left xl:text-6xl">
        {he.decode(name)}
      </h1>
      {children && children}
    </header>
  );
};

export default Header;
