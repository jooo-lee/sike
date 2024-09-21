import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routes from './routes.jsx';
import dummyData from './dummyData.js';

// Mock fetch to prevent real API requests
window.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dummyData),
  });
});

describe('routes', () => {
  it('navigates to home page when page title is clicked', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/cart'],
    });
    render(<RouterProvider router={router} />);
    const pageTitle = screen.getByRole('link', { name: /sike/i });

    await user.click(pageTitle);

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

  it('navigates to home page when home link is clicked', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    await user.click(homeLink);

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

  it('navigates to shop page when shop link is clicked', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const shopLink = screen.getByRole('link', { name: /shop/i });

    await user.click(shopLink);

    expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();
  });

  it('navigates to cart page when cart link is clicked', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);
    const cartLink = screen.getByRole('link', { name: /cart/i });

    await user.click(cartLink);

    expect(screen.getByRole('heading', { name: /cart/i })).toBeInTheDocument();
  });

  it('navigates to correct product page when product is clicked', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);
    const productName = new RegExp(
      dummyData['data']['products']['edges'][0]['node']['title'],
      'i'
    );
    const productLink = await screen.findByRole('link', { name: productName });

    await user.click(productLink);

    expect(
      screen.getByRole('heading', { name: productName, level: 1 })
    ).toBeInTheDocument();
  });
});
