import { FC } from 'react';

interface HeaderProps {
  name: string;
}

const Header: FC<HeaderProps> = ({ name }) => {
  return (
    <header className="grid-in-main-header border-b-4 bg-secondary p-5">
      <h1 className="text-outline font-fingerPaint text-4xl text-white md:text-6xl xl:text-7xl">
        {name}
      </h1>
    </header>
  );
};

export default Header;
