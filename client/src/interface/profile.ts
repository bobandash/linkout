export interface profileProps {
  username: string;
  status: string;
  profilePic: string;
  aboutMe: string;
  link: string;
  interests: string;
  socialMediaUrls: {
    instagram: string;
    facebook: string;
    twitter: string;
    tiktok: string;
  };
  // To pass form data as key value pairs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const mockProfile = {
  username: '',
  status: '',
  profilePic: '',
  aboutMe: '',
  link: '',
  interests: '',
  skills: {},
  socialMediaUrls: {
    instagram: '',
    facebook: '',
    twitter: '',
    tiktok: '',
  },
};

export default profileProps;
