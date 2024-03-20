import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { UserContextProvider, UserContext } from '../UserContext';
import { useContext } from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';

const mAxios = new MockAdapter(axios);

const MockChild = () => {
  const { username, isLoading, communities } = useContext(UserContext);
  return (
    <div>
      <p>{username}</p>
      <p>Is Loading: {isLoading ? 'true' : 'false'}</p>
      {communities?.map((community) => {
        return (
          <div key={community._id}>
            {community.name} {community.description} {community.profilePic}
          </div>
        );
      })}
    </div>
  );
};

describe('UserContextProvider', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render children and fetch data properly', async () => {
    mAxios
      .onGet('/api/auth/sign-in-status')
      .reply(200)
      .onGet('/api/user/username')
      .reply(200, { username: 'testUser' })
      .onGet('/api/user/community')
      .reply(200, {
        communities: [
          {
            name: 'Studying',
            profilePic: 'images/pfp.jpg',
            _id: 1,
            description: 'Place where you can study',
          },
        ],
      });

    // Render the component with a test child
    render(
      <UserContextProvider>
        <MockChild />
      </UserContextProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Signed In: true')).toBeInTheDocument();
      expect(screen.getByText('Is Loading: false')).toBeInTheDocument();
      expect(screen.getByText('testUser')).toBeInTheDocument();
      expect(
        screen.getByText('Studying Place where you can study images/pfp.jpg'),
      ).toBeInTheDocument();
    });
  });

  it('should have default values if fetches fail', async () => {
    mAxios
      .onGet('/api/auth/sign-in-status')
      .reply(400)
      .onGet('/api/user/username')
      .reply(400)
      .onGet('/api/user/community')
      .reply(400);

    // Render the component with a test child
    render(
      <UserContextProvider>
        <MockChild />
      </UserContextProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Signed In: false')).toBeInTheDocument();
      expect(screen.getByText('Is Loading: false')).toBeInTheDocument();
    });
  });
});
