import { describe, expect, it, vi } from 'vitest';
import { LoginPage } from '../LoginPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { authLogin } from '../../../store/actions/authActions';

// Mock the authLogin action
vi.mock('../../../store/actions/authActions', () => ({
  authLogin: vi.fn(),
}));

// Define the type of your global state
interface AppState {
  ui: {
    loading: boolean;
    error: string | null;
  };
}

describe('LoginPage', () => {
  // Create a slice for the UI state
  const uiSlice = createSlice({
    name: 'ui',
    initialState: { loading: false, error: null } as AppState['ui'],
    reducers: {},
  });

  // Crea el store utilizando configureStore
  const store = configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
  });

  //render component
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

  // Create a snapshot and compare
  it('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should dispatch authLogin', () => {
    renderComponent();
    const dniCif = 'dniCif';
    const password = 'password';
    const rememberMe = true;

    // Get elements
    const dniInput = screen.getByLabelText('DNI/CIF');
    const passwordInput = screen.getByLabelText('Password');
    const checkInput = screen.getByLabelText('Remember me');
    const submitButton = screen.getByRole('button', {
      name: /log in/i,
    });

    // Check if the submit button is initially disabled
    expect(submitButton).toHaveProperty('disabled', true);

    // Simulate form submission
    fireEvent.change(dniInput, { target: { value: dniCif } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(checkInput, { target: { value: rememberMe } });
    fireEvent.click(submitButton);

    // Check if authLogin action was called once
    expect(authLogin).toHaveBeenCalledOnce;

    // Check if authLogin was called with correct data
    const data = { dniCif, password, rememberMe };
    expect(authLogin).toHaveBeenCalledWith(data);
  });
});
