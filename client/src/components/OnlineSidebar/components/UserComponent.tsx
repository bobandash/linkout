import { FC } from 'react';
import ProfilePic from '../../ProfilePic';
import UserProps from '../interface/UserProps';

interface UserComponentProps {
  user: UserProps;
}

const UserComponent: FC<UserComponentProps> = ({ user }) => {
  return (
    <div className="grid-cols-desktop_profile mb-1 grid gap-2 rounded-lg bg-color_4 p-2">
      <div className="flex items-center justify-center">
        <ProfilePic size="small" image={user.profilePic} name={user.username} />
      </div>
      <div className="flex flex-col justify-center text-white">
        <p className="overflow-hidden overflow-ellipsis text-xl font-bold">
          {user.username}
        </p>
        <p>{user.status}</p>
      </div>
    </div>
  );
};

export default UserComponent;
