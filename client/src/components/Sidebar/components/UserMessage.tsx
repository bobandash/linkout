import ProfilePic from '../../ProfilePic';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import ConversationSidebarProps from '../interface/ConversationSidebarProps';

interface UserMessageProps {
  data: ConversationSidebarProps;
}

const UserMessage: FC<UserMessageProps> = ({ data }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/conversation/' + data._id);
  }

  return (
    <div
      onClick={handleNavigate}
      className="mb-1 grid grid-cols-desktop_sidebar_profile gap-2 rounded-lg bg-color_4 p-2 hover:cursor-pointer"
    >
      <div className="flex items-center justify-center">
        <ProfilePic
          size="x-small"
          image={data.user.profilePic}
          name={data.user.username}
        />
      </div>
      <div className="flex flex-col justify-center text-white">
        <p className="overflow-hidden overflow-ellipsis text-xl font-bold">
          {data.user.username}
        </p>
        <p className="max-w-[12ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
          {data.user.status}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;
