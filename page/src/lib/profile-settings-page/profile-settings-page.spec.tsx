import { render } from '@testing-library/react';

import ProfileSettingsPage from './profile-settings-page';

describe('ProfileSettingsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileSettingsPage />);
    expect(baseElement).toBeTruthy();
  });
});
