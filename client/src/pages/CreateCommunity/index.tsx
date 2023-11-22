import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CreateCommunityForm from './CreateCommunityForm';

const CreateCommunity = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header name={'Community Creation'} />
      <CreateCommunityForm />
      <Footer />
    </div>
  );
};

export default CreateCommunity;
