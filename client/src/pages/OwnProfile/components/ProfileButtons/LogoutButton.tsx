import axios from 'axios';

const LogoutButton = () => {
  async function logout() {
    try {
      await axios.post(
        'https://linkout-1.onrender.com/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );
      window.location.href = '/';
    } catch {
      console.error('Could not log out');
    }
  }

  return (
    <button
      onClick={logout}
      className="text-outline mt-1 block rounded-lg border-2 border-white bg-red-500 px-3 py-2 font-play text-xl uppercase text-white lg:ml-auto lg:mr-0"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
