import registerReducer, { registerUser } from '../reducers/registerSlice';

describe('registerSlice', () => {
  const initialState = {
    userInfo: null,
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(registerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = registerReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle registerUser.fulfilled', () => {
    const user = { id: 1, email: 'test@example.com' };
    const action = { type: registerUser.fulfilled.type, payload: user };
    const state = registerReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.userInfo).toEqual(user);
    expect(state.error).toBeNull();
  });

  it('should handle registerUser.rejected', () => {
    const error = { message: 'User already exists' };
    const action = { type: registerUser.rejected.type, payload: error };
    const state = registerReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
