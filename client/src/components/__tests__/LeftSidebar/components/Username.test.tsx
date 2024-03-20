import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router';
import Username from '../../../LeftSidebar/components/Username';
import { act } from 'react-dom/test-utils';
const navigate = vi.fn();
vi.mock('react-router', async () => {
  const mod = (await vi.importActual('react-router')) as object;
  return {
    ...mod,
    useNavigate: () => navigate,
  };
});
const mAxios = new MockAdapter(axios);

const mockProfile = {
  profile: {
    socialMediaUrls: { instagram: '', facebook: '', twitter: '', tiktok: '' },
    _id: '657c24922a6dc1e427081bde',
    username: 'Smiling',
    status: 'Studying',
    profilePic:
      'https://aws-discord-clone.s3.amazonaws.com/uploads/809f500a-5b1e-419e-b29d-4f2833f8f89f-bond%20plush.png',
    aboutMe:
      'Creator of this website. Please contact me at brucescreation@gmail.com if you ever want to work together!',
    link: 'https://www.youtube.com/channel/UCbmACnMqPscBSaPx17_3ueg',
    interests: 'Coding, Valorant (Love and Hate Relationship), Anime',
    skills: '',
    createdAt: '2023-12-15T10:04:02.553Z',
    updatedAt: '2023-12-15T10:07:02.550Z',
    __v: 0,
  },
};

describe('LeftSidebar username', () => {
  afterEach(() => {
    mAxios.reset();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('Successful response', () => {
    beforeEach(async () => {
      await act(async () => {
        mAxios.onGet('/api/users/me/profile').reply(200, mockProfile);
        render(
          <MemoryRouter>
            <Username />
          </MemoryRouter>,
        );
      });
    });

    it('should render username and profile picture properly', async () => {
      await waitFor(() => {
        expect(
          screen.getByText(mockProfile.profile.username),
        ).toBeInTheDocument();
        expect(
          screen.getByAltText(`${mockProfile.profile.username} picture`),
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Edit Profile' }),
        ).toBeInTheDocument();
      });
    });

    it('clicking edit profile should call navigate', () => {
      const editProfileBtn = screen.getByRole('button', {
        name: 'Edit Profile',
      });
      fireEvent.click(editProfileBtn);
      expect(navigate).toHaveBeenCalled();
    });
  });

  describe('Error response', () => {
    beforeEach(async () => {
      await act(async () => {
        mAxios.onGet('/api/users/me/profile').reply(400);
        render(
          <MemoryRouter>
            <Username />
          </MemoryRouter>,
        );
      });
    });

    it('should render error message properly', async () => {
      // Note: be sure to mock request before render
      await waitFor(() => {
        expect(screen.getByText('ERROR LOADING')).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Edit Profile' }),
        ).toBeInTheDocument();
      });
    });

    it('clicking edit profile should call navigate', () => {
      const editProfileBtn = screen.getByRole('button', {
        name: 'Edit Profile',
      });
      fireEvent.click(editProfileBtn);
      expect(navigate).toHaveBeenCalled();
    });
  });
});
