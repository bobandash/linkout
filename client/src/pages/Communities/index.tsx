import Header from '../../components/Header';
import CommunitiesComponent from './CommunitiesComponent';
import CommunitiesCreateBtn from '../../components/HeaderMobileRedirectBtns/CommunitiesCreateBtn';

const index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header name={'Communities'} children={<CommunitiesCreateBtn />} />
      <CommunitiesComponent />
    </div>
  );
};

export default index;
