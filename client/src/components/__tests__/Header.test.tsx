import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import { MemoryRouter } from 'react-router';

describe('Header', () => {
  it('renders header name', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header name={'Community'} />
      </MemoryRouter>,
    );
    expect(getByText('Community')).toBeInTheDocument();
  });

  it('renders text as image if image length is 2', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header name={'Community'} image={'ZA'} />
      </MemoryRouter>,
    );
    expect(getByText('ZA')).toBeInTheDocument();
  });

  it('renders text as image if image length is 1', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header name={'Community'} image={'Z'} />
      </MemoryRouter>,
    );
    expect(getByText('Z')).toBeInTheDocument();
  });

  it('does not render image if length > 2 and does not contain external URL or default pic', () => {
    render(
      <MemoryRouter>
        <Header name={'Community'} image={'ZABDASDAS'} />
      </MemoryRouter>,
    );
    const imgElement = screen.queryByAltText('header picture');
    expect(imgElement).toBeNull();
  });

  it('renders default profile image', () => {
    const defaultImage = 'images/defaultPfp.jpg';
    render(
      <MemoryRouter>
        <Header name={'Community'} image={defaultImage} />
      </MemoryRouter>,
    );
    const imgElement = screen.getByAltText('header picture');
    expect(imgElement).toBeInTheDocument();
  });

  it('renders profile image when image starts with https://', () => {
    const image = 'https://test.jpg';
    render(
      <MemoryRouter>
        <Header name={'Community'} image={image} />
      </MemoryRouter>,
    );
    const imgElement = screen.getByAltText('header picture');
    expect(imgElement).toBeInTheDocument();
  });

  it('renders profile image when image starts with http://', () => {
    const image = 'http://test.jpg';
    render(
      <MemoryRouter>
        <Header name={'Community'} image={image} />
      </MemoryRouter>,
    );
    const imgElement = screen.getByAltText('header picture');
    expect(imgElement).toBeInTheDocument();
  });

  it('has child as outlet', () => {
    const image = 'http://test.jpg';
    render(
      <MemoryRouter>
        <Header name={'Community'} image={image}>
          <p>Test values</p>
        </Header>
      </MemoryRouter>,
    );
    const childElement = screen.getByText('Test values');
    expect(childElement).toBeInTheDocument();
  });
});
