import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { API_URL } from './constants';
import { clearDom, createRootDiv } from './utils/config';
import { createToastLayer } from './utils/toaster';

import App from './components/App';

// If not in development, kick off production configurations.
if (API_URL !== 'http://localhost:7777') {
  clearDom();
  createRootDiv();
}

export const TopRightToaster = createToastLayer();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root') as HTMLElement
);
// registerServiceWorker();
