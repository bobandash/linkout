import useProfile from './__hooks__/useProfile';
import FormInput from '../../components/Form/FormInput';
import FormTextArea from '../../components/Form/FormTextArea';
import FormIconInput from '../../components/Form/FormIconInput';

const EditProfileComponent = () => {
  const {
    profile,
    handleInputChange,
    handleTextAreaChange,
    handleSocialMediaInputChange,
    handleProfilePicChange,
    handleSubmit,
    success,
  } = useProfile();
  const { username, status, aboutMe, link, interests, socialMediaUrls } =
    profile;

  return (
    <div className="flex flex-col items-center p-5">
      <form
        className="flex w-full flex-col items-center gap-3"
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        {/* TO-DO: add preexisting profile pic */}
        <FormIconInput
          name={'Profile Pic'}
          handleInputChange={handleProfilePicChange}
        />
        <p>Choose Profile pic</p>
        <FormInput
          name={'Username'}
          autoFocus={true}
          value={username}
          handleInputChange={handleInputChange}
          required={true}
        />
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
            <FormInput
              name={'Instagram'}
              value={socialMediaUrls.instagram}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'instagram.com/yourusername/'}
            />
            <FormInput
              name={'Facebook'}
              value={socialMediaUrls.facebook}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'facebook.com/yourusername/'}
            />
            <FormInput
              name={'Twitter'}
              value={socialMediaUrls.twitter}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'twitter.com/yourusername/'}
            />
            <FormInput
              name={'Tiktok'}
              value={socialMediaUrls.tiktok}
              handleInputChange={handleSocialMediaInputChange}
              placeholder={'twitter.com/tiktok/'}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl border-2 border-black bg-primary px-4 py-2 font-play text-xl font-bold uppercase text-white md:ml-auto md:w-fit"
        >
          Save
        </button>
        {success && <p>Profile has successfully been updated.</p>}
      </form>
    </div>
  );
};

export default EditProfileComponent;
