import { render } from '@testing-library/react';

import DrawPolylines from './draw-polylines';

describe('DrawPolylines', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrawPolylines />);
    expect(baseElement).toBeTruthy();
  });
});
