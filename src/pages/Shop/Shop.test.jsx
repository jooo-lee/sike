import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

// Mock fetch to prevent real API requests
window.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dummyData),
  });
});

describe('shop page', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders loading text while API request is in progress', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
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
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);

    const error = await screen.findByText('A network error was encountered');

    expect(error).toBeInTheDocument();
  });

  it('renders product titles', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);

    for (const edge of dummyData['data']['products']['edges']) {
      const title = await screen.findByText(edge['node']['title']);
      expect(title).toBeInTheDocument();
    }
  });

  it('renders product images', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);

    /* 
    Since the product images are displayed with accompanying product names,
    I left their alt attributes blank. However, this means that we are not able
    to select them for testing using getByAltText. Thus, we use test ids here.
    */
    for (const edge of dummyData['data']['products']['edges']) {
      const image = await screen.findByTestId(
        edge['node']['featuredImage']['id']
      );
      expect(image).toBeInTheDocument();
    }
  });

  it('renders product prices', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);

    for (const edge of dummyData['data']['products']['edges']) {
      const price = await screen.findByText(
        `CAD $${Number.parseFloat(
          edge['node']['variants']['edges'][0]['node']['price']['amount']
        ).toFixed(2)}`
      );
      expect(price).toBeInTheDocument();
    }
  });
});
