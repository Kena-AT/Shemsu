import { describe, it, expect } from 'vitest';

describe('Frontend Base Test', () => {
  it('should pass to verify testing infrastructure', () => {
    expect(1 + 1).toBe(2);
  });

  it('environment variables should be accessible', () => {
    // Vite exposes env vars on import.meta.env
    expect(import.meta.env.MODE).toBeDefined();
  });
});
