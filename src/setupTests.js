import { expect, afterEach, vi, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

import dummyData from './dummyData.js';

expect.extend(matchers);

// Mock fetch to prevent real API requests
window.fetch = vi.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(dummyData),
  });
});

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});
