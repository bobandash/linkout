import Footer from '../../components/Footer';
import Header from '../../components/Header';
import EditProfileComponent from './EditProfileComponent';

const Profile = () => {
  return (
    <div className="min-h-screen">
      <Header name={'Your Profile'} />
      <div className="bg-color_3 flex flex-grow flex-col">
        {/*         <ProfileButtons /> */}
        <EditProfileComponent />
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
