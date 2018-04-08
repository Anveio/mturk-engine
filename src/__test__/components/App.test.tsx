import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import simpleStore from '../mocks/simpleStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={simpleStore}>
      <App />
    </Provider>,
    div
  );
});
