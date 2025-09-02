import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

expect.extend(toHaveNoViolations);

test('home route has no obvious a11y violations', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
