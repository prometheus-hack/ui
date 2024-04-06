import { render } from '@testing-library/react';

import AvatarImage from './avatar-image';

describe('AvatarImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvatarImage />);
    expect(baseElement).toBeTruthy();
  });
});
