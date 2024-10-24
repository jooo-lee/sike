import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import routes from '../../routes.jsx';
import dummyData from '../../dummyData.js';

describe('shop page', () => {
  it('renders loading indicator while API request is in progress', async () => {
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
    window.localStorage.clear();
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

  it('renders product card components', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });
    render(<RouterProvider router={router} />);

    for (const edge of dummyData['data']['products']['edges']) {
      const title = await screen.findByText(edge['node']['title']);
      expect(title).toBeInTheDocument();
    }
  });
});
