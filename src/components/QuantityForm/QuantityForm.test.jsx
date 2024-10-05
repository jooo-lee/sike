import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

const dummyProduct = dummyData['data']['products']['edges'][0];

describe('quantity form', () => {
  it('renders form with quantity input and add to cart button', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    const form = await screen.findByRole('form', { name: /quantityForm/i });
    const input = await screen.findByRole('spinbutton', {
      name: /quantity/i,
    });
    const button = await screen.findByRole('button', { name: /add to cart/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });
});
