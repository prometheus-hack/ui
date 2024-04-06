import { render } from '@testing-library/react';

import RegisterPage from './register-page';

describe('RegisterPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegisterPage />);
    expect(baseElement).toBeTruthy();
  });
});
