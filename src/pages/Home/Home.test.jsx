import { describe, it, expect } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import routes from '../../routes.jsx';

describe('home page', () => {
  it('renders page heading', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const heading = screen.getByRole('heading', { name: /home/i });

    expect(heading).toBeInTheDocument();
  });

  it('renders decorative product image', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const image = screen.getByTestId('home-image');

    expect(image).toBeInTheDocument();
  });

  it('renders welcome text', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const text = screen.getByText(/Welcome to Sike!/i);

    expect(text).toBeInTheDocument();
  });

  it("renders 'start shopping' button", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    const btn = screen.getByRole('button', { name: /start shopping/i });

    expect(btn).toBeInTheDocument();
  });
});
