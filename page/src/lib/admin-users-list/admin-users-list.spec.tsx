import { render } from '@testing-library/react';

import AdminUsersList from './admin-users-list';

describe('AdminUsersList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminUsersList />);
    expect(baseElement).toBeTruthy();
  });
});
