import { MemoryRouter } from 'react-router';
import FormError from '../../Form/FormError';
import { render, screen } from '@testing-library/react';

describe('Form Error', () => {
  it('renders error text', () => {
    render(
      <MemoryRouter>
        <FormError message={'Invalid Name'} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Invalid Name')).toBeInTheDocument();
  });
});
