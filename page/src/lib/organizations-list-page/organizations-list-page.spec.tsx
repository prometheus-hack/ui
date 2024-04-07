import { render } from '@testing-library/react';

import OrganizationsListPage from './organizations-list-page';

describe('OrganizationsListPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrganizationsListPage />);
    expect(baseElement).toBeTruthy();
  });
});
