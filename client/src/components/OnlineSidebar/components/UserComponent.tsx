import { FC, useContext, useEffect, useState, useRef } from 'react';
import ProfilePic from '../../ProfilePic';
import UserProps from '../interface/UserProps';
import { UserContext } from '../../../context/UserContext';
import useOutsideClick from '../__hooks__/useOutsideClick';
import { useNavigate } from 'react-router';

interface UserComponentProps {
  user: UserProps;
}

interface UserActionsPopupProps {
  isUser: boolean;
  user: UserProps;
}

// pop up that appears when a user sidebar icon clicked
const UserActionsPopup: FC<UserActionsPopupProps> = ({ isUser, user }) => {
  const navigate = useNavigate();
  function navigateOwnProfileView() {
    navigate('/profile/view');
  }
  function navigateOtherUserProfileView() {
    navigate(`/profile/${user._id}/view`);
  }

  // TO-DO: check if conversation exists, if it exists then direct to that conversation
  // otherwise, create a new conversation
  async function navigateMessage() {}

  // checks if the user is the user logged in
  if (isUser) {
    return (
      <div className="absolute right-[105%] flex flex-col whitespace-nowrap bg-color_1 p-5 text-xl text-white">
        <button onClick={navigateOwnProfileView}>View Profile</button>
      </div>
    );
  }

  return (
    <div className="absolute right-[105%] flex flex-col whitespace-nowrap bg-color_1 p-5 text-xl text-white">
      <button onClick={navigateOtherUserProfileView}>View Profile</button>
      <button
        onClick={async () => {
          await navigateMessage();
        }}
      >
        Message
      </button>
    </div>
  );
};

const UserComponent: FC<UserComponentProps> = ({ user }) => {
  const userDivRef = useRef<null | HTMLDivElement>(null);
  const { username } = useContext(UserContext);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useOutsideClick({
    ref: userDivRef,
    callback: () => {
      setIsPopupActive(false);
    },
  });

  function handleClick() {
    setIsPopupActive(!isPopupActive);
  }

  useEffect(() => {
    if (username === user.username) {
      setIsUser(true);
    }
  }, [username, user.username]);

  return (
    <div
      className="relative mb-1 grid grid-cols-desktop_profile gap-2 rounded-lg bg-color_4 p-2"
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
      {isPopupActive && <UserActionsPopup isUser={isUser} user={user} />}
    </div>
  );
};

export default UserComponent;
