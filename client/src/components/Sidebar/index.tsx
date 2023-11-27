import FriendsComponent from './Friends';
import ServersComponent from './ServersComponent';
import UsernameComponent from './Username';

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen max-w-full flex-row overflow-hidden lg:flex">
      <ServersComponent />
      <div className="flex flex-grow flex-col bg-color_2">
        <UsernameComponent />
        <FriendsComponent />
      </div>
    </aside>
  );
};

export default Sidebar;
