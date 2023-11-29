import { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he';
import CommunityProps from '../../../interface/community';

interface CommunityJoinedProps extends CommunityProps {
  joinedStatus: boolean;
}

interface getCommunitiesProps {
  filters: {
    nameOrder?: number;
    limit?: number;
    numUsersOrder?: number;
  };
  setState: React.Dispatch<React.SetStateAction<CommunityProps[]>>;
}

// Hook to get top 4 biggest communities and list of all communities
const useCommunities = () => {
  const [communities, setCommunities] = useState<Array<CommunityProps>>([]);
  const [biggestCommunities, setBiggestCommunities] = useState<
    Array<CommunityProps>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function main() {
      const allCommunitiesFilter = {
        nameOrder: 1,
      };
      const biggestCommunitiesFilter = {
        limit: 4,
        numUsersOrder: -1,
      };

      await Promise.all([
        getCommunities({
          filters: allCommunitiesFilter,
          setState: setCommunities,
        }),
        getCommunities({
          filters: biggestCommunitiesFilter,
          setState: setBiggestCommunities,
        }),
      ]);
      setIsLoading(false);
    }

    async function getCommunities({
      filters,
      setState,
    }: getCommunitiesProps): Promise<void> {
      const communities = (
        await axios.get('/api/community', {
          params: {
            ...filters,
          },
        })
      ).data.communities;

      const communitiesDecoded = communities.map(
        (community: CommunityProps) => {
          const decodedCommunity = {
            ...community,
            name: he.decode(community.name),
            description: he.decode(community.description),
          };
          return decodedCommunity;
        },
      );

      const userCommunities: Array<CommunityProps> = (
        await axios.get('/api/users/user/community')
      ).data.communities;

      const allCommunitiesWithJoinedStatus = communitiesDecoded.map(
        (community: CommunityJoinedProps) => {
          let hasJoined = false;
          userCommunities.forEach((userCommunity) => {
            if (userCommunity._id === community._id) {
              hasJoined = true;
              return;
            }
          });
          {
            hasJoined
              ? (community.joinedStatus = true)
              : (community.joinedStatus = false);
          }
          return { ...community };
        },
      );

      setState(allCommunitiesWithJoinedStatus);
    }

    main();
  }, []);

  return { isLoading, communities, biggestCommunities };
};

export default useCommunities;
