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
}

export const SignedInContext = createContext<SignedInContextProps>({
  setIsSignedIn: () => {},
  isSignedIn: false,
});

export const SignedInContextProvider: FC<SignedInContextProviderProps> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    async function getSignedInStatus() {
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
    getSignedInStatus();
  }, []);

  return (
    <SignedInContext.Provider value={{ setIsSignedIn, isSignedIn }}>
      {children}
    </SignedInContext.Provider>
  );
};
