import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import QuantityInput from './QuantityInput.jsx';
import userEvent from '@testing-library/user-event';

describe('quantity input', () => {
  it('renders dropdown list', () => {
    render(<QuantityInput />);
    const dropdown = screen.getByRole('combobox', {
      name: /quantity/i,
    });

    expect(dropdown).toBeInTheDocument();
  });

  it('renders correct number of options', () => {
    render(<QuantityInput />);

    expect(screen.getAllByRole('option').length).toBe(5);
  });

  it('sets default option', () => {
    render(<QuantityInput />);

    expect(screen.getByRole('option', { name: '1' }).selected).toBe(true);
  });

  it('allows user to select value between 1 and 5', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const dropdown = screen.getByRole('combobox', {
      name: /quantity/i,
    });

    await user.selectOptions(dropdown, '3');

    expect(screen.getByRole('option', { name: '3' }).selected).toBe(true);
  });
});
