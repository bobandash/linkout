import Header from '../../components/Header';
import CommunitiesComponent from './CommunitiesComponent';
import { useNavigate } from 'react-router';
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

const CommunitiesCreateBtn = () => {
  const navigate = useNavigate();
  function navCreateCommunities() {
    navigate('/dashboard/communities/create');
  }

  return (
    <button
      onClick={navCreateCommunities}
      className={
        'text-outline mx-auto mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0'
      }
    >
      Create Your Own
    </button>
  );
};

export default CommunitiesPage;
