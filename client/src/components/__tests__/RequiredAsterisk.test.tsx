import { MemoryRouter } from 'react-router';
import RequiredAsterisk from '../RequiredAsterisk';
import { render, screen } from '@testing-library/react';

describe('Required asterisk', () => {
  it('renders *', () => {
    render(
      <MemoryRouter>
        <RequiredAsterisk />
      </MemoryRouter>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
