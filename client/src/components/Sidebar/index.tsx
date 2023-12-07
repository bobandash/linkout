import MessagesNavSidebar from './Messages';
import ServersComponent from './ServersComponent';
import UsernameComponent from './Username';

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen max-w-full flex-row overflow-hidden lg:flex">
      <ServersComponent />
      <div className="flex max-h-screen flex-grow flex-col bg-color_2">
        <UsernameComponent />
        <MessagesNavSidebar />
      </div>
    </aside>
  );
};

export default Sidebar;
