import { FC } from 'react';
import { useNavigate } from 'react-router';

interface CommunitiesProp {
  community: {
    name: string;
    profilePic: string;
    description: string;
    _id: string;
  };
}

const UserServer: FC<CommunitiesProp> = ({ community }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/communities/' + community._id);
  }

  if (community.profilePic.length <= 2) {
    return (
      <div
        onClick={handleNavigate}
        className="flex min-h-[50px] min-w-[50px] items-center justify-center rounded-full border-2 border-black bg-white hover:cursor-pointer lg:min-h-[60px] lg:min-w-[60px]"
      >
        <p className="font-bold uppercase">{community.profilePic}</p>
      </div>
    );
  }
  return (
    <div
      onClick={handleNavigate}
      className="relative flex aspect-square min-h-[50px] min-w-[50px] overflow-hidden rounded-full border-2 bg-white hover:cursor-pointer lg:min-h-[60px] lg:min-w-[60px]"
    >
      <img
        className="absolute left-0 top-0 h-full w-full"
        src={`/api/${community.profilePic}`}
        alt="server picture"
      />
    </div>
  );
};

export default UserServer;
