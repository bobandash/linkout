import { FC } from 'react';

interface HeaderProps {
  name: string;
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ name, children }) => {
  return (
    <header className="grid-in-main-header border-b-4 bg-secondary p-5 md:border-b-0 md:bg-primary">
      <h1 className="text-outline text-center font-fingerPaint text-4xl text-white md:text-left md:text-4xl xl:text-6xl">
        {name}
      </h1>
      {children && children}
    </header>
  );
};

export default Header;
