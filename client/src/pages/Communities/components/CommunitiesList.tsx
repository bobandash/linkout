import { FC } from 'react';
import CommunityProps from '../../../interface/community';
import CommunityCard from './CommunityCard';

interface CommunitiesListProps {
  name: string;
  communities: Array<CommunityProps>;
}

const CommunitiesList: FC<CommunitiesListProps> = ({ name, communities }) => {
  return (
    <>
      <h1 className="text-outline mt-5 font-play text-2xl text-white md:text-3xl xl:text-4xl">
        {name}
      </h1>
      <div className="flex-row flex-wrap md:flex md:gap-3 xl:gap-5">
        {communities.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))}
      </div>
    </>
  );
};

export default CommunitiesList;
