import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import { FC } from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="grid-cols-default_site xl:grid-cols-xl_site grid-rows-mobile_site grid overflow-hidden lg:grid-cols-lg_site 2xl:grid-cols-two_xl_site">
      <LeftSidebar />
      {children}
      <RightSidebar />
    </div>
  );
};

export default PageTemplate;
