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

    /* 
    Originally I selected the images using their alt text and checked that each
    image's src attribute matched up correctly with its respective product in 
    the dummy data, however I realised that the images did not need alt text as
    they were presented with the product title beneath them. I gave the product
    images blank alt texts but then I was not able to individually query them
    to check that they have the correct src value. I could have used test-ids
    but I was not sure if I wanted to pollute my code for testing.
    */

    const numOfImages = (await screen.findAllByRole('presentation')).length;
    const numOfProducts = dummyData['data']['products']['edges'].length;

    expect(numOfImages).toEqual(numOfProducts);
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
