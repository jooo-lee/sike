import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductCard from './ProductCard.jsx';

const dummyProduct = {
  node: {
    id: 'productId',
    title: 'Slides',
    description: `Simple, minimal and comfortable, these slides feature a classic design 
      in the perfect shade of iron. Whether you're just lounging around the 
      house or running errands, these slides will offer all-day comfort.`,
    featuredImage: {
      id: 'imageId',
      url: 'imageUrl',
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
};

describe('Product card', () => {
  it('renders product image with correct src and alt', () => {
    render(
      <BrowserRouter>
        <ProductCard product={dummyProduct} />
      </BrowserRouter>
    );
    const productImage = screen.getByRole('img');

    expect(productImage).toHaveAttribute(
      'src',
      dummyProduct['node']['featuredImage']['url']
    );
    expect(productImage).toHaveAttribute('alt', dummyProduct['node']['title']);
  });

  it('renders product name', () => {
    render(
      <BrowserRouter>
        <ProductCard product={dummyProduct} />
      </BrowserRouter>
    );
    const productTitle = screen.getByText(dummyProduct['node']['title']);

    expect(productTitle).toBeInTheDocument();
  });

  it('renders product price with two decimal places', () => {
    render(
      <BrowserRouter>
        <ProductCard product={dummyProduct} />
      </BrowserRouter>
    );
    const productPrice = screen.getByText(
      `CAD $${Number.parseFloat(
        dummyProduct['node']['variants']['edges'][0]['node']['price']['amount']
      ).toFixed(2)}`
    );

    expect(productPrice).toBeInTheDocument();
  });
});