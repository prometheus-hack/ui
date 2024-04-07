import { render } from '@testing-library/react';

import UserQRCode from './user-qrcode';

describe('UserQRCode', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserQRCode />);
    expect(baseElement).toBeTruthy();
  });
});
