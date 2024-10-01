import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import MainButton from './MainButton.jsx';

describe('main button', () => {
  it('renders button with correct text', () => {
    render(<MainButton text={'I am a button'} />);
    const button = screen.getByRole('button', { name: /i am a button/i });

    expect(button).toBeInTheDocument();
  });
});
