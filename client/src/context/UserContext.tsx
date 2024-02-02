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
interface SignedInContextProviderProps {
  children: React.ReactNode;
}

interface CommunitiesProp {
  name: string;
  profilePic: string;
  _id: string;
  description: string;
}

interface UserContextProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  username: string;
  isLoading: boolean;
  communities: CommunitiesProp[] | null;
}

export const UserContext = createContext<UserContextProps>({
  setIsSignedIn: () => {},
  isSignedIn: false,
  username: '',
  isLoading: true,
  communities: null,
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

  socket.on('addServerIconSidebar', (community: CommunitiesProp) => {
    if (communities !== null) {
      setCommunities([...communities, community]);
    }
  });

  useEffect(() => {
    async function main() {
      await Promise.all([getUser(), getUsername(), getUserCommunities()]);
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
    main();
  }, [isSignedIn]);

  return (
    <UserContext.Provider
      value={{ setIsSignedIn, isSignedIn, username, isLoading, communities }}
    >
      {children}
    </UserContext.Provider>
  );
};
