import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PageMainContentContainer from '../../components/PageMainContentContainer';
import EditProfileComponent from './components/EditProfileComponent';
import PreviewButton from './components/ProfileButtons/PreviewButton';

const Profile = () => {
  return (
    <div className="flex min-h-screen flex-col md:h-screen">
      <Header name={'Your Profile'} children={<PreviewButton />} />
      <PageMainContentContainer>
        <EditProfileComponent />
      </PageMainContentContainer>
      <Footer />
    </div>
  );
};
export default Profile;
