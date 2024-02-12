import ProfilePic from '../ProfilePic';
import { render, screen } from '@testing-library/react';

describe('Profile picture', () => {
  it('renders with default medium size if no size is provided', () => {
    const { container } = render(
      <ProfilePic image="example.jpg" name="John" />,
    );
    expect(container.firstChild).toHaveClass('h-[60px]');
    expect(container.firstChild).toHaveClass('2xl:h-[80px]');
  });

  it('renders with the correct size class when size is provided', () => {
    const { container } = render(
      <ProfilePic image="example.jpg" name="John" size="small" />,
    );
    expect(container.firstChild).toHaveClass('h-[50px]');
    expect(container.firstChild).toHaveClass('2xl:h-[60px]');
  });

  it('renders with the default image if the provided image is the default one', () => {
    render(<ProfilePic image="images/defaultPfp.jpg" name="John" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', '/api/images/defaultPfp.jpg');
  });

  it('renders with the provided image if it is not the default one', () => {
    render(<ProfilePic image="customImage.jpg" name="John" />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', 'customImage.jpg');
  });
});
