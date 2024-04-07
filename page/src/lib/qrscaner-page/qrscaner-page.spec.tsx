import { render } from '@testing-library/react';

import QRScanerPage from './qrscaner-page';

describe('QRScanerPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QRScanerPage />);
    expect(baseElement).toBeTruthy();
  });
});
