import { render } from '@testing-library/react';

import Module from './module';

describe('Module', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Module />);
    expect(baseElement).toBeTruthy();
  });
});
