import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { configureApiRoot } from './utils/config';
import {
  clearDom,
  createRootDiv,
  importPolarisStylesheet
} from './utils/production';

import App from './components/App';
import '@shopify/polaris/styles.css';

// If not in development, kick off productions configurations.
if (configureApiRoot() !== 'http://localhost:7777') {
  clearDom();
  createRootDiv();
  importPolarisStylesheet();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root') as HTMLElement
);
// registerServiceWorker();
