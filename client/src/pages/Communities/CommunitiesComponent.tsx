import PageMainContentContainer from '../../components/PageMainContentContainer';

import LoadingScreen from '../Loading/index';

import SearchForm from './components/SearchForm';
import CommunitiesList from './components/CommunitiesList';
import useCommunities from './__hooks__/useCommunities';
import useSearchForm from './__hooks__/useSearchForm';
import { useEffect, useState, useCallback } from 'react';
import CommunityProps from '../../interface/community';

const CommunitiesComponent = () => {
  const { isLoading, communities, biggestCommunities } = useCommunities();
  const { query, handleChange } = useSearchForm();
  const [communitiesFiltered, setCommunitiesFiltered] = useState<
    Array<CommunityProps>
  >([]);

  const updateFilteredCommunities = useCallback(() => {
    const filteredCommunities = communities.filter((community) => {
      const lowerCommunityName = community.name.toLowerCase();
      const lowerQuery = query.toLowerCase();
      return lowerCommunityName.includes(lowerQuery);
    });
    setCommunitiesFiltered(filteredCommunities);
  }, [query, communities]);

  useEffect(() => {
    updateFilteredCommunities();
  }, [updateFilteredCommunities]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (biggestCommunities.length === 0 && communities.length === 0) {
    return (
      <PageMainContentContainer>
        <div className="flex-grow bg-color_3">
          <h1 className="text-outline mt-5 font-play text-2xl text-white md:text-3xl xl:text-4xl">
            Create the first community today.
          </h1>
        </div>
      </PageMainContentContainer>
    );
  }

  return (
    <PageMainContentContainer>
      <div className="flex-grow bg-color_3">
        <div>
          <SearchForm handleChange={handleChange} />
          {query === '' && (
            <CommunitiesList
              name={'Biggest Communities'}
              communities={biggestCommunities}
            />
          )}

          {communitiesFiltered.length === 0 ? (
            <h1 className="text-outline mt-5 font-play text-2xl text-white md:text-3xl xl:text-4xl">
              No Communities Found
            </h1>
          ) : (
            <CommunitiesList
              name={'Communities'}
              communities={communitiesFiltered}
            />
          )}
        </div>
      </div>
    </PageMainContentContainer>
  );
};

export default CommunitiesComponent;
