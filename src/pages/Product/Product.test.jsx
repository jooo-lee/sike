import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

// Mock fetch to prevent real API requests
window.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dummyData),
  });
});

describe('Product page', () => {
  it('renders the product name', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);
    const productName = new RegExp(
      dummyData['data']['products']['edges'][0]['node']['title'],
      'i'
    );
    const product = await screen.findByRole('link', { name: productName });

    await user.click(product);

    expect(
      screen.getByRole('heading', { name: productName, level: 1 })
    ).toBeInTheDocument();
  });
});
