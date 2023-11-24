import { FC } from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageMainContentContainer: FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="bg-color_3 flex flex-grow flex-col p-5 md:p-7 lg:p-10 lg:pt-0 2xl:p-16 2xl:pt-0">
      {children}
    </div>
  );
};

export default PageMainContentContainer;
