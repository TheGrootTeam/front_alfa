import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './reset.css';
import './index.css';
import { Provider } from 'react-redux';
import './i18n';
import { store } from './store/store';
import { router } from './router';
import storage from './utils/storage';
import { authRememberSession } from './utils/utilsAuth';
import { initialAuth } from './store/reducers/authSlice';
import { removeAuthorizationHeader } from './api/client';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

const token: string | null = storage.get('key');

if (token) {
  try {
    const isCompany = await authRememberSession(token);
    store.dispatch(initialAuth({ isCompany }));
  } catch (error) {
    removeAuthorizationHeader();
    storage.remove('key');
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
