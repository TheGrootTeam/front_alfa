import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import registerReducer, { registerUser } from '../reducers/registerSlice';

// Mock de axios para interceptar peticiones HTTP
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('registerSlice', () => {
  const initialState = {
    userInfo: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    mockedAxios.post.mockClear();
  });

  it('should handle initial state', () => {
    expect(registerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = registerReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle registerUser.fulfilled', async () => {
    const user = { id: 1, email: 'test@example.com' };
    mockedAxios.post.mockResolvedValueOnce({ data: user });

    const store = configureStore({
      reducer: registerReducer,
    });

    await store.dispatch(registerUser({ dniCif: '12345678A', email: 'test@example.com', password: 'password123', isCompany: false }));

    const state = store.getState();
    expect(state.loading).toBe(false);
    expect(state.userInfo).toEqual(user);
    expect(state.error).toBeNull();
  });

  it('should handle registerUser.rejected', async () => {
    const error = { message: 'User already exists' };
    mockedAxios.post.mockRejectedValueOnce({ response: { data: error } });

    const store = configureStore({
      reducer: registerReducer,
    });

    await store.dispatch(registerUser({ dniCif: '12345678A', email: 'existing@example.com', password: 'password123', isCompany: false }));

    const state = store.getState();
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
