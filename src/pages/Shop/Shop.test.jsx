import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Shop from './Shop.jsx';
import dummyData from '../../dummyData.js';

// Mock fetch to prevent real API requests
window.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dummyData),
  });
});

describe('Shop page', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders loading text while API request is in progress', async () => {
    render(<Shop />);

    const loading = screen.getByText('Loading...');

    expect(loading).toBeInTheDocument();

    // Gets rid of 'not wrapped in act(...)' warning
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  it('renders error message', async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject('API is down!');
    });
    render(<Shop />);

    const error = await screen.findByText('A network error was encountered');

    expect(error).toBeInTheDocument();
  });

  it('renders product titles', async () => {
    render(<Shop />);

    for (const edge of dummyData['data']['products']['edges']) {
      const title = await screen.findByText(edge['node']['title']);
      expect(title).toBeInTheDocument();
    }
  });

  it('renders product images', async () => {
    render(<Shop />);

    for (const edge of dummyData['data']['products']['edges']) {
      const image = await screen.findByAltText(edge['node']['title']);
      expect(image).toBeInTheDocument();
    }
  });

  it('renders product prices', async () => {
    render(<Shop />);

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
