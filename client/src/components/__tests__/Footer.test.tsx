import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';
import { MemoryRouter } from 'react-router';

const navigate = vi.fn();
vi.mock('react-router', async () => {
  const mod = (await vi.importActual('react-router')) as object;
  return {
    ...mod,
    useNavigate: () => navigate,
  };
});

describe('Footer', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should render footer', () => {
    const container = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls navigate when home button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const homeButton = getByText('Home');
    fireEvent.click(homeButton);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('calls navigate when communities button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const homeButton = getByText('Communities');
    fireEvent.click(homeButton);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('calls navigate when profile button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const homeButton = getByText('Profile');
    fireEvent.click(homeButton);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('calls navigate when messages button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const homeButton = getByText('Messages');
    fireEvent.click(homeButton);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
