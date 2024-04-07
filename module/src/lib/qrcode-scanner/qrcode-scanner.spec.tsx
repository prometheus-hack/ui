import { render } from '@testing-library/react';

import QRCodeScanner from './qrcode-scanner';

describe('QRCodeScanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QRCodeScanner />);
    expect(baseElement).toBeTruthy();
  });
});
