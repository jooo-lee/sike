import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProductCard from './ProductCard.jsx';
import dummyData from '../../dummyData.js';

const dummyProduct = dummyData['data']['products']['edges'][0];

describe('product card', () => {
  it('renders product image', () => {
    render(
      <BrowserRouter>
        <ProductCard product={dummyProduct} />
      </BrowserRouter>
    );
    const productImage = screen.getByTestId(
      dummyProduct['node']['featuredImage']['id']
    );

    expect(productImage).toBeInTheDocument();
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
