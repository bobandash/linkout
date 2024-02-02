import { createContext, SetStateAction, Dispatch, useState } from 'react';
import { FC } from 'react';
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

export const MockUserContext = createContext<UserContextProps>({
  setIsSignedIn: () => {},
  isSignedIn: false,
  username: '',
  isLoading: false,
  communities: null,
});

export const UserContextProvider: FC<SignedInContextProviderProps> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username] = useState('');
  const [isLoading] = useState(false);
  const [communities] = useState<CommunitiesProp[] | null>(null);

  return (
    <MockUserContext.Provider
      value={{ setIsSignedIn, isSignedIn, username, isLoading, communities }}
    >
      {children}
    </MockUserContext.Provider>
  );
};
