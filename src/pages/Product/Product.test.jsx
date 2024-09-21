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

const dummyProduct = dummyData['data']['products']['edges'][0];

describe('Product page', () => {
  it('renders product name', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);
    const productName = new RegExp(dummyProduct['node']['title'], 'i');
    const productLink = await screen.findByRole('link', { name: productName });

    await user.click(productLink);

    expect(
      screen.getByRole('heading', { name: productName, level: 1 })
    ).toBeInTheDocument();
  });

  it('renders product image', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);
    const productName = new RegExp(dummyProduct['node']['title'], 'i');
    const productLink = await screen.findByRole('link', { name: productName });

    await user.click(productLink);

    expect(
      screen.getByTestId(dummyProduct['node']['featuredImage']['id'])
    ).toBeInTheDocument();
  });
});
