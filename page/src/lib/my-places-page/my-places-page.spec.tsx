import { render } from '@testing-library/react';

import MyPlacesPage from './my-places-page';

describe('MyPlacesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyPlacesPage />);
    expect(baseElement).toBeTruthy();
  });
});
