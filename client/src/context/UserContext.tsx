import {
  useEffect,
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { FC } from 'react';
import axios from 'axios';

interface SignedInContextProviderProps {
  children: React.ReactNode;
}

interface SignedInContextProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  username: string;
  isLoading: boolean;
}

export const UserContext = createContext<SignedInContextProps>({
  setIsSignedIn: () => {},
  isSignedIn: false,
  username: '',
  isLoading: true,
});

export const UserContextProvider: FC<SignedInContextProviderProps> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function main() {
      await getUser();
      await getUsername();
      setIsLoading(false);
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
  }, []);

  return (
    <UserContext.Provider
      value={{ setIsSignedIn, isSignedIn, username, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
