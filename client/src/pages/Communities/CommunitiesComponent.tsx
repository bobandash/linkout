import PageMainContentContainer from '../../components/PageMainContentContainer';

import LoadingScreen from '../Loading/index';

import SearchForm from './components/SearchForm';
import CommunitiesList from './components/CommunitiesList';
import useCommunities from '../__hooks__/useCommunities';

const CommunitiesComponent = () => {
  const { isLoading, communities, biggestCommunities } = useCommunities();

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <PageMainContentContainer>
      <div className="flex-grow bg-color_3">
        <div>
          <SearchForm />
          <CommunitiesList
            name={'Biggest Communities'}
            communities={biggestCommunities}
          />
          <CommunitiesList name={'Communities'} communities={communities} />
        </div>
      </div>
    </PageMainContentContainer>
  );
};

export default CommunitiesComponent;
