import { render, /* screen */ } from '@testing-library/react';
import SignUpForm from '../index.tsx';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
/* import userEvent from '@testing-library/user-event'; */

describe('Sign Up Form Component', () => {
  it('renders form with username, password, and confirm password fields', () => {
    const { container } = render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  /*   it('correct form data calls api and creates account', () => {
    const user = userEvent.setup();
    const email = screen.getByRole('input', { name: 'username' });
    const password = screen.getByRole('input', { name: 'password' });
    const confirmPassword = screen.getByRole('input', {
      name: 'confirmPassword',
    });
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    user.type(email, 'test@gmail.com');
    user.type(password, 'vNyBayVtgXpK!');
    user.type(confirmPassword, 'vNyBayVtgXpK!');
  }); */
});
