import { render } from '@testing-library/react';

import CoinCounter from './coin-counter';

describe('CoinCounter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoinCounter />);
    expect(baseElement).toBeTruthy();
  });
});
