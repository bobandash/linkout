import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../index';
import { MemoryRouter } from 'react-router';

describe('Error Page', () => {
  it('should render 404 page by default', () => {
    const container = render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render 401 page when 401 status is passed', () => {
    const container = render(
      <MemoryRouter>
        <Error errorCode={401} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render 500 page when 500 status is passed', () => {
    const container = render(
      <MemoryRouter>
        <Error errorCode={500} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render 404 page when 404 status is passed', () => {
    const container = render(
      <MemoryRouter>
        <Error errorCode={404} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
