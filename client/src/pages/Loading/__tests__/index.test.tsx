import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../index';

describe('Loading Screen', () => {
  it('should render loading screen', () => {
    const container = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
