import { describe, it, expect } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

const dummyProduct1 = dummyData['data']['products']['edges'][0];
const dummyProduct2 = dummyData['data']['products']['edges'][1];

describe('cart page', () => {
  it('renders names of products in cart', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct1['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    // Add first product to cart
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Add second product to cart
    const shopLink = screen.getByRole('link', { name: /shop/i });
    await user.click(shopLink);
    const secondProductName = new RegExp(dummyProduct2['node']['title'], 'i');
    const secondProductLink = await screen.findByRole('link', {
      name: secondProductName,
    });
    await user.click(secondProductLink);
    await user.click(
      await screen.findByRole('button', {
        name: /add to cart/i,
      })
    );

    // Go to cart
    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    expect(
      screen.getByText(dummyProduct1['node']['title'])
    ).toBeInTheDocument();
    expect(
      screen.getByText(dummyProduct2['node']['title'])
    ).toBeInTheDocument();
  });

  it('updates total cart quantity when cart item quantity is updated', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct1['node']['id'].slice(22)}`],
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

    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });
    await user.clear(input);
    await user.type(input, '2[Tab]');

    expect(
      screen.getByRole('link', { name: /cart \(2\)/i })
    ).toBeInTheDocument();
  });

  it('displays cart empty message when no products are in cart', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/cart'],
    });
    render(<RouterProvider router={router} />);
    const message = screen.getByText(/Your cart is currently empty./i);

    expect(message).toBeInTheDocument();
  });

  it('does not display cart empty message when products are in cart', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct1['node']['id'].slice(22)}`],
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

    const message = screen.queryByText(/Your cart is currently empty./i);
    expect(message).not.toBeInTheDocument();
  });
});
