import { describe, it, expect } from 'vitest';
import { getIsLogged } from '../store/selectors';

describe('getIsLogged selector', () => {
  it('should return true when the user is authenticated', () => {
    const mockState = {
      auth: {
        auth: true,
      },
    };

    const isLogged = getIsLogged(mockState as any); // casting to any if RootState isn't strictly typed
    expect(isLogged).toBe(true);
  });

  it('should return false when the user is not authenticated', () => {
    const mockState = {
      auth: {
        auth: false,
      },
    };

    const isLogged = getIsLogged(mockState as any);
    expect(isLogged).toBe(false);
  });
});
