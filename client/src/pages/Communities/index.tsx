import Header from '../../components/Header';
import CommunitiesComponent from './CommunitiesComponent';

const index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header name={'Communities'} />
      <CommunitiesComponent />
    </div>
  );
};

export default index;
