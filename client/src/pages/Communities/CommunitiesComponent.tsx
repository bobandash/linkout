import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommunityCard from './CommunityCard';
import PageMainContentContainer from '../../components/PageMainContentContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he';
import LoadingScreen from '../Loading/index';

interface CommunityProps {
  _id: string;
  name: string;
  description: string;
  communityId: string;
  numUsers: number;
  profilePic: string;
}

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

const CommunitiesComponent = () => {
  const [communities, setCommunities] = useState<Array<CommunityProps>>([]);
  const [biggestCommunities, setBiggestCommunities] = useState([]);
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

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <PageMainContentContainer>
      <div className="flex-grow bg-color_3">
        <div>
          <div className="bg-secondary mx-auto rounded-lg border-2 bg-primary p-5 ">
            <h1 className="text-center text-xl font-bold uppercase text-white md:text-2xl lg:text-3xl xl:text-4xl">
              Find Interesting People
            </h1>
            <h2 className="mb-3 text-center text-xl text-white md:text-2xl">
              Join a community and start linking out.
            </h2>
            <form className="mx-auto w-4/5 max-w-[500px] lg:text-xl">
              <div className="relative w-full">
                <input className="rounded-1 w-full border-2 px-1 font-play focus:outline-none" />
                <button
                  className="absolute right-2 top-1/2 w-fit -translate-y-1/2"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </form>
          </div>
          <h1 className="text-outline mt-5 font-play text-2xl text-white md:text-3xl xl:text-4xl">
            Biggest Communities
          </h1>
          <div className="flex-row flex-wrap md:flex md:gap-3 xl:gap-5">
            {biggestCommunities.map((community: CommunityJoinedProps) => (
              <CommunityCard key={community._id} community={community} />
            ))}
          </div>
          <h1 className="text-outline mt-5 font-play text-2xl text-white md:text-3xl xl:text-4xl">
            Communities
          </h1>
          <div className="flex-row flex-wrap md:flex md:gap-3 xl:gap-5">
            {communities.map((community: CommunityJoinedProps) => (
              <CommunityCard key={community._id} community={community} />
            ))}
          </div>
        </div>
      </div>
    </PageMainContentContainer>
  );
};

export default CommunitiesComponent;
