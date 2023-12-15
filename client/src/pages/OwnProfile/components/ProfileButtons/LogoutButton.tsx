import axios from 'axios-config';

const LogoutButton = () => {
  async function logout() {
    await axios.post('https://linkout.onrender.com/logout', {
      withCredentials: true,
    });
    window.location.href = '/';
  }

  return (
    <button
      onClick={async () => {
        await logout();
      }}
      className="text-outline mt-1 block rounded-lg border-2 border-white bg-red-500 px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
