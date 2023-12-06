import { FC } from 'react';
import CommunityProps from '../../../interface/community';
import CommunityCard from './CommunityCard';

interface CommunitiesListProps {
  communities: Array<CommunityProps>;
}

const CommunitiesList: FC<CommunitiesListProps> = ({ communities }) => {
  return (
    <>
      <div className="3xl:gap-[0.66666667rem] flex-row flex-wrap sm:flex sm:gap-[1rem] md:gap-[0.75rem] lg:gap-[1rem] xl:gap-[0.75rem]">
        {communities.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))}
      </div>
    </>
  );
};

export default CommunitiesList;
