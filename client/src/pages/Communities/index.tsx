import Header from '../../components/Header';
import CommunitiesComponent from './CommunitiesComponent';
import CommunitiesCreateBtn from '../../components/HeaderMobileRedirectBtns/CommunitiesCreateBtn';
import Footer from '../../components/Footer';

const index = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header name={'Communities'} children={<CommunitiesCreateBtn />} />
      <CommunitiesComponent />
      <Footer />
    </div>
  );
};

export default index;
