import { render } from '@testing-library/react';

import WaitlistPage from './waitlist-page';

describe('WaitlistPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WaitlistPage />);
    expect(baseElement).toBeTruthy();
  });
});
