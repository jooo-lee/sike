import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

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

  it('renders product quantity dropdown', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const dropdown = screen.getByRole('combobox', {
      name: /quantity/i,
    });

    expect(dropdown).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const addToCart = screen.getByRole('button', { name: /add to cart/i });

    expect(addToCart).toBeInTheDocument();
  });
});
