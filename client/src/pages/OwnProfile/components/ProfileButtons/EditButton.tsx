import { useNavigate } from 'react-router';

const EditButton = () => {
  const navigate = useNavigate();
  function navigateEdit() {
    navigate('/dashboard/profile/edit');
  }

  return (
    <button
      onClick={navigateEdit}
      className="'text-outline mx-auto mt-1 block rounded-lg border-2 border-white bg-black px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0"
    >
      Edit
    </button>
  );
};

export default EditButton;
