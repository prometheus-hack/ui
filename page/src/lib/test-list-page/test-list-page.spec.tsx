import { render } from '@testing-library/react';

import TestListPage from './test-list-page';

describe('TestListPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestListPage />);
    expect(baseElement).toBeTruthy();
  });
});
