import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { API_URL } from './constants';
import {
  clearDom,
  createRootDiv,
  attachPolarisStyleSheet,
  attachToastrStyles
} from './utils/config';

import App from './components/App';

// If not in development, kick off productions configurations.
if (API_URL !== 'http://localhost:7777') {
  clearDom();
  createRootDiv();
}

attachPolarisStyleSheet();
attachToastrStyles();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root') as HTMLElement
);
// registerServiceWorker();
