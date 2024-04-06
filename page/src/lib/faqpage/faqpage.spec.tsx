import { render } from '@testing-library/react';

import FAQPage from './faqpage';

describe('FAQPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FAQPage />);
    expect(baseElement).toBeTruthy();
  });
});
