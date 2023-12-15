import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CommunitiesComponent from './CommunityComponent';

const MyCommunitiesPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col md:h-screen">
      <Header name={'My Communities'} />
      <CommunitiesComponent />
      <Footer />
    </div>
  );
};

export default MyCommunitiesPage;
