import { render } from '@testing-library/react';

import ClientNavbar from './client-navbar';

describe('ClientNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
