import Header from '../../components/Header';
import EditProfileComponent from './EditProfileComponent';

const Profile = () => {
  return (
    <div className="min-h-screen">
      <Header name={'Your Profile'} />
      <div className="flex min-h-full flex-grow flex-col bg-primary">
        {/*         <ProfileButtons /> */}
        <EditProfileComponent />
      </div>
    </div>
  );
};
export default Profile;
