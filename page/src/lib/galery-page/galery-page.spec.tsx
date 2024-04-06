import { render } from '@testing-library/react';

import GaleryPage from './galery-page';

describe('GaleryPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GaleryPage />);
    expect(baseElement).toBeTruthy();
  });
});
