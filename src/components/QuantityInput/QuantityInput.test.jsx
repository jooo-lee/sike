import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import QuantityInput from './QuantityInput.jsx';
import userEvent from '@testing-library/user-event';

describe('quantity input', () => {
  it('renders input field', () => {
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    expect(input).toBeInTheDocument();
  });

  it('renders increase and decrease buttons', () => {
    render(<QuantityInput />);
    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    });

    expect(increaseBtn).toBeInTheDocument();
    expect(decreaseBtn).toBeInTheDocument();
  });

  it('sets default quantity to 1', () => {
    render(<QuantityInput />);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('allows user to input integer quantity between and including 1 and 5', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    await user.clear(input);
    await user.type(input, '3');

    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  it('rounds quantities less than 1 to 1', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    await user.clear(input);

    // Emulate tab keypress to blur input field
    await user.type(input, '-2[Tab]');

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('rounds quantities greater than 5 to 5', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    await user.clear(input);

    // Emulate tab keypress to blur input field
    await user.type(input, '7[Tab]');

    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('rounds non-integer quantities to nearest integer between and including 1 and 5', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    await user.clear(input);

    // Emulate tab keypress to blur input field
    await user.type(input, '2.6[Tab]');

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('increments quantity by 1 when increase button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    });

    await user.click(increaseBtn);
    await user.click(increaseBtn);
    await user.click(increaseBtn);

    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
  });

  it('prevents quantity from incrementing above 5 when increase button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });
    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    });

    await user.clear(input);
    await user.type(input, '5');
    await user.click(increaseBtn);
    await user.click(increaseBtn);

    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('decrements quantity by 1 when decrease button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });
    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    });

    await user.clear(input);
    await user.type(input, '4');
    await user.click(decreaseBtn);
    await user.click(decreaseBtn);

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('prevents quantity from decrementing below 1 when decrease button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    });

    await user.click(decreaseBtn);
    await user.click(decreaseBtn);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('prevents user from entering non-numeric characters', async () => {
    const user = userEvent.setup();
    render(<QuantityInput />);
    const input = screen.getByRole('spinbutton', {
      name: /quantity/i,
    });

    await user.type(input, 'foo$$$');

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});
