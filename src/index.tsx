import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '@shopify/polaris/styles.css';

if (!document.getElementById('root')) {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
