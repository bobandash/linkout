import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../index';
import { MemoryRouter } from 'react-router';
const navigate = vi.fn();
vi.mock('react-router', async () => {
  const mod = (await vi.importActual('react-router')) as object;
  return {
    ...mod,
    useNavigate: () => navigate,
  };
});

describe('Error Page', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('renders 404 page by default', () => {
    const container = render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls navigate button when homepage button pressed', () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );
    const navBtn = screen.getByRole('button', { name: 'Homepage' });
    fireEvent.click(navBtn);
    expect(navigate).toHaveBeenCalled();
  });

  it('renders 401 page correctly', () => {
    const container = render(
      <MemoryRouter>
        <Error errorCode={401} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders 500 page correctly', () => {
    const container = render(
      <MemoryRouter>
        <Error errorCode={500} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders 404 page correctly', () => {
    const container = render(
      <MemoryRouter>
        <Error errorCode={404} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
