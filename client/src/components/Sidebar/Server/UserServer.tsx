import { FC } from 'react';

interface CommunitiesProp {
  community: {
    name: string;
    profilePic: string;
    description: string;
  };
}

const UserServer: FC<CommunitiesProp> = ({ community }) => {
  if (community.profilePic.length <= 2) {
    return (
      <div className="mb-2 flex aspect-square w-full items-center justify-center rounded-full border-2 border-black bg-white p-3 hover:cursor-pointer">
        <p className="font-bold uppercase">{community.profilePic}</p>
      </div>
    );
  }
  return (
    <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-full border-2 border-black p-3 hover:cursor-pointer">
      <img
        className="absolute left-0 top-0 h-full"
        src={`/api/${community.profilePic}`}
        alt="server picture"
      />
    </div>
  );
};

export default UserServer;
