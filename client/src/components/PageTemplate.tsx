import OnlineSidebar from './OnlineSidebar';
import Sidebar from './Sidebar';
import { FC } from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="grid-cols-default_site lg:grid-cols-lg_site xl:grid-cols-xl_site 2xl:grid-cols-two_xl_site grid-rows-mobile_site grid">
      <Sidebar />
      {children}
      <OnlineSidebar />
    </div>
  );
};

export default PageTemplate;
