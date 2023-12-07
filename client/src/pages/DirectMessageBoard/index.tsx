import Header from '../../components/Header';
import LoadingScreen from '../Loading/index';
import Footer from '../../components/Footer';
import useMessagePage from './__hooks__/useMessagePage';
import MessagesContainer from './components/MessagesContainer';
import FormContainer from './components/FormContainer';
import ErrorPage from '../Error';

const MessagePage = () => {
  const { conversationDetails, messages, isLoading, hasError } =
    useMessagePage();

  if (hasError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen flex-col bg-color_3">
      <Header
        name={conversationDetails.name}
        image={conversationDetails.profilePic}
      />
      <MessagesContainer messages={messages} />
      <FormContainer />
      <Footer />
    </div>
  );
};

export default MessagePage;
