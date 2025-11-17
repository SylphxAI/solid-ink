import { describe, it, expect } from 'vitest';
import { useInput } from '../src/hooks/useInput.js';

describe('useInput', () => {
  it('exports useInput function', () => {
    expect(useInput).toBeDefined();
    expect(typeof useInput).toBe('function');
  });

  it('accepts handler and options', () => {
    const handler = () => {};
    expect(() => useInput(handler)).not.toThrow();
    expect(() => useInput(handler, { isActive: false })).not.toThrow();
  });
});
