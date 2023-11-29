export interface profileProps {
  username: string;
  status: string;
  profilePic: null | File | string;
  aboutMe: string;
  link: string;
  interests: string;
  skills: object;
  socialMediaUrls: {
    instagram: string;
    facebook: string;
    twitter: string;
    tiktok: string;
  };
}

export const mockProfile = {
  username: '',
  status: '',
  profilePic: null,
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
