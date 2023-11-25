import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommunityCard from './CommunityCard';
import PageMainContentContainer from '../../components/PageMainContentContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he';

interface CommunityProps {
  name: string;
  description: string;
  communityId: string;
  numUsers: number;
  profilePic: string;
}

const CommunitiesComponent = () => {
  const [communities, setCommunities] = useState([]);
  const [biggestCommunities, setBiggestCommunities] = useState([]);
  useEffect(() => {
    async function main() {
      await Promise.all([getCommunities(), getBiggestCommunities()]);
    }

    async function getCommunities() {
      const response = await axios.get('/api/community');
      setCommunities(response.data);
    }
    async function getBiggestCommunities() {
      const response = await axios.get('/api/community', {
        params: {
          limit: 5,
          order: -1,
        },
      });
      const communities = response.data;
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

      setBiggestCommunities(communitiesDecoded);
    }
    main();
  }, []);

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
            {biggestCommunities.map((community) => (
              <CommunityCard community={community} />
            ))}
          </div>
        </div>
      </div>
    </PageMainContentContainer>
  );
};

export default CommunitiesComponent;
