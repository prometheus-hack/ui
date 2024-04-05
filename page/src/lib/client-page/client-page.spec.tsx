import { render } from '@testing-library/react';

import ClientPage from './client-page';

describe('ClientPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientPage />);
    expect(baseElement).toBeTruthy();
  });
});
