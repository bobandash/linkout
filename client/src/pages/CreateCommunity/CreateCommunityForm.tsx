import FormInput from '../../components/Form/FormInput';
import FormTextArea from '../../components/Form/FormTextArea';
import FormIconInput from '../../components/Form/FormIconInput';
import PageMainContentContainer from '../../components/PageMainContentContainer';
import useCommunity from './__hooks__/useCommunity';
import FormError from '../../components/Form/FormError';

const CreateCommunityForm = () => {
  const {
    community,
    handleInputChange,
    handleTextAreaChange,
    handleSubmit,
    handleProfileInputChange,
    defaultValue,
    errors,
  } = useCommunity();

  return (
    <PageMainContentContainer>
      <div className="flex-grow bg-color_3">
        <form
          encType="multipart/form-data"
          noValidate
          autoComplete="off"
          onSubmit={async (e) => {
            handleSubmit(e);
          }}
        >
          <FormIconInput
            name="profilePic"
            centered={true}
            handleInputChange={handleProfileInputChange}
            defaultValue={defaultValue}
          />
          <FormInput
            name={'Name'}
            autoFocus={true}
            handleInputChange={handleInputChange}
            value={community.name}
            required={true}
          />
          {errors.name && <FormError message={errors.name.msg} />}
          <FormTextArea
            name={'Description'}
            handleChange={handleTextAreaChange}
            value={community.description}
            rows={4}
            required={true}
          />
          {errors.description && <FormError message={errors.description.msg} />}
          <button
            type="submit"
            className="ml-auto mt-5 block bg-primary px-5 py-3 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </PageMainContentContainer>
  );
};

export default CreateCommunityForm;
