import { render, screen, fireEvent } from '@testing-library/react';
import FormIconInput from '../../Form/FormIconInput';

const handleInputChangeMock = vi.fn();
global.URL.createObjectURL = vi.fn(() => 'mocked-object-url');
global.URL.revokeObjectURL = vi.fn();

function getById<T extends Element>(container: HTMLElement, id: string): T {
  const element = container.querySelector<T>(`#${id}`);
  assert(element !== null, `Unable to find an element with ID #${id}.`);
  return element;
}

describe('FormIconInput', () => {
  it('renders correctly', () => {
    render(
      <FormIconInput
        name="icon"
        centered={false}
        handleInputChange={handleInputChangeMock}
        defaultValue="example.jpg"
      />,
    );
    expect(FormIconInput).toMatchSnapshot();
  });

  it('renders a text placeholder if defaultValue is not an image', () => {
    render(
      <FormIconInput
        name="icon"
        centered={false}
        handleInputChange={handleInputChangeMock}
        defaultValue="random text"
      />,
    );
    expect(screen.getByText('RANDOM TEXT')).toBeInTheDocument();
  });

  it('renders an image if defaultValue is an image', () => {
    render(
      <FormIconInput
        name="icon"
        centered={false}
        handleInputChange={() => {}}
        defaultValue="images/example.jpg"
      />,
    );
    expect(screen.getByAltText('icon image')).toBeInTheDocument();
  });

  it('triggers creating an internal url to display and handleInputChange when input is changed', () => {
    const name = 'icon';
    const { container } = render(
      <FormIconInput
        name={name}
        centered={false}
        handleInputChange={handleInputChangeMock}
      />,
    );

    const input = getById<HTMLInputElement>(container, name);
    fireEvent.change(input, {
      target: {
        files: [new File([''], 'example.jpg', { type: 'image/jpeg' })],
      },
    });

    expect(handleInputChangeMock).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});
