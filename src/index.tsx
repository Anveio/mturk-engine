import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { API_URL } from './constants';
import {
  clearDom,
  createRootDiv,
  importPolarisStylesheet,
  importToastrStylesheet
} from './utils/production';

import App from './containers/App';
import '@shopify/polaris/styles.css';

// If not in development, kick off productions configurations.
if (API_URL !== 'http://localhost:7777') {
  clearDom();
  createRootDiv();
  importPolarisStylesheet();
}

importToastrStylesheet();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root') as HTMLElement
);
// registerServiceWorker();
