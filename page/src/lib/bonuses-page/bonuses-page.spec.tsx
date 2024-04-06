import { render } from '@testing-library/react';

import BonusesPage from './bonuses-page';

describe('BonusesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BonusesPage />);
    expect(baseElement).toBeTruthy();
  });
});
