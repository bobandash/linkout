import { FC } from 'react';
import { useNavigate } from 'react-router';
import CommunityProps from '../../../interface/community';
import he from 'he';

interface CommunityCardProps {
  community: CommunityProps;
}

const CommunityCard: FC<CommunityCardProps> = ({ community }) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate('/communities/' + community.id);
  }

  return (
    <>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border-2 sm:w-[calc(50%-0.5rem)] md:aspect-square md:w-[calc(33.333333%-0.5rem)] lg:w-[calc(50%-0.5rem)] xl:w-[calc(33.3333%-0.5rem)] 3xl:w-[calc(25%-0.5rem)]">
        <div className="grid min-h-fit grid-cols-desktop_profile bg-color_1 p-3  pb-1 text-white shadow-custom">
          <div className="relative mb-2 aspect-square w-[70px] overflow-hidden rounded-full border-2 border-black bg-white p-3 hover:cursor-pointer">
            {community.profilePic.length <= 2 ? (
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase text-black">
                {community.profilePic}
              </p>
            ) : (
              <img
                className="absolute left-0 top-0 h-full"
                src={community.profilePic}
                alt="server picture"
              />
            )}
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h3 className="block overflow-hidden overflow-ellipsis whitespace-nowrap font-bold uppercase lg:text-xl">
              {he.decode(community.name)}
            </h3>
            <h4 className="overflow-ellipsis whitespace-nowrap">
              Members: {community.numUsers}
            </h4>
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-between overflow-hidden overflow-ellipsis bg-white px-3 pt-0 shadow-custom">
          <p className="mb-2 mt-1 overflow-ellipsis text-black md:line-clamp-3 lg:line-clamp-4">
            {he.decode(community.description)}
          </p>
        </div>
        <div className="bg-white px-3 py-1 pb-2">
          <button
            onClick={handleNavigate}
            className="mx-auto block w-full border-2 border-solid border-black bg-primary py-1 text-xl font-bold uppercase text-white shadow-custom"
          >
            Visit
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
