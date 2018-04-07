import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import store from 'store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
