interface MessageProps {
  _id: string;
  content: string;
  sender: {
    profile: {
      profilePic: string;
      username: string;
    };
  };
  dateFormatted: string;
  longDateFormatted: string;
  createdAt: string;
}
export default MessageProps;
