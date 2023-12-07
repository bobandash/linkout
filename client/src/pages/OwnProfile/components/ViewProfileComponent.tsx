import useProfile from '../__hooks__/useProfile';
import LoadingScreen from '../../Loading/index';
import ProfilePic from '../../../components/ProfilePic';
import DetailContainer from './DetailContainer';
import SocialMediaIcon from './SocialMediaIcon';

const ViewProfileComponent = () => {
  const { profile, isLoading } = useProfile();
  const {
    username,
    status,
    aboutMe,
    link,
    interests,
    socialMediaUrls,
    profilePic,
  } = profile;

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex flex-col items-center">
        <ProfilePic
          name={'Your profile pic'}
          image={profilePic}
          size={'large'}
        />
        <p className="text-center text-2xl font-bold text-white">{username}</p>
        <div className="flex justify-around gap-5 text-xl text-white">
          {socialMediaUrls.instagram && (
            <SocialMediaIcon
              socialMedia={'instagram'}
              socialMediaLink={socialMediaUrls.instagram}
            />
          )}
          {socialMediaUrls.twitter && (
            <SocialMediaIcon
              socialMedia={'facebook'}
              socialMediaLink={socialMediaUrls.facebook}
            />
          )}
          {socialMediaUrls.twitter && (
            <SocialMediaIcon
              socialMedia={'twitter'}
              socialMediaLink={socialMediaUrls.twitter}
            />
          )}
          {socialMediaUrls.tiktok && (
            <SocialMediaIcon
              socialMedia={'tiktok'}
              socialMediaLink={socialMediaUrls.tiktok}
            />
          )}
        </div>
      </div>

      {status && <DetailContainer name={'Status'} value={status} />}
      {link && <DetailContainer name={'Link'} value={link} />}
      {aboutMe && <DetailContainer name={'About Me'} value={aboutMe} />}
      {interests && <DetailContainer name={'Interests'} value={interests} />}
    </div>
  );
};

export default ViewProfileComponent;
