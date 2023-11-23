import useProfile from './__hooks__/useProfile';
import EditProfileInput from './components/EditProfileInput';
import EditProfileTextArea from './components/EditProfileTextArea';
import ProfilePicForm from './components/ProfilePicForm';
// TO-DO: add skills functionality

const EditProfileComponent = () => {
  const {
    profile,
    handleInputChange,
    handleTextAreaChange,
    handleSocialMediaInputChange,
  } = useProfile();
  const {
    username,
    status,
    profilePic,
    aboutMe,
    link,
    interests,
    socialMediaUrls,
  } = profile;

  return (
    <div className="flex flex-col items-center p-5">
      <ProfilePicForm profilePic={profilePic} />
      <form className="flex w-full flex-col items-center gap-3" noValidate>
        <EditProfileInput
          name={'Username'}
          autoFocus={true}
          value={username}
          handleInputChange={handleInputChange}
        />
        <EditProfileInput
          name={'Status'}
          value={status}
          handleInputChange={handleInputChange}
        />
        <EditProfileInput
          name={'About Me'}
          value={aboutMe}
          handleInputChange={handleInputChange}
        />
        <EditProfileInput
          name={'Link'}
          value={link}
          handleInputChange={handleInputChange}
        />
        <EditProfileTextArea
          name={'Interests'}
          value={interests}
          handleChange={handleTextAreaChange}
        />
        <div className="relative w-full border-4 border-black">
          <h1
            className="text-outline bg-color_3 absolute left-0 top-0 -translate-x-1
          -translate-y-1/2 pb-1 pr-2 font-play text-xl uppercase text-white"
          >
            Social Media Icons
          </h1>
          <div className="p-5">
            <EditProfileInput
              name={'Instagram'}
              value={socialMediaUrls.instagram}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'instagram.com/yourusername/'}
            />
            <EditProfileInput
              name={'Facebook'}
              value={socialMediaUrls.facebook}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'facebook.com/yourusername/'}
            />
            <EditProfileInput
              name={'Twitter'}
              value={socialMediaUrls.twitter}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'twitter.com/yourusername/'}
            />
            <EditProfileInput
              name={'Tiktok'}
              value={socialMediaUrls.tiktok}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'twitter.com/tiktok/'}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl border-2 bg-secondary px-4 py-2 font-play text-xl font-bold uppercase md:ml-auto md:w-fit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileComponent;
