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
import { authTokenAction } from './store/actions/authActions';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

const token: string | null = storage.get('key');

if (token) {
  store.dispatch(authTokenAction(token));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
