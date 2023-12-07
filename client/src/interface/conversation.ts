interface ConversationProps {
  _id: string;
  users: Array<{
    profile: {
      _id: string;
      profilePic: string;
      status: string;
      username: string;
    };
  }>;
  // creator is an object id ref
  creator: string;
  isRequest: boolean;
}

export default ConversationProps;
