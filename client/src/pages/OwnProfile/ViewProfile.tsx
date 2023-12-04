import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ViewProfileComponent from './components/ViewProfileComponent';
import EditButton from './components/ProfileButtons/EditButton';
import MessageButton from './components/ProfileButtons/MessageButton';
import PageMainContentContainer from '../../components/PageMainContentContainer';
import { useParams } from 'react-router';

const Profile = () => {
  const { profileId } = useParams();
  // Case when viewing other user's profile
  if (profileId) {
    return (
      <div className="flex min-h-screen flex-col md:h-screen">
        <Header name={'Profile'} children={<MessageButton />} />
        <PageMainContentContainer>
          <ViewProfileComponent />
        </PageMainContentContainer>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:h-screen">
      <Header name={'Profile Preview'} children={<EditButton />} />
      <PageMainContentContainer>
        <ViewProfileComponent />
      </PageMainContentContainer>
      <Footer />
    </div>
  );
};
export default Profile;
