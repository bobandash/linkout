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
      {image == 'images/defaultPfp.jpg' ? (
        <img
          src={`https://linkout.onrender.com/${image}`}
          alt={`${name} picture`}
          className="h-full w-full"
        />
      ) : (
        <img src={image} alt={`${name} picture`} className="h-full w-full" />
      )}
    </div>
  );
};

export default ProfilePic;
