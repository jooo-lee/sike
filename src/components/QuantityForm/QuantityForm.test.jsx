import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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

  it("replaces add to cart button with 'added to cart' text after add to cart button is clicked", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/added to cart/i)).not.toBeInTheDocument();

    await user.click(
      await screen.findByRole('button', { name: /add to cart/i })
    );

    expect(
      screen.queryByRole('button', { name: /add to cart/i })
    ).not.toBeInTheDocument();
    expect(await screen.findByText(/added to cart/i)).toBeInTheDocument();
  });

  it('displays add to cart button again 2.5 seconds after it is clicked', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    await user.click(
      await screen.findByRole('button', { name: /add to cart/i })
    );
    vi.advanceTimersByTime(2500);

    expect(
      await screen.findByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/added to cart/i)).not.toBeInTheDocument();

    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
});
