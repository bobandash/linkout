interface DirectMessageProps {
  _id: string;
  content: string;
  image: string;
  dateFormatted: string;
  longDateFormatted: string;
  createdAt: string;
  sender: {
    profile: {
      profilePic: string;
      status: string;
      username: string;
      _id: string;
    };
  };
}

export default DirectMessageProps;
