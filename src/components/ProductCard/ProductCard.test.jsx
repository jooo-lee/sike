import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductCard from './ProductCard.jsx';
import dummyData from '../../dummyData.js';

const imgSize = 200;

describe('Product card', () => {
  it('renders product image with correct src and alt', () => {
    render(
      <BrowserRouter>
        <ProductCard
          product={dummyData['data']['products']['edges'][0]}
          imgSize={imgSize}
        />
      </BrowserRouter>
    );
    const productImage = screen.getByRole('presentation');

    expect(productImage).toHaveAttribute(
      'src',
      `${dummyData['data']['products']['edges'][0]['node']['featuredImage']['url']}&width=${imgSize}&height=${imgSize}`
    );
  });

  it('renders product name', () => {
    render(
      <BrowserRouter>
        <ProductCard
          product={dummyData['data']['products']['edges'][0]}
          imgSize={imgSize}
        />
      </BrowserRouter>
    );
    const productTitle = screen.getByText(
      dummyData['data']['products']['edges'][0]['node']['title']
    );

    expect(productTitle).toBeInTheDocument();
  });

  it('renders product price with two decimal places', () => {
    render(
      <BrowserRouter>
        <ProductCard
          product={dummyData['data']['products']['edges'][0]}
          imgSize={imgSize}
        />
      </BrowserRouter>
    );
    const productPrice = screen.getByText(
      `CAD $${Number.parseFloat(
        dummyData['data']['products']['edges'][0]['node']['variants'][
          'edges'
        ][0]['node']['price']['amount']
      ).toFixed(2)}`
    );

    expect(productPrice).toBeInTheDocument();
  });
});
