import Header from '../../components/Header';
import CommunitiesComponent from './CommunitiesComponent';
import CommunitiesCreateBtn from '../../components/HeaderMobileRedirectBtns/CommunitiesCreateBtn';
import Footer from '../../components/Footer';

const index = () => {
  return (
    <div className="flex min-h-screen flex-col md:h-screen">
      <Header name={'Communities'} children={<CommunitiesCreateBtn />} />
      <CommunitiesComponent />
      <Footer />
    </div>
  );
};

export default index;
