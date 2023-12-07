import FormImage from './FormImage';
import FormText from './FormText';

const FormContainer = () => {
  return (
    <div className="mt-auto flex flex-row bg-color_1 p-5 pb-3 xl:pb-5 2xl:p-7">
      <FormImage />
      <FormText />
    </div>
  );
};

export default FormContainer;
