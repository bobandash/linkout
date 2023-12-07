import { FC } from 'react';

interface ProfilePicProps {
  image: string;
  name: string;
  size?: 'x-small' | 'small' | 'medium' | 'large';
}

const ProfilePic: FC<ProfilePicProps> = ({ image, name, size }) => {
  let heightMobileClass = '';
  let heightDesktopClass = '';

  switch (size) {
    case 'x-small':
      heightMobileClass = 'h-[40px]';
      heightDesktopClass = '2xl:h-[50px]';
      break;
    case 'small':
      heightMobileClass = 'h-[50px]';
      heightDesktopClass = '2xl:h-[60px]';
      break;
    case undefined:
    case 'medium':
      heightMobileClass = 'h-[60px]';
      heightDesktopClass = '2xl:h-[80px]';
      break;
    case 'large':
      heightMobileClass = 'h-[80px]';
      heightDesktopClass = '2xl:h-[100px]';
      break;
  }

  return (
    <div
      className={`aspect-square ${heightMobileClass} ${heightDesktopClass} overflow-hidden rounded-full bg-white`}
    >
      <img src={`/api/${image}`} alt={`${name} picture`} />
    </div>
  );
};

export default ProfilePic;
