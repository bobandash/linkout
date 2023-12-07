import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PageMainContentContainer from '../../components/PageMainContentContainer';
import EditProfileComponent from './components/EditProfileComponent';
import PreviewButton from './components/ProfileButtons/PreviewButton';
import LogoutButton from './components/ProfileButtons/LogoutButton';

const Profile = () => {
  return (
    <div className="flex min-h-screen flex-col md:h-screen">
      <Header
        name={'Your Profile'}
        children={
          <div className="ml-auto mt-2 flex flex-row justify-center gap-2 md:gap-5">
            <PreviewButton />
            <LogoutButton />
          </div>
        }
      />
      <PageMainContentContainer>
        <EditProfileComponent />
      </PageMainContentContainer>
      <Footer />
    </div>
  );
};
export default Profile;
