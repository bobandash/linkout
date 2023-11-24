import { FC } from 'react';

interface HeaderProps {
  name: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ name, children }) => {
  return (
    <header className="grid-in-main-header bg-color_1 lg:bg-color_3 p-7 md:p-10 md:pb-5 lg:border-b-0 2xl:p-16 2xl:pb-5">
      <h1 className="text-outline pb-2 text-center font-play text-4xl uppercase text-white lg:text-left xl:text-6xl">
        {name}
      </h1>
      {children && children}
    </header>
  );
};

export default Header;
