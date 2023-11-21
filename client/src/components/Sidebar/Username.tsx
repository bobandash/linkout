import { useNavigate } from 'react-router';

const UsernameComponent = () => {
  const navigate = useNavigate();
  function handleEditProfile() {
    navigate('/profile');
  }

  /*         mobile_site: ['main-header', 'main', 'footer'],
        md_site: ['sidebar-header main-header', 'sidebar main'], */

  return (
    <div className="grid-in-sidebar-header flex w-full flex-row gap-x-4 border-b-4 border-r-4 border-black bg-secondary p-5">
      <div className="flex items-center justify-center">
        <div className="aspect-square min-w-[60px] rounded-full bg-white 2xl:min-w-[80px]"></div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-outline font-fingerPaint uppercase text-white md:text-2xl xl:text-4xl">
          Username
        </h1>
        <button
          onClick={handleEditProfile}
          className="w-max font-play font-bold text-white md:text-xl xl:text-3xl"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UsernameComponent;
