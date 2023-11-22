import Sidebar from './Sidebar';
import { FC } from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="grid-cols-default_site md:grid-cols-md_site xl:grid-cols-xl_site grid-rows-mobile_site md:grid-rows-md_site grid">
      <Sidebar />
      {children}
    </div>
  );
};

export default PageTemplate;
