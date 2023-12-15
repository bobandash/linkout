import Header from '../../components/Header';
import CommunitiesComponent from './CommunitiesComponent';
import CommunitiesCreateBtn from '../../components/HeaderMobileRedirectBtns/CommunitiesCreateBtn';
import Footer from '../../components/Footer';
import useCommunities from './__hooks__/useCommunities';
import LoadingScreen from '../Loading/index';

const CommunitiesPage = () => {
  const { isLoading, communities, biggestCommunities } = useCommunities();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative flex min-h-screen flex-col md:h-screen">
      <Header name={'Communities'} children={<CommunitiesCreateBtn />} />
      <CommunitiesComponent
        communities={communities}
        biggestCommunities={biggestCommunities}
      />
      <Footer />
    </div>
  );
};

export default CommunitiesPage;
