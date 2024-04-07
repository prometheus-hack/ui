import { render } from '@testing-library/react';

import OrganizationCreatePage from './organization-create-page';

describe('OrganizationCreatePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrganizationCreatePage />);
    expect(baseElement).toBeTruthy();
  });
});
