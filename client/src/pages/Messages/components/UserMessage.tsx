import ProfilePic from '../../../components/ProfilePic';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import MessagesProp from '../interface/MessagesProp';

interface UserMessageProps {
  data: MessagesProp;
}

const UserMessage: FC<UserMessageProps> = ({ data }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/conversation/' + data._id);
  }

  return (
    <div
      onClick={handleNavigate}
      className="mb-1 grid grid-cols-desktop_profile gap-2 rounded-lg bg-color_2 p-4 hover:cursor-pointer lg:gap-5"
    >
      <div className="flex items-center justify-center">
        <ProfilePic
          size="medium"
          image={data.user.profilePic}
          name={data.user.username}
        />
      </div>
      <div className="flex flex-col justify-center text-white">
        <p className="overflow-hidden overflow-ellipsis text-2xl font-bold">
          {data.user.username}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl">
          {data.user.status}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;
