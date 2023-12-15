import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Messages from './Messages';

const MessagesPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col md:h-screen">
      <Header name={'Messages'} />
      <Messages />
      <Footer />
    </div>
  );
};

export default MessagesPage;
