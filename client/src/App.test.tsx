import { render, screen } from '@testing-library/react';
import App from './App';
import { UserContextProvider } from './context/UserContext';
import { MemoryRouter } from 'react-router';
import * as useUserContextModule from './context/useUserContext';

vi.mock('./context/useUserContext', () => ({
  useUserContext: vi.fn(),
}));

describe('App', () => {
  describe('Not Signed In', () => {
    beforeEach(async () => {
      const mockedUseUserContext = vi.spyOn(
        useUserContextModule,
        'useUserContext',
      );
      mockedUseUserContext.mockReturnValue({
        isSignedIn: false,
        setIsSignedIn: vi.fn(),
        username: '',
        communities: [],
        isLoading: false,
      });

      render(
        <MemoryRouter>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </MemoryRouter>,
      );
    });

    it('renders SignInForm if not signed in', () => {
      expect(
        screen.getByRole('button', { name: 'Sign In' }),
      ).toBeInTheDocument();
    });

    afterEach(() => {
      vi.clearAllMocks();
      vi.resetAllMocks();
    });
  });

  describe('Loading Screen', () => {
    beforeEach(async () => {
      const mockedUseUserContext = vi.spyOn(
        useUserContextModule,
        'useUserContext',
      );
      mockedUseUserContext.mockReturnValue({
        isSignedIn: false,
        setIsSignedIn: vi.fn(),
        username: '',
        communities: [],
        isLoading: true,
      });
    });

    it('renders Loading screen if loading state is true', () => {
      const { container } = render(
        <MemoryRouter>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </MemoryRouter>,
      );
      expect(container).toMatchSnapshot();
    });

    afterEach(() => {
      vi.clearAllMocks();
      vi.resetAllMocks();
    });
  });

  describe('Application Screen', () => {
    beforeEach(async () => {
      const mockedUseUserContext = vi.spyOn(
        useUserContextModule,
        'useUserContext',
      );
      mockedUseUserContext.mockReturnValue({
        isSignedIn: true,
        setIsSignedIn: vi.fn(),
        username: '',
        communities: [],
        isLoading: false,
      });
    });

    it('renders application is user is signed in', () => {
      const { container } = render(
        <MemoryRouter>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </MemoryRouter>,
      );
      expect(container).toMatchSnapshot();
    });

    afterEach(() => {
      vi.clearAllMocks();
      vi.resetAllMocks();
    });
  });
});
