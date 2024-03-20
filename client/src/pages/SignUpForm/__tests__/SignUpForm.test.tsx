import { render, screen, waitFor } from '@testing-library/react';
import SignUpForm from '../index.tsx';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mAxios = new MockAdapter(axios);

describe('Sign Up Form Component', () => {
  afterEach(() => {
    mAxios.reset();
  });

  it('should renders form with username, password, and confirm password fields', () => {
    const { container } = render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should call create user api when button is pressed', async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    mAxios.onPost('/api/auth/register').reply(200);
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(mAxios.history.post.length).toBe(1);
    });
  });

  /*   it('should display errors in sign up form when fetch request fails', async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    mAxios.onPost('/api/auth/register').reply(400, {
      email: {
        msg: 'Email invalid',
      },
      password: {
        msg: 'Password invalid',
      },
      confirmPassword: {
        msg: 'Password does not match',
      },
      userExists: {
        msg: 'User already exists',
      },
    });
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(mAxios.history.post.length).toBe(1);
      expect(screen.getByText('Email invalid')).toBeInTheDocument();
    });
  }); */
});

/*     const user = userEvent.setup();
    const email = screen.getByRole('input', { name: 'username' });
    const password = screen.getByRole('input', { name: 'password' });
    const confirmPassword = screen.getByRole('input', {
      name: 'confirmPassword',
    });
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    user.type(email, 'test@gmail.com');
    user.type(password, 'vNyBayVtgXpK!');
    user.type(confirmPassword, 'vNyBayVtgXpK!'); */
