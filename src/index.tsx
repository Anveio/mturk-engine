import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import {
  clearDom,
  createRootDiv,
  importPolarisStylesheet
} from './utils/production';
// import registerServiceWorker from './registerServiceWorker';

import '@shopify/polaris/styles.css';

// If root is not present, kick off changes for production.
if (!document.querySelector('#root')) {
  clearDom();
  createRootDiv();
  importPolarisStylesheet();
}

ReactDOM.render(<App />, document.querySelector('#root') as HTMLElement);
// registerServiceWorker();
