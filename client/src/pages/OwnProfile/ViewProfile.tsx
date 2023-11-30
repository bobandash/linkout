import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ViewProfileComponent from './components/ViewProfileComponent';
import EditButton from './components/ProfileButtons/EditButton';
import PageMainContentContainer from '../../components/PageMainContentContainer';

const Profile = () => {
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
