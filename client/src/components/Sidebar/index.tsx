import FriendsComponent from './Friends';
import ServersComponent from './ServersComponent';
import UsernameComponent from './Username';

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen flex-col md:flex">
      <UsernameComponent />
      <div className="flex flex-grow flex-row bg-primary">
        <ServersComponent />
        <FriendsComponent />
      </div>
    </aside>
  );
};

export default Sidebar;
