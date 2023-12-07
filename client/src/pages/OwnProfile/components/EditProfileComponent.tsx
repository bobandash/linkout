import useProfile from '../__hooks__/useProfile';
import FormInput from '../../../components/Form/FormInput';
import FormTextArea from '../../../components/Form/FormTextArea';
import FormIconInput from '../../../components/Form/FormIconInput';
import LoadingScreen from '../../Loading/index';

// TO-DO: set up web sockets for profile picture, username, or status being changed
const EditProfileComponent = () => {
  const {
    profile,
    handleInputChange,
    handleTextAreaChange,
    handleSocialMediaInputChange,
    handleProfilePicChange,
    handleSubmit,
    success,
    isLoading,
    errors,
  } = useProfile();
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
      {success && (
        <p className="text-success md:text-2xl">
          Your profile has successfully been updated.
        </p>
      )}
      <form
        className="flex w-full flex-col gap-3"
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <div className="mx-auto flex flex-col items-center">
          <FormIconInput
            name={'Uploaded Profile Pic'}
            handleInputChange={handleProfilePicChange}
            defaultValue={profilePic}
          />
          <p className="text-white">Profile Picture</p>
        </div>
        <div>
          <FormInput
            name={'Username'}
            autoFocus={true}
            value={username}
            handleInputChange={handleInputChange}
            required={true}
          />
          {errors !== null && errors.username && (
            <p className="text-error">{errors.username.msg}</p>
          )}
        </div>

        <FormInput
          name={'Status'}
          value={status}
          handleInputChange={handleInputChange}
        />
        <FormInput
          name={'About Me'}
          value={aboutMe}
          handleInputChange={handleInputChange}
        />
        <FormInput
          name={'Link'}
          value={link}
          handleInputChange={handleInputChange}
        />
        <FormTextArea
          name={'Interests'}
          value={interests}
          handleChange={handleTextAreaChange}
        />
        <div className="relative w-full border-4 border-black">
          <h1
            className="text-outline absolute left-0 top-0 -translate-x-1 -translate-y-1/2
          bg-color_3 pb-1 pr-2 font-play text-xl uppercase text-white"
          >
            Social Media Icons
          </h1>
          <div className="p-5">
            <div>
              <FormInput
                name={'Instagram'}
                value={socialMediaUrls.instagram}
                handleInputChange={handleSocialMediaInputChange}
                placeholder={'instagram.com/yourusername/'}
              />
              {errors !== null && errors['socialMediaUrls.instagram'] && (
                <p className="text-error">
                  {errors['socialMediaUrls.instagram'].msg}
                </p>
              )}
            </div>
            <div>
              <FormInput
                name={'Facebook'}
                value={socialMediaUrls.facebook}
                handleInputChange={handleSocialMediaInputChange}
                placeholder={'facebook.com/yourusername/'}
              />
              {errors !== null && errors['socialMediaUrls.facebook'] && (
                <p className="text-error">
                  {errors['socialMediaUrls.facebook'].msg}
                </p>
              )}
            </div>
            <div>
              <FormInput
                name={'Twitter'}
                value={socialMediaUrls.twitter}
                handleInputChange={handleSocialMediaInputChange}
                placeholder={'twitter.com/yourusername/'}
              />
              {errors !== null && errors['socialMediaUrls.twitter'] && (
                <p className="text-error">
                  {errors['socialMediaUrls.twitter'].msg}
                </p>
              )}
            </div>
            <div>
              <FormInput
                name={'Tiktok'}
                value={socialMediaUrls.tiktok}
                handleInputChange={handleSocialMediaInputChange}
                placeholder={'tiktok.com/yourusername'}
              />
              {errors !== null && errors['socialMediaUrls.tiktok'] && (
                <p className="text-error">
                  {errors['socialMediaUrls.tiktok'].msg}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl border-2 border-black bg-primary px-4 py-2 font-play text-xl font-bold uppercase text-white md:ml-auto md:w-fit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileComponent;
