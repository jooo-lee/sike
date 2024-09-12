import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import Shop from './Shop.jsx';

const dummyData = {
  data: {
    products: {
      edges: [
        {
          node: {
            id: 'product0',
            title: 'Slides',
            description: `Simple, minimal and comfortable, these slides feature a classic design 
            in the perfect shade of iron. Whether you're just lounging around the 
            house or running errands, these slides will offer all-day comfort.`,
            featuredImage: {
              id: 'image0',
              url: 'imageUrl0',
            },
            variants: {
              edges: [
                {
                  node: {
                    price: {
                      amount: '25.0',
                      currencyCode: 'CAD',
                    },
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: 'product1',
            title: 'Sweatpants',
            description: `Soft and comfortable sweatpants in stylish shades. They are 
            perfect for lounging with their cozy stretch fabric that offers just the 
            right amount of warmth. Enjoy the ultimate relaxation experience!`,
            featuredImage: {
              id: 'image1',
              url: 'imageUrl1',
            },
            variants: {
              edges: [
                {
                  node: {
                    price: {
                      amount: '35.0',
                      currencyCode: 'CAD',
                    },
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: 'product2',
            title: "Men's T-shirt",
            description: `Crafted from organic cotton, this classic T-shirt features 
            a relaxed fit, crew neckline and timeless look. Enjoy the breathable 
            comfort of 100% organic cotton.`,
            featuredImage: {
              id: 'image2',
              url: 'imageUrl2',
            },
            variants: {
              edges: [
                {
                  node: {
                    price: {
                      amount: '40.0',
                      currencyCode: 'CAD',
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
};

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
