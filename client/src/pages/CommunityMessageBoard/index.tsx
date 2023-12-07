import Header from '../../components/Header';
import LoadingScreen from '../Loading/index';
/* import LinkOutBtn from './components/LinkOutBtn'; */
import Footer from '../../components/Footer';

import useMessagePage from './__hooks__/useMessagePage';
import MessagesContainer from './components/MessagesContainer';
import FormContainer from './components/FormContainer';
import ErrorPage from '../Error';

const MessagePage = () => {
  const { community, communityMessages, isLoading, errorCode } =
    useMessagePage();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (errorCode !== 0) {
    return <ErrorPage errorCode={errorCode} />;
  }

  if (community !== null) {
    return (
      <div className="flex h-screen flex-col bg-color_3">
        <Header
          name={community.name}
          /*           children={<LinkOutBtn />} */
          image={community.profilePic}
        />
        <MessagesContainer communityMessages={communityMessages} />
        <FormContainer />
        <Footer />
      </div>
    );
  }
};

export default MessagePage;
