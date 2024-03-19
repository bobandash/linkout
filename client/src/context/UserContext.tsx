import {
  useEffect,
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { FC } from 'react';
import axios from 'axios';
import socket from '../socket';
import ConversationProps from '../interface/conversation';
interface SignedInContextProviderProps {
  children: React.ReactNode;
}

interface CommunitiesProp {
  name: string;
  profilePic: string;
  _id: string;
  description: string;
}

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

interface UserContextProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  username: string;
  isLoading: boolean;
  communities: CommunitiesProp[] | null;
  conversations: ConversationSidebarProps[] | null;
}

export const UserContext = createContext<UserContextProps>({
  setIsSignedIn: () => {},
  isSignedIn: false,
  username: '',
  isLoading: true,
  communities: null,
  conversations: null,
});

export const UserContextProvider: FC<SignedInContextProviderProps> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [communities, setCommunities] = useState<null | CommunitiesProp[]>(
    null,
  );
  const [conversations, setConversations] = useState<
    null | ConversationSidebarProps[]
  >(null);

  socket.on('add_server_icon_sidebar', (community: CommunitiesProp) => {
    if (communities !== null) {
      setCommunities([...communities, community]);
    }
  });

  useEffect(() => {
    async function main() {
      await Promise.all([
        getUser(),
        getUsername(),
        getUserCommunities(),
        getConversations(),
      ]);
      setIsLoading(false);
    }

    async function getUserCommunities() {
      try {
        const response = await axios.get('/api/users/user/community', {
          withCredentials: true,
        });
        const json = response.data;
        setCommunities(json.communities);
      } catch (err) {
        setCommunities(null);
      }
    }

    async function getUsername() {
      try {
        const response = await axios.get('/api/users/user/username', {
          withCredentials: true,
        });
        const json = response.data;
        setUsername(json.username);
      } catch {
        setUsername('');
      }
    }

    async function getUser() {
      try {
        const response = await axios.get('/api/users/user/sign-in-status', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsSignedIn(true);
        }
      } catch {
        setIsSignedIn(false);
      }
    }

    async function getConversations() {
      try {
        const usernameResponse = await axios.get('/api/users/user/username', {
          withCredentials: true,
        });
        const response = await axios.get('/api/conversations');
        const conversationData: ConversationProps[] = response.data;
        // filter the raw conversation data to the necessary params to display
        const username = usernameResponse.data.username;
        const userData = conversationData.map((conversation) => {
          const otherUser = conversation.users.filter(
            (user) => user.profile.username !== username,
          )[0].profile;
          const { _id, isRequest } = conversation;
          return {
            user: otherUser,
            _id,
            isRequest,
          };
        });
        setConversations(userData);
      } catch (error) {
        console.error('There was an error fetching the conversations:', error);
      }
    }

    main();
  }, [isSignedIn]);

  return (
    <UserContext.Provider
      value={{
        setIsSignedIn,
        isSignedIn,
        username,
        isLoading,
        communities,
        conversations,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
