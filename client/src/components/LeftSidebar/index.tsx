import Messages from './components/Messages.tsx';
import Servers from './components/Servers.tsx';
import Username from './components/Username.tsx';

const LeftSidebar = () => {
  return (
    <aside className="hidden min-h-screen max-w-full flex-row overflow-hidden lg:flex">
      <Servers />
      <div className="flex max-h-screen flex-grow flex-col bg-color_2">
        <Username />
        <Messages />
      </div>
    </aside>
  );
};

export default LeftSidebar;
