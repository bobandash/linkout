import { FC, useContext, useEffect, useState, useRef } from 'react';
import ProfilePic from '../../ProfilePic';
import UserProps from '../interface/UserProps';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router';

interface UserComponentProps {
  user: UserProps;
}

const UserComponent: FC<UserComponentProps> = ({ user }) => {
  const userDivRef = useRef<null | HTMLDivElement>(null);
  const { username } = useContext(UserContext);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    if (isUser) {
      navigate('/profile/view');
    } else {
      navigate(`/profile/${user._id}/view`);
    }
  }

  useEffect(() => {
    if (username === user.username) {
      setIsUser(true);
    }
  }, [username, user.username]);

  return (
    <div
      className="relative mb-1 grid grid-cols-desktop_profile gap-2 rounded-lg bg-color_4 p-2 hover:cursor-pointer"
      ref={userDivRef}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center">
        <ProfilePic size="small" image={user.profilePic} name={user.username} />
      </div>
      <div className="flex flex-col justify-center text-white">
        <p className="overflow-hidden overflow-ellipsis text-xl font-bold">
          {user.username}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {user.status}
        </p>
      </div>
    </div>
  );
};

export default UserComponent;
