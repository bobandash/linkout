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
      <div className="3xl:gap-[0.66666667rem] flex-row flex-wrap sm:flex sm:gap-[1rem] md:gap-[0.75rem] lg:gap-[1rem] xl:gap-[0.75rem]">
        {communities.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))}
      </div>
    </>
  );
};

export default CommunitiesList;
