import Footer from '../../components/Footer';
import Header from '../../components/Header';
import EditProfileComponent from './EditProfileComponent';

const Profile = () => {
  return (
    <div className="h-screen">
      <Header name={'Your Profile'} />
      <div className="flex flex-grow flex-col bg-color_3">
        {/*         <ProfileButtons /> */}
        <EditProfileComponent />
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
