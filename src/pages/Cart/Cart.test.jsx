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

    const cartLink = screen.getByRole('link', { name: /cart/i });
    await user.click(cartLink);

    expect(
      screen.getByText(dummyProduct1['node']['title'])
    ).toBeInTheDocument();
    expect(
      screen.getByText(dummyProduct2['node']['title'])
    ).toBeInTheDocument();
  });
});
