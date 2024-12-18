import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar.jsx';

describe('navbar', () => {
  it('renders a nav element with correct heading and links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const nav = screen.getByRole('navigation');
    const siteTitle = screen.getByRole('link', { name: /sike/i });
    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(nav).toBeInTheDocument();
    expect(siteTitle).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });
});
