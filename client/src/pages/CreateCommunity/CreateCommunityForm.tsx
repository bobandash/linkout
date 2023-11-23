import { useState } from 'react';
import FormInput from '../../components/Form/FormInput';
import FormTextArea from '../../components/Form/FormTextArea';
import FormIconInput from '../../components/Form/FormIconInput';

const CreateCommunityForm = () => {
  const [community, setCommunity] = useState({});
  return (
    <div className="bg-color_3 flex-grow">
      <form encType="multipart/form-data" className="p-5" noValidate>
        <FormIconInput />
        <FormInput name={'Community Name'} autoFocus={true} />
        <FormTextArea name={'Description'} />
      </form>
    </div>
  );
};

export default CreateCommunityForm;
