import { FC } from 'react';
import CommunityProps from '../../../interface/community';
import CommunityCard from './CommunityCard';

interface CommunitiesListProps {
  communities: Array<CommunityProps>;
}

const CommunitiesList: FC<CommunitiesListProps> = ({ communities }) => {
  return (
    <>
      <div className="flex-row flex-wrap md:flex md:gap-3 xl:gap-5">
        {communities.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))}
      </div>
    </>
  );
};

export default CommunitiesList;
