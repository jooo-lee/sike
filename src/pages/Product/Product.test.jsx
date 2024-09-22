import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

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

describe('product page', () => {
  it('renders product name as heading', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const productName = new RegExp(dummyProduct['node']['title'], 'i');
    const heading = await screen.findByRole('heading', {
      name: productName,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders product image', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const image = await screen.findByTestId(
      dummyProduct['node']['featuredImage']['id']
    );

    expect(image).toBeInTheDocument();
  });
});
