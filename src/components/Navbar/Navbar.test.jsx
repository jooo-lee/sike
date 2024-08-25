import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Navbar from './Navbar.jsx';

describe('Navbar', () => {
  it('renders a nav element with correct heading and links', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    const pageTitle = screen.getByRole('heading', { name: /sike/i });
    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const cartLink = screen.getByRole('link', { name: /cart/i });

    expect(nav).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });
});
