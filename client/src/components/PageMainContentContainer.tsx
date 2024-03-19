import { FC } from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageMainContentContainer: FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="flex flex-grow flex-col overflow-y-scroll bg-color_3 p-5 md:p-7 lg:p-10 lg:pt-0 2xl:p-16 2xl:pt-0">
      {children}
    </div>
  );
};

export default PageMainContentContainer;
