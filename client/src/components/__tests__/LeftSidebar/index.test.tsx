import { render } from '@testing-library/react';
import LeftSidebar from '../../LeftSidebar/index';
import { MemoryRouter } from 'react-router';

describe('Left Sidebar', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <LeftSidebar />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
