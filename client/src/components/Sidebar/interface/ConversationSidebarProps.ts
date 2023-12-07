interface ConversationSidebarProps {
  user: {
    _id: string;
    username: string;
    status: string;
    profilePic: string;
  };
  _id: string;
  isRequest: boolean;
}

export default ConversationSidebarProps;
