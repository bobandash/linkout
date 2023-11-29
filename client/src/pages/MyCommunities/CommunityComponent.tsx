import PageMainContentContainer from '../../components/PageMainContentContainer';
import useMyCommunities from './__hooks__/useMyCommunities';
import LoadingScreen from '../Loading/index';
import CommunitiesList from './components/CommunitiesList';

const CommunityComponent = () => {
  const { myCommunities, isLoading } = useMyCommunities();

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <PageMainContentContainer>
      <CommunitiesList communities={myCommunities} />
    </PageMainContentContainer>
  );
};

export default CommunityComponent;
