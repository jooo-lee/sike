import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routes from './routes';

describe('Routes', () => {
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

  it('navigates to error page if error is present', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/invalidRoute'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
  });
});
