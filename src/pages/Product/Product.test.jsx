import { describe, expect, it } from 'vitest';
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
    window.localStorage.clear();
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
    const input = screen.getByRole('spinbutton', {
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
});
