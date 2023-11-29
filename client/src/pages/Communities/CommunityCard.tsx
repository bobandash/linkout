import axios from 'axios';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import CommunityProps from '../../interface/community';

interface CommunityCardProps {
  community: CommunityProps;
}

const CommunityCard: FC<CommunityCardProps> = ({ community }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/communities/' + community.id);
  }
  async function joinCommunity() {
    try {
      const data = {
        communityId: community.id,
      };
      await axios.put('/api/users/user/community/join', data);
      handleNavigate();
    } catch {
      console.log('There was an error joining the community');
    }
  }

  return (
    <>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border-2 md:aspect-square md:w-[calc(33.33%-0.8333rem)] 2xl:w-[calc(25%-0.9375rem)]">
        <div className="flex min-h-fit flex-row gap-3 bg-color_1 p-3  pb-1 text-white shadow-custom">
          <div className="relative mb-2 aspect-square w-[70px] overflow-hidden rounded-full border-2 border-black bg-white p-3 hover:cursor-pointer">
            {community.profilePic.length <= 2 ? (
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase text-black">
                {community.profilePic}
              </p>
            ) : (
              <img
                className="absolute left-0 top-0 h-full"
                src={`/api/${community.profilePic}`}
                alt="server picture"
              />
            )}
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h3 className="block overflow-hidden overflow-ellipsis whitespace-nowrap font-bold uppercase lg:text-xl">
              {community.name}
            </h3>
            <h4 className="overflow-ellipsis whitespace-nowrap">
              Members: {community.numUsers}
            </h4>
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-between bg-white p-3 pt-0  shadow-custom">
          <p className="max-h-4/5 mb-2 mt-1 overflow-hidden overflow-ellipsis text-black">
            {community.description}
          </p>
          {community.joinedStatus ? (
            <button
              onClick={handleNavigate}
              className="bg-primary p-1 text-xl font-bold uppercase text-white shadow-custom"
            >
              Visit
            </button>
          ) : (
            <button
              className="bg-lightGreen p-1 text-xl font-bold uppercase shadow-custom"
              onClick={async () => {
                await joinCommunity();
              }}
            >
              Join
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
