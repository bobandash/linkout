import { FC } from 'react';

interface HeaderProps {
  name: string;
}

const Header: FC<HeaderProps> = ({ name }) => {
  return (
    <header className="grid-in-main-header border-b-4 bg-secondary p-5">
      <h1 className="text-outline text-center font-fingerPaint text-4xl text-white md:text-left md:text-4xl xl:text-6xl">
        {name}
      </h1>
    </header>
  );
};

export default Header;
