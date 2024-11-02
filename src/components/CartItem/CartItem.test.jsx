import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

const dummyProduct = dummyData['data']['products']['edges'][0];

describe('cart item', () => {
  it('renders product name', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    // Add product to cart
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Go to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    expect(screen.getByText(dummyProduct['node']['title'])).toBeInTheDocument();
  });

  it('renders product image', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    // Add product to cart
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Go to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    const productImage = screen.getByTestId(
      dummyProduct['node']['featuredImage']['id']
    );

    expect(productImage).toBeInTheDocument();
  });

  it('renders product price with two decimal places', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    // Add product to cart
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Go to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    const productPrice = screen.getByText(
      `CAD $${Number.parseFloat(
        dummyProduct['node']['variants']['edges'][0]['node']['price']['amount']
      ).toFixed(2)}`
    );

    expect(productPrice).toBeInTheDocument();
  });

  it('renders product quantity input field with correct quantity', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const productPageInput = await screen.findByRole('spinbutton', {
      name: /quantity/i,
    });

    // Add 3 of product to cart
    await user.clear(productPageInput);
    await user.type(productPageInput, '3');
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Go to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    const cartItemInput = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    expect(cartItemInput).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  it('allows user to remove item from cart', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    // Add product to cart
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Go to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    // Click delete button
    const deleteBtn = screen.getByRole('button', { name: /remove from cart/i });
    await user.click(deleteBtn);

    expect(
      screen.queryByText(`${dummyProduct['node']['title']}`)
    ).not.toBeInTheDocument();
  });
});
