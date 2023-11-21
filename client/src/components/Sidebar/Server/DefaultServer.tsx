import { FC } from 'react';
import { useNavigate } from 'react-router';

interface DefaultServerProps {
  icon: JSX.Element;
  link: string;
}

const DefaultServer: FC<DefaultServerProps> = ({ icon, link }) => {
  const navigate = useNavigate();
  function handleNav() {
    navigate(link);
  }
  return (
    <div
      onClick={handleNav}
      className="mb-2 flex aspect-square w-full min-w-[50px] items-center justify-center rounded-full border-2 bg-white hover:cursor-pointer lg:min-w-[60px]"
    >
      {icon}
    </div>
  );
};

export default DefaultServer;
