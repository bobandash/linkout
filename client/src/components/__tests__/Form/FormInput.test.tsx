import { render, screen } from '@testing-library/react';
import FormInput from '../../Form/FormInput';
import userEvent from '@testing-library/user-event';

const handleInputChangeMock = vi.fn();

function getInputById<T extends HTMLInputElement>(
  container: HTMLElement,
  id: string,
): T {
  const element = container.querySelector<T>(`#${id}`);
  assert(element !== null, `Unable to find an element with ID #${id}.`);
  return element;
}

describe('FormIconInput', () => {
  it('renders autoFocus properly', () => {
    const { container } = render(
      <FormInput
        name="profile"
        handleInputChange={handleInputChangeMock}
        autoFocus={true}
        placeholder={'Billy'}
        value={'test'}
      />,
    );
    const input = getInputById(container, 'profile');
    expect(document.activeElement).toBe(input);
  });

  it('renders no autoFocus when not speciffied', () => {
    const { container } = render(
      <FormInput
        name="profile"
        handleInputChange={handleInputChangeMock}
        placeholder={'Billy'}
        value={'test'}
      />,
    );
    const input = getInputById(container, 'profile');
    expect(document.activeElement).not.toBe(input);
  });

  it('renders value properly', () => {
    const { container } = render(
      <FormInput
        name="profile"
        handleInputChange={handleInputChangeMock}
        autoFocus={true}
        placeholder={'Billy'}
        value={'test'}
      />,
    );
    const input = getInputById(container, 'profile');
    expect(input.value).toBe('test');
  });

  it('renders autoFocus properly', () => {
    const { container } = render(
      <FormInput
        name="profile"
        handleInputChange={handleInputChangeMock}
        autoFocus={true}
        placeholder={'Billy'}
        value={'test'}
      />,
    );
    const input = getInputById(container, 'profile');
    expect(document.activeElement).toBe(input);
  });

  it('triggers handleInputChange when input is changed', async () => {
    render(
      <FormInput
        name="profile"
        handleInputChange={handleInputChangeMock}
        autoFocus={true}
        placeholder={'Billy'}
        value={'test'}
      />,
    );
    const input = (await screen.findByRole('textbox', {
      name: 'profile',
    })) as HTMLInputElement;
    await userEvent.clear(input);
    await userEvent.type(input, 'testtest');
    expect(handleInputChangeMock).toHaveBeenCalled();
  });
});
