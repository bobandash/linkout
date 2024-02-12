import PageMainContentContainer from '../../components/PageMainContentContainer';
import SearchForm from './components/SearchForm';
import CommunitiesList from './components/CommunitiesList';
import useSearchForm from './__hooks__/useSearchForm';
import { useEffect, useState, useCallback, FC } from 'react';
import CommunityProps from '../../interface/community';

interface CommunitiesComponentProps {
  communities: Array<CommunityProps>;
  biggestCommunities: Array<CommunityProps>;
}

const CommunitiesComponent: FC<CommunitiesComponentProps> = ({
  communities,
  biggestCommunities,
}) => {
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

  if (communities.length === 0) {
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
          {query === '' ? (
            <CommunitiesList
              name={'Biggest Communities'}
              communities={biggestCommunities}
            />
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
