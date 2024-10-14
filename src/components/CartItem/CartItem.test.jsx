import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CartItem from './CartItem.jsx';
import dummyData from '../../dummyData.js';

const dummyProduct = dummyData['data']['products']['edges'][0];

describe('cart item', () => {
  it('renders product name', () => {
    render(
      <MemoryRouter>
        <CartItem product={dummyProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(dummyProduct['node']['title'])).toBeInTheDocument();
  });

  it('renders product image', () => {
    render(
      <MemoryRouter>
        <CartItem product={dummyProduct} />
      </MemoryRouter>
    );
    const productImage = screen.getByTestId(
      dummyProduct['node']['featuredImage']['id']
    );

    expect(productImage).toBeInTheDocument();
  });

  it('renders product price with two decimal places', () => {
    render(
      <MemoryRouter>
        <CartItem product={dummyProduct} />
      </MemoryRouter>
    );
    const productPrice = screen.getByText(
      `CAD $${Number.parseFloat(
        dummyProduct['node']['variants']['edges'][0]['node']['price']['amount']
      ).toFixed(2)}`
    );

    expect(productPrice).toBeInTheDocument();
  });

  it('renders product quantity input field');
  it('renders remove item from cart button');
});
