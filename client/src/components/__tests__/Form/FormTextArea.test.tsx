import { render, screen } from '@testing-library/react';
import FormTextArea from '../../Form/FormTextArea';
import userEvent from '@testing-library/user-event';

const handleInputChangeMock = vi.fn();

describe('FormIconInput', () => {
  it('renders with the correct number of rows', () => {
    render(
      <FormTextArea
        name="profile"
        handleChange={handleInputChangeMock}
        rows={5}
        required={true}
        value={'Container values'}
      />,
    );
    const textarea = screen.getByDisplayValue(
      'Container values',
    ) as HTMLTextAreaElement;
    expect(textarea.rows).toBe(5);
  });

  it('renders with the correct initial value', () => {
    render(
      <FormTextArea
        name="profile"
        handleChange={handleInputChangeMock}
        rows={5}
        required={true}
        value={'Container values'}
      />,
    );
    const textarea = screen.getByDisplayValue(
      'Container values',
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe('Container values');
  });

  it('renders with the required attribute', () => {
    render(
      <FormTextArea
        name="profile"
        handleChange={handleInputChangeMock}
        rows={5}
        required={true}
        value={'Container values'}
      />,
    );
    const textarea = screen.getByDisplayValue(
      'Container values',
    ) as HTMLTextAreaElement;
    expect(textarea.required).toBe(true);
  });

  it('renders with the required attribute false when not specified', () => {
    render(
      <FormTextArea
        name="profile"
        handleChange={handleInputChangeMock}
        rows={5}
        value={'Container values'}
      />,
    );
    const textarea = screen.getByDisplayValue(
      'Container values',
    ) as HTMLTextAreaElement;
    expect(textarea.required).toBe(false);
  });

  it('calls handleChange when FormTextArea is changed', async () => {
    render(
      <FormTextArea
        name="profile"
        handleChange={handleInputChangeMock}
        rows={5}
        value={'Container values'}
      />,
    );
    const textarea = screen.getByDisplayValue(
      'Container values',
    ) as HTMLTextAreaElement;

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'testtest');
    expect(handleInputChangeMock).toHaveBeenCalled();
  });
});
