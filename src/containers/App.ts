import * as actions from '../actions/data';
import { connect, Dispatch } from 'react-redux';
import axios from 'axios';

import App, { Handlers } from '../components/App';

import { API_URL } from '../constants';
import { parseHitPage } from '../utils/parsing';

const mapDispatch = (dispatch: Dispatch<actions.HitPageAction>): Handlers => ({
  onFetch: () => {
    axios
      .get(`${API_URL}/mturk/findhits?match=true`)
      .then(success => {
        const data: string = success.data;
        const t0 = performance.now();
        const hits = parseHitPage(data);
        // tslint:disable-next-line:no-console
        console.log('Time to parse HITs: ' + (performance.now() - t0));

        dispatch(actions.getHitPageSuccess(hits));
      })
      .catch(reason => {
        console.warn(reason);
      });
  }
});

export default connect(null, mapDispatch)(App);
