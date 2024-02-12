import { render, screen } from '@testing-library/react';
import PageMainContentContainer from '../PageMainContentContainer';

const MockChild = () => {
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

describe('PageMainContentContainer', () => {
  it('renders correctly', () => {
    const { container } = render(
      <PageMainContentContainer>
        <MockChild />
      </PageMainContentContainer>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
