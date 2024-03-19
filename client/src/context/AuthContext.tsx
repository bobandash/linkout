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

interface AuthContextProps {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  isSignedIn: false,
  setIsSignedIn: () => {},
  isAuthLoading: true,
});

// Contains all relevant information for the dashboard
export const AuthContextProvider: FC<SignedInContextProviderProps> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
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
      } finally {
        setIsAuthLoading(false);
      }
    }
    getSignedInStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setIsSignedIn,
        isSignedIn,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
