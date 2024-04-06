import { render } from '@testing-library/react';

import ProfileCardButton from './profile-card-button';

describe('ProfileCardButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileCardButton />);
    expect(baseElement).toBeTruthy();
  });
});
