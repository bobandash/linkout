import { useEffect, useState } from 'react';
import CommunityProps from '../../../interface/community';
import axios from 'axios-config';

const useMyCommunities = () => {
  const [myCommunities, setMyCommunities] = useState<Array<CommunityProps>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCommunities() {
      try {
        const communities = (
          await axios.get('https://linkout.onrender.com/users/user/community')
        ).data.communities;
        setMyCommunities(communities);
        setIsLoading(false);
      } catch {
        console.error('There was an error getting communities');
      }
    }
    getCommunities();
  }, []);

  return { myCommunities, isLoading };
};

export default useMyCommunities;
