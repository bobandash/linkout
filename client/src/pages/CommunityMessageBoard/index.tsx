import Header from '../../components/Header';
import LoadingScreen from '../Loading/index';
import LinkOutBtn from './components/LinkOutBtn';

import Footer from '../../components/Footer';

import useMessagePage from './__hooks__/useMessagePage';
import useTextbox from './__hooks__/useTextbox';
import MessagesContainer from './components/MessagesContainer';
import FormContainer from './components/FormContainer';

const MessagePage = () => {
  const { community, communityMessages, isLoading } = useMessagePage();
  const { message, handleMessage, handleSubmitMessage } = useTextbox();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (community !== null) {
    return (
      <div className="flex h-screen flex-col bg-color_3">
        <Header
          name={community.name}
          children={<LinkOutBtn />}
          image={community.profilePic}
        />
        <MessagesContainer communityMessages={communityMessages} />
        <FormContainer
          handleMessage={handleMessage}
          handleSubmitMessage={handleSubmitMessage}
          message={message}
        />
        <Footer />
      </div>
    );
  }
};

export default MessagePage;
