import { describe, expect, it, vi } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

const dummyProduct = dummyData['data']['products']['edges'][0];

describe('product page', () => {
  it('renders loading indicator', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    const loading = screen.getByLabelText('tail-spin-loading');

    expect(loading).toBeInTheDocument();

    // Prevents 'not wrapped in act(...)' warning
    await waitForElementToBeRemoved(() =>
      screen.getByLabelText('tail-spin-loading')
    );
  });

  it('renders error message', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject('API is down!');
    });
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    const error = await screen.findByText('A network error was encountered');

    expect(error).toBeInTheDocument();
  });

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

  it('renders product price', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const price = await screen.findByText(
      `CAD $${Number.parseFloat(
        dummyProduct['node']['variants']['edges'][0]['node']['price']['amount']
      ).toFixed(2)}`
    );

    expect(price).toBeInTheDocument();
  });

  it('renders product description', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const description = await screen.findByText(
      dummyProduct['node']['description'],
      { collapseWhitespace: false }
    );

    expect(description).toBeInTheDocument();
  });

  it('renders product quantity form', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const form = await screen.findByRole('form', { name: /quantityForm/i });

    expect(form).toBeInTheDocument();
  });

  it('updates cart quantity when product is added to cart', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const input = await screen.findByRole('spinbutton', {
      name: /quantity/i,
    });
    const addToCartBtn = await screen.findByRole('button', {
      name: /add to cart/i,
    });

    await user.clear(input);
    await user.type(input, '3');
    await user.click(addToCartBtn);

    expect(
      screen.getByRole('link', { name: /cart \(3\)/i })
    ).toBeInTheDocument();
  });

  it('displays default quantity value of 1', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);

    expect(await screen.findByDisplayValue('1')).toBeInTheDocument();
  });

  it('updates input value to 1, 2.5 seconds after product is added to cart', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const input = await screen.findByRole('spinbutton', {
      name: /quantity/i,
    });
    const addToCartBtn = await screen.findByRole('button', {
      name: /add to cart/i,
    });

    // Add 3 of current product to cart
    await user.clear(input);
    await user.type(input, '3');
    await user.click(addToCartBtn);

    vi.advanceTimersByTime(2500);

    // Need to await after advancing Vitest timers
    expect(await screen.findByDisplayValue('1')).toBeInTheDocument();

    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('only allows maximum of 5 of same product to be added', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: [`/product/${dummyProduct['node']['id'].slice(22)}`],
    });
    render(<RouterProvider router={router} />);
    const input = await screen.findByRole('spinbutton', {
      name: /quantity/i,
    });
    const addToCartBtn = await screen.findByRole('button', {
      name: /add to cart/i,
    });

    // Add 3 of current product to cart
    await user.clear(input);
    await user.type(input, '3');
    await user.click(addToCartBtn);

    // Wait for add to cart button to reappear
    vi.advanceTimersByTime(2500);

    // Attempt to add 4 more of current product to cart
    await user.clear(input);
    await user.type(input, '4');
    await user.click(
      screen.getByRole('button', {
        name: /add to cart/i,
      })
    );

    expect(
      screen.getByRole('link', { name: /cart \(5\)/i })
    ).toBeInTheDocument();

    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
});
